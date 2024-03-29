import { announceDrop, renderEntity, formatMilliseconds, findFormattedKey, announceMob, calcAvg } from "../utils/functions";
import { playerData, fileData, catchHistory } from "../utils/data";
import settings from "../settings";
import { DARK_BLUE, DARK_PURPLE, DARK_RED, BOLD, DETECTED_SOUND, GOLD, RED, BLUE, RESET, GREEN } from "../utils/constants";
import { crimsonIsleCatch, doubleHookCatch, dropData, seaCreatureData, waterCatch } from "../utils/gameData";
import { activePet } from "./general";


// TRACK MOBS
let mobTracker = []; // Entity of tracked entities
let validNames = ["Lord Jawbus", "Thunder", "Vanquisher", "Plhlegblast"];
// SC RATES
let rateSc = 0;
let startTime = Date.now();
let rateMobCount = 0;

const EntityFishHook = Java.type("net.minecraft.entity.projectile.EntityFishHook")

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
            let avg = fileData.eternalring / 2.5
            ChatLib.command(`pc [${fileData.magmacores} cores | ${fileData.eternalring} rings] [avg: ${avg.toFixed(2)} cores]`);
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
register("step", (event) => {
    if (!settings.alertMythic) { return; }

    // Get tracked mobs list
    let mobList = World.getAllEntities().filter(obj => {
        let name = obj.getName();
        return validNames.some(validName => name.includes(validName));
    });

    // Detect each mob
    mobList.forEach(worldMob => {
        if (mobTracker.filter(trackedMob => trackedMob.getUUID() === worldMob.getUUID()).length < 1) {
            let playSound = true;
            switch (true) {
                case worldMob.getName().includes("Lord Jawbus"):
                    color = DARK_RED + "LORD JAWBUS";
                    playSound = settings.alertJawbusSound
                    break;
                case worldMob.getName().includes("Thunder"):
                    color = DARK_BLUE + "THUNDER";
                    playSound = settings.alertThunderSound
                    break;
                case worldMob.getName().includes("Plhlegblast"):
                    color = DARK_PURPLE + "PLHLEGBLAST";
                    playSound = settings.alertPlhlegblastSound
                    break;
                case worldMob.getName().includes("Vanquisher"):
                    color = DARK_PURPLE + "VANQUISHER";
                    playSound = settings.alertVanquisherSound
                    break;
                default:
                    break;
            }
            // Send to render mob position in game
            mobTracker.push(worldMob);

            Client.showTitle(`DETECTED ${BOLD + color}`, "", 5, 60, 25);
            if (playSound) { DETECTED_SOUND?.play(); }
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
    catchHistory.save()
}).setName("mixresettrack", true);

//========================================
// GUI
//========================================

// move graph event
let movedisplay = new Gui();

register("command", () => {
    if (settings.guiEnable) {
        movedisplay.open()
    }
}).setName("mixgui");

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

    if (Renderer.screen.getWidth() < fileData.baseX || Renderer.screen.getHeight() < fileData.baseY) {
        new Text(`${RED + BOLD}[${DARK_RED + BOLD}MixendModGUI${RED + BOLD}] GUI OUT OF SCREEN`, Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2).draw();
        new Text(`${RED + BOLD}[${DARK_RED + BOLD}MixendModGUI${RED + BOLD}] GUI OUT OF SCREEN`, (Renderer.screen.getWidth() / 2), Renderer.screen.getHeight() / 2 - 8).draw();
        new Text(`${RED + BOLD}[${DARK_RED + BOLD}MixendModGUI${RED + BOLD}] GUI OUT OF SCREEN`, (Renderer.screen.getWidth() / 2), Renderer.screen.getHeight() / 2 - 16).draw();
    }

    if (movedisplay.isOpen()) {
        new Text(`${RED + BOLD}ECHAP to save position`, Renderer.screen.getWidth() / 2, 20).draw();
        new Text(`${GREEN + BOLD}Click to place to left corner of GUI`, Renderer.screen.getWidth() / 2, 30).draw();
    }

    // Track bobbers
    if (settings.guiEnable) {
        let bobbers = World.getAllEntitiesOfType(EntityFishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 30);

        if (settings.guiMythicCount) {
            addGuiText(`${BLUE + BOLD}Thunder: ${GOLD + BOLD + playerData.COUNTER["thunder"]} [${playerData.AVG_DATA["thunder_avg"]}]`, 0, 0);
            addGuiText(`${RED + BOLD}Jawbus: ${GOLD + BOLD + playerData.COUNTER["lord_jawbus"]} [${playerData.AVG_DATA["lord_jawbus_avg"]}]`, 2, 0);
        }
        if (settings.guiActivePet) {
            addGuiText(`[${GOLD + BOLD + activePet.level + RESET}] ${BOLD + activePet.name} `, 0, 1);
        }
        if (settings.guiCatchRate) {
            let rateMode = settings.guiCatchRateMode ? "hr" : "min";
            addGuiText(`${GREEN + BOLD}Sc / ${rateMode}: ${GOLD + BOLD + rateSc.toFixed(1)} (${rateMobCount} in ${formatMilliseconds(Date.now() - startTime)})`, 0, 2);
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


register("worldUnload", () => {
    mobTracker = [];
    startTime = Date.now();
    rateMobCount = 0;
    catchHistory.history = [];
    catchHistory.save();
});