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
import { playerData } from "../utils/data";
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
                sendCommand(`pc ${coord} INQUISITOR [${playerData.COUNTER["minos_inquisitor"]} in ${formatMilliseconds(Date.now() - playerData.TIME["minos_inquisitor"])}]`);
                playerData.COUNTER["minos_inquisitor"] = 0;
                playerData.TIME["minos_inquisitor"] = Date.now();
            }, 250);
            break;
        case "minotaur":
            playerData["Daedalus Stick"].current_count += 1;
            ChatLib.chat(`&6&lLast STICK: ${playerData["Daedalus Stick"].current_count}`)
            break;

        // This is for coins, need to make it specific
        case undefined:
            var match = mob.match(/(\d+,\d+|\d+)/);
            if (match) {
                var numericValue = match[0];
                numericValue = numericValue.replace(/,/g, '');
                intValue = parseInt(numericValue, 10);
                mobKey = "coins";
                ChatLib.chat(`&6&lTOTAL: ${playerData.DIANA[mobKey] + intValue}`)
            }
            break;
        default:
            break;
    }
    playerData.DIANA[mobKey] += intValue;

    if (whatever == "RARE DROP") {
    }
    else if (whatever == "Wow") {

    }
    else {
        playerData.COUNTER["minos_inquisitor"] += 1;
        let count = playerData.COUNTER["minos_inquisitor"];
        let time = formatMilliseconds(Date.now() - playerData.TIME["minos_inquisitor"]);
        ChatLib.chat(`${YELLOW}${count < 2 ? "Burrow" : "Burrows"} since ${BOLD + RED}INQUISITOR${RESET + WHITE}[${YELLOW}${count} in ${time}${WHITE}]`)
    }
    playerData.save()
}).setCriteria("${whatever}! You dug out ${mob}!");;