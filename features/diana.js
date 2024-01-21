
import { playerData } from "../utils/data";
import { formatMilliseconds } from "../utils/functions";

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
    let mobKey = dianaMapping[mob];
    var intValue = 1;
    switch (mobKey) {
        case "minos_inquisitor":
            let x = Math.round(Player.getX());
            let y = Math.round(Player.getY());
            let z = Math.round(Player.getZ());
            coord = `x: ${x}, y: ${y}, z: ${z}`;
            setTimeout(() => {
                ChatLib.command(`pc ${coord} INQUISITOR [${playerData.COUNTER["minos_inquisitor"]} in ${formatMilliseconds(Date.now() - playerData.TIME["minos_inquisitor"])}]`);
                playerData.COUNTER["minos_inquisitor"] = 0;
                playerData.TIME["minos_inquisitor"] = Date.now();
            }, 250);
            break;
        case "minotaur":
            playerData["Daedalus Stick"].current_count += 1;
            ChatLib.chat(`&6&lLast STICK: ${playerData["Daedalus Stick"].current_count}`)
            break;
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
        ChatLib.chat(`&6&lBurrows since INQUISITOR: ${playerData.COUNTER["minos_inquisitor"]} in ${formatMilliseconds(Date.now() - playerData.TIME["minos_inquisitor"])}`)
    }
    playerData.save()
}).setCriteria("${whatever}! You dug out ${mob}!");;