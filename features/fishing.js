import { announceDrop, renderEntity, formatMilliseconds, findFormattedKey, announceMob, calcAvg } from "../utils/functions";
import { playerData, fileData, catchHistory, currentSession } from "../utils/data";
import settings from "../settings";
import { DARK_BLUE, DARK_PURPLE, DARK_RED, BOLD, DETECTED_SOUND, GOLD, RED, BLUE, RESET, GREEN, entitiesList, DARK_GRAY, BLACK, GRAY, WHITE } from "../utils/constants";
import { crimsonIsleCatch, doubleHookCatch, dropData, lavaDict, seaCreatureData, waterCatch, waterDict } from "../utils/gameData";
import { activePet } from "./pet";


// TRACK MOBS
let mobTracker = []; // Entity of tracked entities
// SC RATES
let rateSc = 0;
let startTime = Date.now();
let rateMobCount = 0;

//========================================
// Functions
// Somehow PogObject write does not work/save/whatever when these are in utils/functions???
//========================================

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
        coord = `x: ${x}, y: ${y}, z: ${z} `
    };

    // Announce mob to party
    if (sendCatch) {
        let mobMessageData = detectMobData(mobName);
        announceMob(partyMsg, playerData.COUNTER[mobName], catchInterval, coord);
        ChatLib.chat(`${mobMessageData.color + BOLD + mobMessageData.name} ${GOLD}[${playerData.COUNTER[mobName]} in ${formatMilliseconds(catchInterval)}]`);
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

//========================================
// WORMS
//========================================
//#region Worms
let lastCaptime = Date.now();
let isCapped = false;
register("step", () => {
    if (settings.wormCapPing) {
        let wormCount = 0;
        let wormCount2 = 0;
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Lava Pigman")) {
                wormCount += 1;
            }
        });
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Lava Blaze")) {
                wormCount2 += 1;
            }
        });
        // Send ping once threshold reached, pings only once
        if ((wormCount + wormCount2) >= settings.wormCapThreshold && !isCapped) {
            ChatLib.command(`pc CORE CAP! [${wormCount} pigs & ${wormCount2} blazes] [${formatMilliseconds(Date.now() - lastCaptime)}]`);
            isCapped = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCapped && (wormCount + wormCount2) < 2) {
            isCapped = false;
            lastCaptime = Date.now();
        }
        else { }
    }
}).setDelay(2);

let lastCaptime2 = Date.now();
let isCapped2 = false;
register("step", () => {

    if (settings.wormCapPing) {
        let wormCount = 0;
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Flaming Worm")) {
                wormCount += 1;
            }
        });
        // Send ping once threshold reached, pings only once
        if ((wormCount) >= settings.wormCapThreshold && !isCapped2) {
            ChatLib.command(`pc WORM CAP! [${wormCount} in ${formatMilliseconds(Date.now() - lastCaptime2)}]`);
            // setTimeout(() => {
            //     ChatLib.command(`pc Killing in 5`);
            // }, 1000);
            // setTimeout(() => {
            //     ChatLib.command(`pc Killing in 4`);
            // }, 2000);
            // setTimeout(() => {
            //     ChatLib.command(`pc Killing in 3`);
            // }, 3000);
            // setTimeout(() => {
            //     ChatLib.command(`pc Killing in 2`);
            // }, 4000);
            // setTimeout(() => {
            //     ChatLib.command(`pc Killing in 1`);
            // }, 5000);

            isCapped2 = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCapped2 && (wormCount) < 2) {
            isCapped2 = false;
            lastCaptime2 = Date.now();
        }
        else { }
    }
}).setDelay(2);
register("chat", () => {
    let add = 1;
    if (fileData.doubleHook) {
        add = 2;
    }
    catchHistory.history.push(Date.now());
    rateMobCount += add;
    catchHistory.save();
    fileData.doubleHook = false;
    fileData.save();
}).setCriteria("A Flaming Worm surfaces from the depths!");

register("chat", () => {
    let add = 1;
    if (fileData.doubleHook) {
        add = 2;
    }
    catchHistory.history.push(Date.now());
    rateMobCount += add;
    catchHistory.save();
    fileData.doubleHook = false;
    fileData.save();
}).setCriteria("A Lava Blaze has surfaced from the depths!");
register("chat", () => {
    let add = 1;
    if (fileData.doubleHook) {
        add = 2;
    }
    catchHistory.history.push(Date.now());
    rateMobCount += add;
    catchHistory.save();
    fileData.doubleHook = false;
    fileData.save();

}).setCriteria("A Lava Pigman arose from the depths!");
//#endregion Worms

//========================================
// CATCH
//========================================
register("chat", (text, event) => {
    fileData.doubleHook = true;
    cancel(event);
}).setCriteria(doubleHookCatch);

//#region CATCH
// LAVA CATCH
register("chat", (expression, event) => {
    cancel(event);
    let mobName = crimsonIsleCatch[expression.match(findFormattedKey(crimsonIsleCatch))[0]];
    switch (mobName) {
        case "thunder":
            catchMythicCreature(mobName, settings.thunderCatch);
            playerData.COUNTER["plhlegblast"] += 1;
            playerData.COUNTER["lord_jawbus"] += 1;
            break;
        case "lord_jawbus":
            catchMythicCreature(mobName, settings.jawbusCatch);
            playerData.COUNTER["plhlegblast"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
        case "plhlegblast":
            catchMythicCreature(mobName, settings.plhlegblastCatch);
            playerData.COUNTER["lord_jawbus"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                ChatLib.command(`pc ${settings.doubleHookMsg}`);
            };
            playerData.COUNTER["lord_jawbus"] += 1;
            playerData.COUNTER["plhlegblast"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
    };
    // Update catch tracking
    catchHistory.history.push(Date.now());
    playerData.LAVA_SC[mobName] += 1;

    if (mobName != "plhlegblast") {
        currentSession.CURRENT_TRACK[mobName] += 1;
        currentSession.CURRENT_TRACK_TIMER[mobName] = Date.now();;
        currentSession.TOTAL += 1;
        playerData.TOTAL += 1;
    }

    rateMobCount += 1;

    // Reset flags
    fileData.doubleHook = false;

    // Save data
    playerData.save();
    currentSession.save();
    catchHistory.save();
    fileData.save();

}).setCriteria(findFormattedKey(crimsonIsleCatch));

//WATER CATCH
register("chat", (expression, event) => {
    let mobName = waterCatch[expression.match(findFormattedKey(waterCatch))[0]];
    switch (mobName) {
        case "carrot_king":
            catchMythicCreature(mobName, settings.sendCarrotKingCatch);
            playerData.COUNTER["grim_reaper"] += 1;
            playerData.COUNTER["phantom_fisherman"] += 1;
            playerData.COUNTER["sea_emperor"] += 1;
            // Update tracking data
            playerData.TIME[mobName] = Date.now();
            playerData.COUNTER[mobName] = 0;
            break;
        case "sea_emperor":
            catchMythicCreature(mobName, settings.sendSeaEmperorCatch);
            playerData.COUNTER["phantom_fisherman"] += 1;
            playerData.COUNTER["grim_reaper"] += 1;
            playerData.COUNTER["carrot_king"] += 1;
            break;
        case "grim_reaper":
            catchMythicCreature(mobName, settings.sendGrimReaperCatch);
            playerData.COUNTER["phantom_fisherman"] += 1;
            break;
        case "phantom_fisherman":
            catchMythicCreature(mobName, settings.sendPhantomFishermanCatch);
            playerData.COUNTER["grim_reaper"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                ChatLib.command(`pc ${settings.doubleHookMsg}`);
            };
            playerData.COUNTER["grim_reaper"] += 1;
            playerData.COUNTER["phantom_fisherman"] += 1;
            playerData.COUNTER["sea_emperor"] += 1;
            playerData.COUNTER["carrot_king"] += 1;
            break;
    };
    // Update catch tracking
    catchHistory.history.push(Date.now());
    playerData.WATER_SC[mobName] += 1;
    rateMobCount += 1;
    if (!["grim_reaper", "phantom_fisherman", "werewolf", "nightmare", "scarecrow"].includes(mobName)) {
        currentSession.CURRENT_WATER_SC[mobName] += 1;
        currentSession.TIME_WATER_SC[mobName] = Date.now();;
        currentSession.TOTAL_WATER += 1;
        playerData.TOTAL_WATER += 1;
    }

    // Reset flags
    fileData.doubleHook = false;

    // Save data
    playerData.save();
    currentSession.save();
    catchHistory.save();
    fileData.save();

}).setCriteria(findFormattedKey(waterCatch));
//#endregion CATCH

//========================================
// DROPS
//========================================
// Chat register RARE DROPS
register("chat", (drop, mf, event) => {
    if (settings.alertDrops && dropData(drop).dropPing) {
        announceDrop(drop, mf, playerData[drop]["current_count"], playerData[drop]["time_drop"]);
    }
    if (playerData[drop]) {
        playerData[drop]["count_to_drop"].push(playerData[drop]["current_count"]);
        playerData[drop]["magic_find"].push(parseInt(mf));
        playerData[drop]["current_count"] = 0;
        playerData[drop]["time_drop"] = Date.now();
        playerData.save();
    }

}).setCriteria("RARE DROP! ${drop} (+${mf}% ✯ Magic Find)");

// TODO: Find a way to get flash and such
//========================================
// SC TRACKER
//========================================
//#region Detect creatures
let trackedMobs = ["lord_jawbus", "thunder", "vanquisher", "plhlegblast", "grim_reaper", 'phantom_fisherman'];
function detectMobData(mobName) {
    switch (mobName) {
        case "lord_jawbus": return {
            color: DARK_RED,
            name: "Lord Jawbus",
            detect: settings.jawbusSettings,
            sound: settings.jawbusSoundAlert,
            alert: settings.jawbusScreenAlert
        }
        case "thunder": return {
            color: DARK_BLUE,
            name: "Thunder",
            detect: settings.thunderSettings,
            sound: settings.thunderSoundAlert,
            alert: settings.thunderScreenAlert
        }
        case "vanquisher": return {
            color: DARK_PURPLE,
            name: "Vanquisher",
            detect: settings.vanquisherSettings,
            sound: settings.vanquisherSoundAlert,
            alert: settings.vanquisherScreenAlert
        }
        case "plhlegblast": return {
            color: DARK_GRAY,
            name: "Plhlegblast",
            detect: settings.plhlegblastSettings,
            sound: settings.plhlegblastSoundAlert,
            alert: settings.plhlegblastScreenAlert
        }
        case "grim_reaper": return {
            color: DARK_PURPLE,
            name: "Grim Reaper",
            detect: true,
            sound: true,
            alert: true
        }
        case "phantom_fisherman": return {
            color: DARK_PURPLE,
            name: "Phantom Fisherman",
            detect: true,
            sound: true,
            alert: true
        }
        default:
            return false;
    }
}
register("step", (event) => {
    let worldMobs = [];
    trackedMobs.forEach(name => {
        let mobData = detectMobData(name);

        // Exit if mob not to be detected
        if (!mobData.detect) { return; }

        // Get all entites
        let detectedMobs = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand")).filter(entity => entity.getName().includes(mobData.name));

        if (detectedMobs.length > 0) { worldMobs.push(...detectedMobs); }

        // Perform actions based on settings for that mob
        detectedMobs.forEach(mob => {
            // If mob already tracked
            if (mobTracker.filter(trackedMob => trackedMob.getUUID() === mob.getUUID()).length > 0) { return; }
            if (mobData.alert) {
                Client.showTitle(`Detected ${BOLD + mobData.color + mobData.name}`, "", 5, 60, 25);
            }
            if (mobData.sound) { DETECTED_SOUND?.play(); }
            mobTracker.push(mob)
        })
    })
    // Remove tracked mobs inexistent in the world 
    mobTracker = mobTracker.filter(entity => {
        return worldMobs.some(mob => mob.getUUID() === entity.getUUID())
    });
}).setFps(1);
//#endregion Detect creatures

register("renderWorld", () => {
    mobTracker.forEach(mob => {
        renderEntity(mob, 0.7, 0.7, 0, mob.getName().toUpperCase());
    });
});

register("command", () => {
    mobTracker.forEach(element => {
        console.log(element)
        console.log("a")
    });
}).setName("mixdebug");

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
        rateMobCount = 0;
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
    rateSc = 0;
    catchHistory.history = [];
    currentSession.save()
    catchHistory.save()
}).setName("mixresettrack", true);

//========================================
// GUI
//========================================
//#region GUI FISH
// move graph event
let movedisplay = new Gui();

register("guimouseclick", (x, y, button, gui, event) => {
    if (movedisplay.isOpen()) {
        fileData.baseX = x;
        fileData.baseY = y;
        fileData.save();
    }
})

function addGuiText(text, col, row) {
    // let sx = Renderer.screen.getWidth();
    let deltaX = 82;
    let deltaY = 12;
    new Text(`${text}`, fileData.baseX + col * deltaX, fileData.baseY + row * deltaY).setShadow(true).draw();
}

register("renderoverlay", () => {
    if (settings.guiEnable & (Renderer.screen.getWidth() < fileData.baseX || Renderer.screen.getHeight() < fileData.baseY)) {
        new Text(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}GUI OUT OF SCREEN`, Renderer.screen.getWidth() / 10, Renderer.screen.getHeight() / 3).setShadow(true).draw();
        new Text(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}Use /mixgui fish and click the screen`, Renderer.screen.getWidth() / 10, Renderer.screen.getHeight() / 3 - 10).setShadow(true).draw();
    }

    if (movedisplay.isOpen()) {
        new Text(`${RED + BOLD}ECHAP to save position`, 10, 10).setShadow(true).draw();
        new Text(`${GREEN + BOLD}Click to place to left corner of GUI`, 10, 20).setShadow(true).draw();
    }

    // Track bobbers
    if (settings.guiEnable) {
        let bobbers = World.getAllEntitiesOfType(entitiesList.FishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 30);

        if (settings.guiMythicCount) {
            addGuiText(`${BLUE + BOLD}Thunder: ${GOLD + BOLD + playerData.COUNTER["thunder"]} [${playerData.AVG_DATA["thunder_avg"]}]`, 0, 0);
            addGuiText(`${RED + BOLD}Jawbus: ${GOLD + BOLD + playerData.COUNTER["lord_jawbus"]} [${playerData.AVG_DATA["lord_jawbus_avg"]}]`, 2, 0);
        }
        if (settings.guiActivePet) {
            addGuiText(`[${GOLD + BOLD + activePet.level + RESET}] ${activePet.color + BOLD + activePet.name} `, 0, 1);
        }
        if (settings.guiCatchRate) {
            let rateMode = settings.guiCatchRateMode ? "hr" : "min";
            addGuiText(`${GREEN + BOLD}Sc/${rateMode}: ${GOLD + BOLD + rateSc.toFixed(1)} (${rateMobCount} in ${formatMilliseconds(Date.now() - startTime)})`, 0, 2);
        }

        if (settings.guiBobberCount) {
            addGuiText(`${GREEN + BOLD} Bobber: ${GOLD + BOLD + bobbers.length} `, 2, 1);
        }
        let deltaRow = 1;
        mobTracker.forEach(entity => {
            addGuiText(`${entity.getName()} `, 0, deltaRow + 2);
            deltaRow += 1;
        })
    }
});
//#endregion GUI FISH

//#region GUI SESSION
// Session GUI
let moveGuiSession = new Gui();

register("guimouseclick", (x, y, button, gui, event) => {
    if (moveGuiSession.isOpen()) {
        fileData.sessionGuiX = x;
        fileData.sessionGuiY = y;
        fileData.save();
    }
})

register("renderoverlay", () => {
    let total = currentSession.TOTAL;
    let listFish = currentSession.CURRENT_TRACK;
    let fishDict = lavaDict;
    let listTime = currentSession.CURRENT_TRACK_TIMER;

    let xPos = fileData.sessionGuiX;
    let yPos = fileData.sessionGuiY;
    if (moveGuiSession.isOpen()) {
        new Text(`${RED + BOLD}ECHAP to save position`, 10, 10).setShadow(true).draw();
        new Text(`${GREEN + BOLD}Click to place to left corner of GUI`, 10, 20).setShadow(true).draw();
    }
    if (!settings.catchSessionGui) { return; }

    // WATER & GLOBAL
    if (settings.statVersion && settings.statMode) {
        total = playerData.TOTAL_WATER;
        listFish = playerData.WATER_SC;
        fishDict = waterDict;
        listTime = currentSession.TIME_WATER_SC;
    }
    // WATER & CURRENT
    else if (settings.statVersion && !settings.statMode) {
        total = currentSession.TOTAL_WATER;
        listFish = currentSession.CURRENT_WATER_SC;
        fishDict = waterDict;
        listTime = currentSession.TIME_WATER_SC;
    }
    // LAVA & GLOBAL
    else if (!settings.statVersion && settings.statMode) {
        total = playerData.TOTAL;
        listFish = playerData.LAVA_SC;
    }
    new Text(`${RED + BOLD}Total: ${WHITE}${total}`, xPos, yPos).setShadow(true).draw();
    let percentage = 0;
    let count = 0;
    let color = RED;
    for (let i = 0; i < Object.keys(fishDict).length; i++) {
        count = listFish[fishDict[i].id];
        if (count == 0) {
            percentage = 0;
        } else {
            percentage = (count / total) * 100;
        }
        new Text(`${WHITE}${count} (${percentage.toFixed(2)}%) ${color}${fishDict[i].name} ${WHITE}[${formatMilliseconds(Date.now() - listTime[fishDict[i].id])}]`, xPos, yPos + 10 * (i + 1)).setShadow(true).draw();
    }
});
//#endregion GUI SESSION

// Move GUIS
register("command", (arg, arg2) => {
    switch (arg) {
        case "session":
            if (!settings.catchSessionGui) { return; }
            switch (arg2) {
                case "reset":
                case "-r":
                    fileData.sessionGuiX = 10;
                    fileData.sessionGuiY = 75;
                    fileData.save();
                    break;
                default:
                    moveGuiSession.open()
                    break;
            }
            break;
        case "fish":
            if (!settings.guiEnable) { return; }
            switch (arg2) {
                case "reset":
                case "-r":
                    fileData.baseX = 10;
                    fileData.baseY = 10;
                    fileData.save();
                    break;
                default:
                    movedisplay.open()
                    break;
            }
            break;
        default:
            ChatLib.chat(`${GOLD + BOLD}Usage: /mixgui <session/fish> optional: <reset>`);
            break;
    }
}).setName("mixgui");

register("worldUnload", () => {
    mobTracker = [];
    startTime = Date.now();
    rateMobCount = 0;
    catchHistory.history = [];
    catchHistory.save();
});

