import { formatMilliseconds, sendCommand, sendChat } from "../../utils/functions";
import { fileData, } from "../../utils/data";
import settings from "../../settings";
import { BOLD, RED, } from "../../utils/constants";

//========================================
// WORMS & MAGMA CORES
//========================================
//#region Core

register("chat", () => {
    if (!fileData.totalCoreMobs) {
        fileData.totalCoreMobs = 1
    } else {
        fileData.totalCoreMobs += 1;
    }
    fileData.save()
}).setCriteria("A Lava Blaze has surfaced from the depths!")

register("chat", () => {
    if (!fileData.totalCoreMobs) {
        fileData.totalCoreMobs = 1
    } else {
        fileData.totalCoreMobs += 1;
    }
    fileData.save()
}).setCriteria("A Lava Pigman arose from the depths!")

let lastCaptimeMagma = Date.now();
let isCappedCores = false;
let isCappedWorms = false;
register("step", () => {
    if (settings.magmacoreCapPing) {
        let pigmenCount = 0;
        let flameCount = 0;
        let wormCount = 0;
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Lava Pigman")) {
                pigmenCount += 1;
            }
        });
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Lava Blaze")) {
                flameCount += 1;
            }
        });
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Lava Pigman")) {
                wormCount += 1;
            }
        });

        // Send ping once threshold reached, pings only once
        if ((pigmenCount + flameCount) >= settings.magmacoreCapThreshold && !isCappedCores) {
            sendCommand(`pc CORE CAP! [${pigmenCount} pigs & ${flameCount} blazes] [${formatMilliseconds(Date.now() - lastCaptimeMagma)}]`);
            isCappedCores = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCappedCores && (pigmenCount + flameCount) == 0) {
            isCappedCores = false;
            lastCaptimeMagma = Date.now();
        }
        else { }
        if ((wormCount) >= settings.wormCapThreshold && !isCappedWorms) {
            sendCommand(`pc WORM CAP! [${wormCount} in ${formatMilliseconds(Date.now() - lastCaptimeWorms)}]`);
            isCappedWorms = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCappedWorms && wormCount == 0) {
            isCappedWorms = false;
            lastCaptimeWorms = Date.now();
        }
    }
}).setDelay(1);

register("chat", (mf) => {
    if (!fileData.magmacores) {
        fileData.magmacores = 0;
    }
    fileData.magmacores += 1;

    sendCommand(`pc Core #${fileData.magmacores}! [+${mf}% ✯]`);

    let message = `${RED + BOLD}${Math.round(fileData.totalCoreMobs / fileData.magmacores)} sc/core in ${fileData.totalCoreMobs} scs`;
    sendChat(message, settings.magmaCoreStats)
    message = `${RED + BOLD}Dry Timer: ${formatMilliseconds(Date.now() - fileData.lastMagmaCore)}`
    sendChat(message, settings.magmaCoreStats)

    fileData.lastMagmaCore = Date.now();
    fileData.save();
}).setCriteria("RARE DROP! Magma Core (+${mf}% ✯ Magic Find)");

register("command", () => {
    fileData.magmacores = 0;
    fileData.save();
}).setName("mixresetcores");
//#endregion Core
