/**
 * Try to display tracking sea creatures via a command and a custom interface so it is not 24/7 on screen
 * 
 */
import { announceDrop, renderEntity, formatMilliseconds, findFormattedKey, announceMob, calcAvg, sendCommand } from "../utils/functions";
import { playerData, fileData, catchHistory, currentSession } from "../utils/data";
import settings from "../settings";
import { DARK_RED, BOLD, DETECTED_SOUND, GOLD, RED, BLUE, RESET, GREEN, entitiesList, BLACK, WHITE, AQUA } from "../utils/constants";
import { crimsonIsleCatch, doubleHookCatch, dropData, lavaDict, waterCatch, waterDict, detectMobData, catchMobData } from "../utils/gameData";
import { activePet } from "./pet";

let textItem = new Text("", 0, 0);

// TRACK MOBS
let mobTracker = []; // lsit of [tracked entity, name]
// SC RATES
let rateSc = 0;
let startTime = Date.now();
let rateMobCount = 0;

//========================================
// Functions
//========================================
/**
 * Sets of instructions for mythic creatures catch
 * @param {string} mobName
 */
function catchMythicCreature(mobName) {
    const catchInterval = Date.now() - playerData.TIME[mobName];
    let catchData = catchMobData(mobName);

    // Custom message to player
    if (settings.catchMessageCustom) {
        let moreMessage = fileData.doubleHook ? "(Double) " + catchData.name : catchData.name
        moreMessage = catchData.color + BOLD + moreMessage;
        if (settings.catchPingMode) {
            let value = playerData.COUNTER[mobName] / (catchInterval / 1000 / 3600);
            ChatLib.chat(`${moreMessage} ${WHITE}[${playerData.COUNTER[mobName]} at ${value.toFixed(1)}/h]`);
        }
        else { ChatLib.chat(`${moreMessage} ${WHITE}[${playerData.COUNTER[mobName]} in ${formatMilliseconds(catchInterval)}]`); }
    }

    // Announce mob to party
    if (catchData.partyPing) {
        let baseMessage = catchData.partyMessage === ""
            ? `${catchData.name} ┌( ಠ_ಠ)┘ Sponsored by MixendMod™ `
            : catchData.partyMessage;
        // Check double hook
        let partyMsg = fileData.doubleHook ? `(Double) ${baseMessage}` : baseMessage;

        announceMob(partyMsg.trim(), playerData.COUNTER[mobName], catchInterval);
    };

    // Update tracked loot
    if (catchData.trackedLoot) {
        playerData[catchData.trackedLoot].current_count += fileData.doubleHook ? 2 : 1;
    };

    // Update catch average
    if (catchData.trackAverage) {
        playerData.AVG_DATA[mobName].push(playerData.COUNTER[mobName]);
        playerData.AVG_DATA[mobName + "_avg"] = calcAvg(playerData.AVG_DATA[mobName]).toFixed(0);
    }

    // Update tracking data
    playerData.TIME[mobName] = Date.now();
    playerData.COUNTER[mobName] = 0;
    playerData.save();
};

//========================================
// WORMS & MAGMA CORES
//========================================
//#region Worms
let lastCaptimeMagma = Date.now();
let isCappedCores = false;
register("step", () => {
    if (settings.magmacoreCapPing) {
        let pigmenCount = 0;
        let flameCount = 0;
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
        // Send ping once threshold reached, pings only once
        if ((pigmenCount + flameCount) >= settings.magmacoreCapThreshold && !isCappedCores) {
            sendCommand(`pc CORE CAP! [${pigmenCount} pigs & ${flameCount} blazes] [${formatMilliseconds(Date.now() - lastCaptimeMagma)}]`);
            isCappedCores = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCappedCores && (pigmenCount + flameCount) < 2) {
            isCappedCores = false;
            lastCaptimeMagma = Date.now();
        }
        else { }
    }
}).setDelay(2);

let lastCaptimeWorms = Date.now();
let isCappedWorms = false;
register("step", () => {

    if (settings.wormCapPing) {
        let wormCount = 0;
        World.getAllEntities().forEach(entity => {
            if (entity.getName().includes("Flaming Worm")) {
                wormCount += 1;
            }
        });
        // Send ping once threshold reached, pings only once
        if ((wormCount) >= settings.wormCapThreshold && !isCappedWorms) {
            sendCommand(`pc WORM CAP! [${wormCount} in ${formatMilliseconds(Date.now() - lastCaptimeWorms)}]`);
            isCappedWorms = true;
        }
        // Given cap was reached, if worms are cleared, starts counting until next cap
        else if (isCappedWorms && (wormCount) < 2) {
            isCappedWorms = false;
            lastCaptimeWorms = Date.now();
        }
        else { }
    }
}).setDelay(2);
register("chat", () => {
    catchHistory.history.push(Date.now());
    rateMobCount += 1;
    catchHistory.save();
    fileData.doubleHook = false;
    fileData.save();
}).setCriteria("A Flaming Worm surfaces from the depths!");

register("chat", () => {
    catchHistory.history.push(Date.now());
    rateMobCount += 1;
    catchHistory.save();
    fileData.doubleHook = false;
    fileData.save();
}).setCriteria("A Lava Blaze has surfaced from the depths!");

register("chat", () => {
    catchHistory.history.push(Date.now());
    rateMobCount += 1;
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
    if (!settings.catchMessageFeedback) {
        cancel(event);
    }
    let mobName = crimsonIsleCatch[expression.match(findFormattedKey(crimsonIsleCatch))[0]];
    switch (mobName) {
        case "thunder":
            catchMythicCreature(mobName);
            playerData.COUNTER["plhlegblast"] += 1;
            playerData.COUNTER["lord_jawbus"] += 1;
            break;
        case "lord_jawbus":
            catchMythicCreature(mobName);
            playerData.COUNTER["plhlegblast"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
        case "plhlegblast":
            catchMythicCreature(mobName);
            playerData.COUNTER["lord_jawbus"] += 1;
            playerData.COUNTER["thunder"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                sendCommand(`pc ${settings.doubleHookMsg}`);
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
    if (!settings.catchMessageFeedback) {
        cancel(event);
    }
    let mobName = waterCatch[expression.match(findFormattedKey(waterCatch))[0]];
    switch (mobName) {
        case "carrot_king":
            catchMythicCreature(mobName);
            playerData.COUNTER["grim_reaper"] += 1;
            playerData.COUNTER["phantom_fisherman"] += 1;
            playerData.COUNTER["sea_emperor"] += 1;
            break;
        case "sea_emperor":
            catchMythicCreature(mobName);
            playerData.COUNTER["phantom_fisherman"] += 1;
            playerData.COUNTER["grim_reaper"] += 1;
            playerData.COUNTER["carrot_king"] += 1;
            break;
        case "grim_reaper":
            catchMythicCreature(mobName);
            playerData.COUNTER["phantom_fisherman"] += 1;
            break;
        case "phantom_fisherman":
            catchMythicCreature(mobName);
            playerData.COUNTER["grim_reaper"] += 1;
            break;
        case "yeti":
            catchMythicCreature(mobName);
            playerData.COUNTER["yeti"] += 1;
            break;
        default:
            if (fileData.doubleHook && settings.sendDoubleHook) {
                sendCommand(`pc ${settings.doubleHookMsg}`);
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

    if (dropData(drop).dropPing) {
        cancel(event);
        let msg = ChatLib.getChatMessage(event, true).replace("✯ Magic Find", "α Mixend Luck");
        ChatLib.chat(msg);
        announceDrop(drop, mf, playerData[drop]["current_count"], playerData[drop]["time_drop"], dropData(drop).spam);
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
register("step", (event) => {
    let worldMobs = [];
    trackedMobs.forEach(name => {
        let mobData = detectMobData(name);

        // Exit if mob not to be detected
        if (!mobData.enabled) { return; }

        // Get all entites
        let detectedMobs = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand")).filter(entity => entity.getName().includes(mobData.name));

        if (detectedMobs.length > 0) { worldMobs.push(...detectedMobs); }

        // Perform actions based on settings for that mob
        detectedMobs.forEach(mob => {
            // If mob already tracked
            if (mobTracker.filter(trackedMob => trackedMob[0].getUUID() === mob.getUUID()).length > 0) { return; }
            if (mobData.screen) {
                Client.showTitle(`Detected ${BOLD + mobData.color + mobData.name}`, "", 5, 60, 25);
            }
            if (mobData.sound) { DETECTED_SOUND?.play(); }
            mobTracker.push([mob, mobData.name])
        })
    })
    // Remove tracked mobs inexistent in the world 
    mobTracker = mobTracker.filter(entity => {
        return worldMobs.some(mob => mob.getUUID() === entity[0].getUUID())
    });
}).setFps(1);
//#endregion Detect creatures

register("renderWorld", () => {
    mobTracker.forEach(mob => {
        renderEntity(mob[0], 0.7, 0.7, 0, mob[1]);
    });
});

// Updates rates based on catch history (duration in settings)
register("step", (event) => {
    if (!settings.fishingGUIRate) { return; }
    let now = Date.now();
    let myList = catchHistory.history;
    let modeConverter = settings.fishingGUIAvgMode ? 3600 : 60; // true: per hour, off: per min
    let timespan = settings.fishingGUILength * 60; // in sec

    // Started less than settings.scRateWindowSec min ago
    if (myList[0] >= now - settings.fishingGUILength * 1000 * 60) {
        // Time since first catch in seconds
        timespan = (now - myList[0]) / 1000;
    }
    else {
        // remove all entries older than settings.scRateWindowSec min ago
        myList = myList.filter(value => value > now - settings.fishingGUILength * 1000 * 60);
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
    textItem.setString(`${text}`).setX(fileData.baseX + col * deltaX).setY(fileData.baseY + row * deltaY).setShadow(true).draw();
}

register("renderoverlay", () => {
    if (settings.fishingGUI & (Renderer.screen.getWidth() < fileData.baseX || Renderer.screen.getHeight() < fileData.baseY)) {
        textItem.setString(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}GUI OUT OF SCREEN`).setX(Renderer.screen.getWidth() / 10).setY(Renderer.screen.getHeight() / 3).setShadow(true).draw();
        textItem.setString(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}Use /mixgui fish and click the screen`).setX(Renderer.screen.getWidth() / 10).setY(Renderer.screen.getHeight() / 3 - 10).setShadow(true).draw();
    }

    if (movedisplay.isOpen()) {
        textItem.setString(`${RED + BOLD}ECHAP to save position`).setX(Renderer.screen.getWidth() / 2).setY(Renderer.screen.getHeight() / 2).setShadow(true).draw();
        textItem.setString(`${GREEN + BOLD}Click to place to left corner of GUI`).setX(Renderer.screen.getWidth() / 2).setY(10 + Renderer.screen.getHeight() / 2).setShadow(true).draw();
    }

    // Track bobbers
    if (settings.fishingGUI) {
        let bobbers = World.getAllEntitiesOfType(entitiesList.FishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 30);

        if (settings.fishingGUIMythic) {
            addGuiText(`${BLUE + BOLD}Thunder: ${GOLD + BOLD + playerData.COUNTER["thunder"]} [${playerData.AVG_DATA["thunder_avg"]}]`, 0, 0);
            addGuiText(`${RED + BOLD}Jawbus: ${GOLD + BOLD + playerData.COUNTER["lord_jawbus"]} [${playerData.AVG_DATA["lord_jawbus_avg"]}]`, 2, 0);
        }
        if (settings.fishingGUIPet) {
            addGuiText(`[${GOLD + BOLD + activePet.level + RESET}] ${activePet.color + BOLD + activePet.name} `, 0, 1);
        }
        if (settings.fishingGUIRate) {
            let rateMode = settings.fishingGUIAvgMode ? "hr" : "min";
            addGuiText(`${GREEN + BOLD}Sc/${rateMode}: ${GOLD + BOLD + rateSc.toFixed(1)} (${rateMobCount} in ${formatMilliseconds(Date.now() - startTime)})`, 0, 2);
        }

        if (settings.fishingGUIBobbers) {
            addGuiText(`${GREEN + BOLD} Bobber: ${GOLD + BOLD + bobbers.length} `, 2, 1);
        }
        let deltaRow = 1;
        mobTracker.forEach(entity => {
            addGuiText(`${entity[0].getName() + WHITE} [${AQUA + Player.asPlayerMP().distanceTo(entity[0]).toFixed(0)}m${WHITE}]`, 0, deltaRow + 2);
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
        textItem.setString(`${RED + BOLD}ECHAP to save position`).setX(Renderer.screen.getWidth() / 2).setY(Renderer.screen.getHeight() / 2).setShadow(true).draw();
        textItem.setString(`${GREEN + BOLD}Click to place to left corner of GUI`).setX(Renderer.screen.getWidth() / 2).setY(10 + Renderer.screen.getHeight() / 2).setShadow(true).draw();
    }
    if (!settings.catchSession) { return; }

    // WATER & GLOBAL
    if (settings.catchSessionFishingType && settings.catchSessionScope) {
        total = playerData.TOTAL_WATER;
        listFish = playerData.WATER_SC;
        fishDict = waterDict;
        listTime = currentSession.TIME_WATER_SC;
    }
    // WATER & CURRENT
    else if (settings.catchSessionFishingType && !settings.catchSessionScope) {
        total = currentSession.TOTAL_WATER;
        listFish = currentSession.CURRENT_WATER_SC;
        fishDict = waterDict;
        listTime = currentSession.TIME_WATER_SC;
    }
    // LAVA & GLOBAL
    else if (!settings.catchSessionFishingType && settings.catchSessionScope) {
        total = playerData.TOTAL;
        listFish = playerData.LAVA_SC;
    }
    textItem.setString(`${RED + BOLD}Total: ${WHITE}${total}`).setX(xPos).setY(yPos).setShadow(true).draw();
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
        let timeFish = "";
        let percentageFish = "";
        if (settings.catchSessionTime) {
            timeFish = ` ${WHITE}[${formatMilliseconds(Date.now() - listTime[fishDict[i].id])}]`;
        }
        if (settings.catchSessionPercentage) {
            percentageFish = `(${percentage.toFixed(2)}%) `;
        }
        textItem.setString(`${WHITE}${count} ${percentageFish}${color}${fishDict[i].name}${timeFish}`).setX(xPos).setY(yPos + 10 * (i + 1)).setShadow(true).draw();
    }
});
//#endregion GUI SESSION

// Move GUIS
register("command", (arg, arg2) => {
    switch (arg) {
        case "session":
            if (!settings.catchSession) { return; }
            switch (arg2) {
                case "reset":
                case "-r":
                    fileData.sessionGuiX = 10;
                    fileData.sessionGuiY = 75;
                    fileData.save();
                    break;
                default:
                    ChatLib.chat(`${GOLD + BOLD}Click on the screen to place the GUI`)
                    moveGuiSession.open()
                    break;
            }
            break;
        case "fish":
            if (!settings.fishingGUI) { return; }
            switch (arg2) {
                case "reset":
                case "-r":
                    fileData.baseX = 10;
                    fileData.baseY = 10;
                    fileData.save();
                    break;
                default:
                    ChatLib.chat(`${GOLD + BOLD}Click on the screen to place the GUI`)
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