import { announceDrop, renderEntity, formatMilliseconds, findFormattedKey, announceMob } from "../utils/functions";
import { playerData, fileData, catchHistory } from "../utils/data";
import settings from "../settings";
import { DARK_BLUE, DARK_PURPLE, DARK_RED, BOLD, DETECTED_SOUND, GOLD, RED, BLUE, RESET, GREEN } from "../utils/constants";
import { crimsonIsleCatch, doubleHookCatch, dropData, seaCreatureData, waterCatch } from "../utils/gameData";
import { activePet } from "./general";


// TRACK MOBS
let mobTracker = []; // Entity of tracked entities
let validNames = ["Lord Jawbus", "Thunder", "Vanquisher"];
// SC RATES
let rateSc = 0;
let startTime = Date.now();
let rateMobCount = 0;
// GUI
let baseX = 80;
let baseY = 6;

const EntityFishHook = Java.type("net.minecraft.entity.projectile.EntityFishHook")

//========================================
// Functions
// Somehow PogObject write does not work/save/whatever when these are in utils/functions???
//========================================


/**
 * Computes average of list
 * @param {List[Int]} list 
 */
function calcAvg(list) {
    let sum = 0;
    list.forEach(elem => { sum += elem; });
    return sum / list.length;
}

/**
 * Sets of instructions for mythic creatures catch
 * @param {string} mobName
 * @param {boolean} sendCatch 
 */
function catchMythicCreature(mobName, sendCatch) {
    // Find player position
    let x = Math.round(Player.getX());
    let y = Math.round(Player.getY());
    let z = Math.round(Player.getZ());

    let partyMsg = fileData.doubleHook ? "DOUBLE " + mobName.replace("_", " ").toUpperCase() : mobName.replace("_", " ").toUpperCase();
    let catchInterval = Date.now() - playerData.TIME[mobName];
    let coord = "";

    // Add coords to party ping for relevant mobs
    if (seaCreatureData(mobName).sendCoords) {
        coord = ` @ x: ${x}, y: ${y}, z: ${z}`
    };

    // Announce mob to party
    if (sendCatch && settings.sendCatchPing) {
        announceMob(partyMsg, playerData.COUNTER[mobName], catchInterval, coord);
    };

    // Update tracked loot (eg Radioactive Vial counter for Jawbus)
    if (seaCreatureData(mobName).tracked_loot) {
        playerData[seaCreatureData(mobName).tracked_loot].current_count += fileData.doubleHook ? 2 : 1;
    };
    if (seaCreatureData(mobName).track_avg) {
        playerData.AVG_DATA[mobName].push(playerData.COUNTER[mobName]);
        playerData.AVG_DATA[mobName + "_avg"] = calcAvg(playerData.AVG_DATA[mobName]).toFixed(0);
    }
    // Update tracking data
    playerData.TIME[mobName] = Date.now();
    playerData.COUNTER[mobName] = 0;
    playerData.save();
};


let lastCaptime = 0;
let isCapped = false;
register("step", () => {
    if (settings.wormCapPing) {
        let wormCount = 0;
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Silverfish")) {
                wormCount += 1;
            }
        });
        // Send ping once threshold reached, pings only once
        if (wormCount >= settings.wormCapThreshold && !isCapped) {
            ChatLib.command(`pc > > > WORMS CAP! [${wormCount} worms] [${formatMilliseconds(Date.now() - lastCaptime)}] < < <`);
            isCapped = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCapped && wormCount < 10) {
            isCapped = false;
            lastCaptime = Date.now();
        }
        else { }

    }
}).setDelay(2);

//temp
register("chat", () => {
    catchHistory.history.push(Date.now());
    rateMobCount += 1;
    catchHistory.save();
}).setCriteria("A Flaming Worm surfaces from the depths!");

//========================================
// CATCH
//========================================
// DOUBLE HOOK
register("chat", (event) => {
    fileData.doubleHook = true;
}).setCriteria(doubleHookCatch);

// LAVA CATCH
register("chat", (expression, event) => {
    let mobName = crimsonIsleCatch[expression.match(findFormattedKey(crimsonIsleCatch))[0]];
    switch (mobName) {
        case "thunder":
            catchMythicCreature(mobName, settings.sendThunderCatch);
            playerData.COUNTER["lord_jawbus"] += 1;
            break;
        case "lord_jawbus":
            catchMythicCreature(mobName, settings.sendJawbusCatch);
            playerData.COUNTER["thunder"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                ChatLib.command(`pc ${settings.doubleHookMsg}`);
            };
            playerData.COUNTER["lord_jawbus"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
    };
    // Update catch tracking
    catchHistory.history.push(Date.now());
    playerData.LAVA_SC[mobName] += 1;
    rateMobCount += 1;

    // Reset flags
    fileData.doubleHook = false;

    // Save data
    playerData.save();
    catchHistory.save();
    fileData.save();

}).setCriteria(findFormattedKey(crimsonIsleCatch));

//WATER CATCH
register("chat", (expression, event) => {
    let mobName = waterCatch[expression.match(findFormattedKey(waterCatch))[0]];
    switch (mobName) {
        case "carrot_king":
            catchMythicCreature(mobName, settings.sendCarrotKingCatch);
            playerData.COUNTER["sea_emperor"] += 1;
            // Update tracking data
            playerData.TIME[mobName] = Date.now();
            playerData.COUNTER[mobName] = 0;
            break;
        case "sea_emperor":
            catchMythicCreature(mobName, settings.sendSeaEmperorCatch);
            playerData.COUNTER["carrot_king"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                ChatLib.command(`pc ${settings.doubleHookMsg}`);
            };
            playerData.COUNTER["sea_emperor"] += 1;
            playerData.COUNTER["carrot_king"] += 1;
            break;
    };
    // Update catch tracking
    catchHistory.history.push(Date.now());
    playerData.WATER_SC[mobName] += 1;
    rateMobCount += 1;

    // Reset flags
    fileData.doubleHook = false;

    // Save data
    playerData.save();
    catchHistory.save();
    fileData.save();

}).setCriteria(findFormattedKey(waterCatch));

//========================================
// DROPS
// Need to find a way to read settings on the fly from a key:settings.blabla typebeat
//========================================
// Chat register RARE DROPS
register("chat", (drop, mf, event) => {
    if ((settings.alertDrops) && dropData(drop).dropPing) {
        playerData[drop]["count_to_drop"].push(playerData[drop]["current_count"]);
        playerData[drop]["magic_find"].push(parseInt(mf));
        playerData[drop]["current_count"] = 0;
        playerData[drop]["time_drop"] = Date.now();
        announceDrop(drop, mf);
        playerData.save();
    }
}).setCriteria("RARE DROP! ${drop} (+${mf}% ✯ Magic Find)");

// TODO: Find a way to get flash and such
//========================================
// SC TRACKER
//========================================
register("step", (event) => {
    let mobList = World.getAllEntities().filter(obj => {
        let name = obj.getName();
        return validNames.some(validName => name.includes(validName));
    });
    // If detects a Jawbus
    mobList.forEach(worldMob => {
        // Not tracked
        if (mobTracker.filter(trackedMob => trackedMob.getUUID() === worldMob.getUUID()).length < 1) {
            let color = worldMob.getName().includes("Lord Jawbus") ? DARK_RED : worldMob.getName().includes("Thunder") ? DARK_BLUE : DARK_PURPLE;
            let beacon = worldMob.getName().includes("Lord Jawbus") ? DARK_RED + "LORD JAWBUS" : worldMob.getName().includes("Thunder") ? DARK_BLUE + "THUNDER" : DARK_PURPLE + "VANQUISHER";
            mobTracker.push(worldMob);
            // Screen alert
            Client.showTitle(`DETECTED${BOLD + color} ${beacon}`, "", 5, 60, 25);

            // Not that great but for now its ok
            if (color == DARK_RED && settings.alertJawbusSound) {
                DETECTED_SOUND?.play();
            }
            else if (color == DARK_BLUE && settings.alertThunderSound) {
                DETECTED_SOUND?.play();
            }
        };
    });

    // Remove tracked jawbus not in world
    let filteredJawbusTracker = mobTracker.filter(entity => {
        return mobList.some(jawbus => jawbus.getUUID() === entity.getUUID())
    });
    mobTracker = filteredJawbusTracker;
}).setFps(1);

register("renderWorld", () => {
    mobTracker.forEach(mob => {
        renderEntity(mob, 0.7, 0.7, 0, mob.getName().toUpperCase());
    });
});

// Updates rates based on catch history (duration in settings)
register("step", (event) => {
    if (!settings.guiCatchRate) { return; }
    let now = Date.now();
    let myList = catchHistory.history;
    let modeConverter = settings.guiCatchRateMode ? 3600 : 60; // true: per hour, off: per min
    let timespan = settings.scRateWindowMin * 60; // in sec

    // Started less than settings.scRateWindowSec min ago
    if (myList[0] >= now - settings.scRateWindowMin * 1000 * 60) {
        // Time since first catch in seconds
        timespan = (now - myList[0]) / 1000;
    }
    else {
        // remove all entries older than settings.scRateWindowSec min ago
        myList = myList.filter(value => value > now - settings.scRateWindowMin * 1000 * 60);
    };
    if (!myList.length) {
        rateSc = 0;
        startTime = Date.now();
    }
    else {
        rateSc = (myList.length / timespan) * modeConverter;
    }
    catchHistory.history = myList;
    catchHistory.save()
}).setFps(2);

register("command", () => {
    startTime = Date.now();
    rateMobCount = 0;
    catchHistory.history = [];
    catchHistory.save()
}).setName("mixresettrack", true);

//========================================
// GUI
//========================================
function addGuiText(text, col, row) {
    let sx = Renderer.screen.getWidth();
    let deltaX = 82;
    let deltaY = 12;
    new Text(`${text}`, sx - col * deltaX - baseX, baseY + row * deltaY).setShadow(true).draw();
}

register("renderoverlay", () => {
    // Track bobbers
    if (settings.guiEnable) {
        let bobbers = World.getAllEntitiesOfType(EntityFishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 30);

        if (settings.guiMythicCount) {
            addGuiText(`${RED + BOLD}Jawbus: ${GOLD + BOLD + playerData.COUNTER["lord_jawbus"]} [${playerData.AVG_DATA["lord_jawbus_avg"]}] `, 1, 0);
            addGuiText(`${BLUE + BOLD} Thunder: ${GOLD + BOLD + playerData.COUNTER["thunder"]} [${playerData.AVG_DATA["thunder_avg"]}]`, 3, 0);
        }
        if (settings.guiActivePet) {
            addGuiText(`[${GOLD + BOLD + activePet.level + RESET}] ${BOLD + activePet.name} `, 1, 2);
        }
        if (settings.guiCatchRate) {
            let rateMode = settings.guiCatchRateMode ? "hr" : "min";
            addGuiText(`${GREEN + BOLD} Sc / ${rateMode}: ${GOLD + BOLD + rateSc.toFixed(1)} (${rateMobCount} in ${formatMilliseconds(Date.now() - startTime)})`, 3, 1);
        }

        if (settings.guiBobberCount) {
            addGuiText(`${GREEN + BOLD} Bobber: ${GOLD + BOLD + bobbers.length} `, 3, 2);
        }
        let deltaRow = 1;
        mobTracker.forEach(entity => {
            addGuiText(`${entity.getName()}`, 2, deltaRow + 2);
            deltaRow += 1;
        })
    }
});


register("worldUnload", () => {
    mobTracker = [];
    startTime = Date.now();
    rateMobCount = 0;
    catchHistory.history = [];
    catchHistory.save();
});