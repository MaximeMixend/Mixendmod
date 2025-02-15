/**
 * TODO
 * Chimera detection
 * Minos relic, and other drops
 * Add GUI and track EVERYTHING (coins, burrows, mobs, crowns, burrow timer?? EVERYTHING)
 * Burrow items: mob, coin, washed-up, crown, feather
 * Mobs: Minos Hunter, Siamese Lynx (count as 2 mobs for tracker), Minotaur, Gaia construct, minos champion, minos inquisitor
 * Check if inquisitor died and then check if new chimera book in inventory
 * 
 * Session system for tracking ? -> Indicate year and mayor (if Jerry make it different I guess)
 *      Need a session tracking system
 * 
 * Track mob kills
 *      Detail mobs
 * Track number of burrows
 *      detail items and coins
 * Track mob drops
 *      Check when close to a mob, scan inventory before and after mob death
 * 
 * Party message when summoning inquisitor + coordinates
 * Chat message when digging a burrow with information
 *      Gold -> amount dug + new total
 *      Mob -> Count since last inquisitor
 *      Feather -> total
 * 
*/
import { dianaData } from "../utils/data";
import { formatMilliseconds, sendCommand } from "../utils/functions";
import settings from "../settings";
import { BOLD, RED, RESET, WHITE, YELLOW } from "../utils/constants";

const dianaMapping = {
    "a Minos Hunter": "minos_hunter",
    "Siamese Lynxes": "siamese_lynx",
    "a Minotaur": "minotaur",
    "a Gaia Construct": "gaia_construct",
    "a Minos Champion": "minos_champion",
    "a Minos Inquisitor": "minos_inquisitor",
    "a Griffin Feather": "griffin_feather"
};

//##########################
// BURROW
//##########################
register("chat", (whatever, mob) => {
    if (!settings.enableDiana) { return; }
    let mobKey = dianaMapping[mob];
    var intValue = 1;
    switch (mobKey) {
        case "minos_inquisitor":
            let x = Math.round(Player.getX());
            let y = Math.round(Player.getY());
            let z = Math.round(Player.getZ());
            coord = `x: ${x}, y: ${y}, z: ${z}`;
            setTimeout(() => {
                sendCommand(`pc ${coord} INQUISITOR [took ${dianaData[mobKey].since} mobs in ${formatMilliseconds(Date.now() - dianaData[mobKey].time)}]`);
                dianaData[mobKey].since = 0;
                dianaData[mobKey].time = Date.now();
            }, 500);
            break;
        default:
            break;
    }
    dianaData[mobKey].count += intValue;

    if (whatever == "RARE DROP") {
    }
    else if (whatever == "Wow") {
    }
    else {
        dianaData[mobKey].since += 1;
        let count = dianaData[mobKey].since;
        let time = formatMilliseconds(Date.now() - dianaData[mobKey].time);
        ChatLib.chat(`${YELLOW}${count < 2 ? "Burrow" : "Burrows"} since ${BOLD + RED}INQUISITOR${RESET + WHITE}[${YELLOW}${count} in ${time}${WHITE}]`)
    }
    dianaData.save()
}).setCriteria("${whatever}! You dug out ${mob}!");;