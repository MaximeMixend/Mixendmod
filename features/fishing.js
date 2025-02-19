/**
 * Try to display tracking sea creatures via a command and a custom interface so it is not 24/7 on screen
 * 
 */
import { formatMilliseconds, findFormattedKey, announceMob, calcAvg, sendCommand, getCatchOptions, sendChat } from "../utils/functions";
import { fileData, catchHistory, datav2 } from "../utils/data";
import settings from "../settings";
import { DARK_RED, BOLD, GOLD, RED, BLUE, RESET, GREEN, entitiesList, BLACK, WHITE } from "../utils/constants";
import { doubleHookCatch, catchMobData, lavaSeaCreature, waterSeaCreature, seaCreatureConst, waterCatch, crimsonIsleCatch, spookyCatch, jerryWorkshopCatch, festivalCatch, crystalHollowCatch } from "../utils/gameData";
import { activePet } from "./pet";

let textItem = new Text("", 0, 0);

// TRACK MOBS
// SC RATES
let rateSc = 0;
let startTime = Date.now();
let rateMobCount = 0;
let bobberCount = 0;
//========================================
// CATCH
//========================================
//#region CATCH
register("chat", (text, event) => {
    fileData.doubleHook = true;
    if (settings.doubleHookHide)
        cancel(event);
}).setCriteria(doubleHookCatch);

let catchPoolNames = [];
register("chat", (expression, event) => {
    if (!settings.catchMessageFeedback) {
        cancel(event);
    }
    // Get mob name
    const _catchOptions = getCatchOptions();
    let match = expression.match(findFormattedKey(_catchOptions));
    let mobName = match == null ? undefined : _catchOptions[match[0]];
    let sayDoubleHook = true;
    catchPoolNames = [];
    if (mobName == undefined) return;

    // Get what other mobs are available in the catch pool based on caught mob type (lava / water) + catch options
    const _seaCreatureNames = lavaSeaCreature.includes(mobName) ? lavaSeaCreature : waterSeaCreature;
    catchPoolNames = _seaCreatureNames.filter(value => Object.values(_catchOptions).includes(value));

    // Update catch pool
    catchPoolNames.forEach(_mobName => {
        datav2["seaCreaturesGlobal"][_mobName].since += 1;
        datav2["seaCreaturesGlobal"][_mobName].session.since += 1;
    })
    // Correct for extra incrementation on current mob
    datav2["seaCreaturesGlobal"][mobName].session.since -= 1;
    datav2["seaCreaturesGlobal"][mobName].since -= 1;

    // Do things based off settings (party ping, custom catch message)
    if (catchMobData(mobName)) {
        const catchInterval = Date.now() - datav2["seaCreaturesGlobal"][mobName].time;
        const catchSince = datav2["seaCreaturesGlobal"][mobName].since;
        let catchData = catchMobData(mobName);

        // Custom catch message
        if (settings.catchMessageCustom) {
            let customMessage = fileData.doubleHook ? "(Double) " + catchData.name : catchData.name
            customMessage = catchData.color + BOLD + customMessage;

            if (settings.catchPingMode) {
                let catchRate = catchSince / (catchInterval / 1000 / 3600);
                ChatLib.chat(`${customMessage} ${WHITE}[${catchSince} at ${catchRate.toFixed(1)}/h]`);
            }
            else { ChatLib.chat(`${customMessage} ${WHITE}[${catchSince} in ${formatMilliseconds(catchInterval)}]`); }
        }

        // Announce mob to party
        if (catchData.partyPing) {
            sayDoubleHook = false;
            let baseMessage = catchData.partyMessage === ""
                ? `${catchData.name}! Sponsored by MixendMod™ `
                : catchData.partyMessage;

            let partyMsg = fileData.doubleHook ? `(Double) ${baseMessage}` : baseMessage;
            announceMob(partyMsg.trim(), catchSince, catchInterval);
        };

        // Update tracked loot
        if (catchData.trackedLoot) {
            datav2["rareDrops"][catchData.trackedLoot].since += fileData.doubleHook ? 2 : 1;
        };

        // Update catch average
        if (catchData.trackAverage) {
            datav2.average[mobName].all.push(catchSince);
            datav2.average[mobName].value = calcAvg(datav2.average[mobName].all).toFixed(0);
        }

        if (mobName == "thudner") {
            setTimeout(() => {
                ChatLib.chat("JUMPING!");
            }, 5000);
        }
    }

    if (settings.sendDoubleHook && sayDoubleHook && fileData.doubleHook) sendCommand(`pc ${settings.doubleHookMsg}`);

    catchHistory.history.push(Date.now());
    rateMobCount += 1;

    fileData.doubleHook = false;

    // Update caught mob data
    datav2["seaCreaturesGlobal"][mobName].time = Date.now();
    datav2["seaCreaturesGlobal"][mobName].count += 1;
    datav2["seaCreaturesGlobal"][mobName].since = 0;
    datav2["seaCreaturesGlobal"][mobName].session.time = Date.now();
    datav2["seaCreaturesGlobal"][mobName].session.count += 1;
    datav2["seaCreaturesGlobal"][mobName].session.since = 0;

    // Save changes
    datav2.save()
    catchHistory.save();
    fileData.save();

}).setCriteria(findFormattedKey({
    ...waterCatch,
    ...crimsonIsleCatch,
    ...spookyCatch,
    ...jerryWorkshopCatch,
    ...festivalCatch,
    ...crystalHollowCatch
}));
register("chat", () => {
    datav2["vanquisher"].since += 1;
    datav2.save();
}).setCriteria(findFormattedKey({
    ...crimsonIsleCatch
}));
//#endregion CATCH

//========================================
// SC TRACKER
//========================================
// Updates rates based on catch history (duration in settings)
register("step", (event) => {
    if (!settings.fishingGUIRate) { return; }
    let now = Date.now();
    let myList = catchHistory.history;
    let modeConverter = 3600; // true: per hour, off: per min
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
//#region GUI FISHING DATA
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
        textItem.setString(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}GUI OUT OF SCREEN`)
            .setX(Renderer.screen.getWidth() / 10)
            .setY(Renderer.screen.getHeight() / 3)
            .setShadow(true).draw();
        textItem.setString(`${BLACK + BOLD}[${DARK_RED + BOLD}MixendModGUI${BLACK + BOLD}] ${BLACK + BOLD}Use /mixgui fish and click the screen`)
            .setX(Renderer.screen.getWidth() / 10)
            .setY(Renderer.screen.getHeight() / 3 - 10)
            .setShadow(true).draw();
    }

    if (movedisplay.isOpen()) {
        textItem.setString(`${RED + BOLD}ECHAP to save position`)
            .setX(Renderer.screen.getWidth() / 2)
            .setY(Renderer.screen.getHeight() / 2)
            .setShadow(true).draw();
        textItem.setString(`${GREEN + BOLD}Click to place to left corner of GUI`)
            .setX(Renderer.screen.getWidth() / 2)
            .setY(10 + Renderer.screen.getHeight() / 2)
            .setShadow(true).draw();
    }

    // Track bobbers
    if (settings.fishingGUI) {
        let bobbers = World.getAllEntitiesOfType(entitiesList.FishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 30);
        bobberCount = bobbers.length
        if (settings.fishingGUIMythic) {
            addGuiText(`${BLUE + BOLD}Thunder: ${GOLD + BOLD + datav2["seaCreaturesGlobal"]["thunder"].session.since} [${datav2.average["thunder"].value}]`, 0, 0);
            addGuiText(`${RED + BOLD}Jawbus: ${GOLD + BOLD + datav2["seaCreaturesGlobal"]["lord_jawbus"].session.since} [${datav2.average["lord_jawbus"].value}]`, 2, 0);
        }
        if (settings.fishingGUIPet) {
            addGuiText(`[${GOLD + BOLD + activePet.level + RESET}] ${activePet.color + BOLD + activePet.name} `, 0, 1);
        }
        if (settings.fishingGUIRate) {
            let rateMode = "hr";
            addGuiText(`${GREEN + BOLD}Sc/${rateMode}: ${GOLD + BOLD + rateSc.toFixed(1)} (${rateMobCount} in ${formatMilliseconds(Date.now() - startTime)})`, 0, 2);
        }
        if (settings.fishingGUIBobbers) {
            addGuiText(`${GREEN + BOLD} Bobber: ${GOLD + BOLD + bobberCount} `, 2, 1);
        }
    }
});
//#endregion GUI FISHING DATA

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
    let xPos = fileData.sessionGuiX;
    let yPos = fileData.sessionGuiY;

    if (moveGuiSession.isOpen()) {
        textItem.setString(`${RED + BOLD}ECHAP to save position`)
            .setX(Renderer.screen.getWidth() / 2)
            .setY(Renderer.screen.getHeight() / 2)
            .setShadow(true).draw();
        textItem.setString(`${GREEN + BOLD}Click to place to left corner of GUI`)
            .setX(Renderer.screen.getWidth() / 2)
            .setY(10 + Renderer.screen.getHeight() / 2)
            .setShadow(true).draw();
    }

    // GUI catch session breakdown
    if (!settings.catchSession) { return; }

    let count = 0;
    let color = RED;
    let i = 0;
    let total = 0;
    let scopeData = datav2["seaCreaturesGlobal"]
    catchPoolNames.forEach(elem => {
        total += scopeData[elem].session.count;
    })

    // Display lines
    catchPoolNames.forEach(element => {
        count = scopeData[element].session.count;
        if (count == 0) {
            return;
        }
        let percentage = (count / total) * 100;
        let timeFish = "";
        let percentageFish = "";
        if (settings.catchSessionTime) {
            timeFish = ` ${WHITE}[${formatMilliseconds(Date.now() - scopeData[element].session.time)}]`;
        }
        if (settings.catchSessionPercentage) {
            percentageFish = `(${percentage.toFixed(2)} %) `;
        }
        textItem.setString(`${WHITE}${count} ${percentageFish}${color}${seaCreatureConst[element]}${timeFish}`)
            .setX(xPos)
            .setY(yPos + 10 * (i + 1))
            .setShadow(true).draw();
        i += 1;
    });
    if (!catchPoolNames.length)
        textItem.setString(`${RED + BOLD}Catch a fish to display some stats!`)
            .setX(xPos)
            .setY(yPos + 10)
            .setShadow(true).draw();
    textItem.setString(`${RED + BOLD}Total: ${WHITE}${total} (${datav2.session})`)
        .setX(xPos)
        .setY(yPos)
        .setShadow(true).draw();
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
            ChatLib.chat(`${GOLD + BOLD} Usage: /mixgui <session/fish > optional: <reset>`);
            break;
    }
}).setName("mixgui");

register("worldUnload", () => {
    startTime = Date.now();
    rateMobCount = 0;
    catchHistory.history = [];
    catchHistory.save();
});