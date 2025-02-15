import settings from "../settings";
import { BOLD, GOLD, GREEN, RED, WHITE, mixendmod } from "../utils/constants";
import { archive, datav2 } from "../utils/data";
import { formatMilliseconds, sendCommand } from "../utils/functions";
import { seaCreatureConst } from "../utils/gameData";
register("chat", (player, message) => {
    // Handle rank
    if (player.includes("]")) {
        player = player.split('] ')[1];
    }
    if (message == settings.partyCode) {
        sendCommand(`p ${player}`);
    }
}).setCriteria("From ${player}: ${message}");

register("command", (command, ...arg) => {

    let sessionName = undefined;
    if (arg != undefined) { sessionName = arg.join(" "); }

    switch (command) {
        case 'start':
            // Check session name
            if (sessionName == undefined) {
                sendChat(`${RED}Usage: /mixsession ${command} <session name>`);
                availableSessionsNames();
                return;
            }

            // Cannot start an existing session
            if (archive.sessions.hasOwnProperty(sessionName)) {
                sendChat(`${RED}Session "${sessionName}" already exists. Load or delete it.`);
                return;
            }

            // Save data to current session
            saveSessionData()

            // Set session name
            datav2.session = sessionName
            sendChat(`${GOLD}Session "${sessionName}" started`)

            // Reset data
            Object.keys(seaCreatureConst).forEach(name => {
                datav2["seaCreaturesGlobal"][name].session = {
                    count: 0,
                    time: 0,
                    since: 0
                }
            });
            break;
        case 'save':
            // Save data to current session name
            saveSessionData()
            break;
        case 'load':
            // Check session name
            if (sessionName == undefined) {
                sendChat(`${RED}Usage: /mixsession ${command} <session name>`);
                availableSessionsNames()
                return;
            }

            // Check session name
            if (!archive.sessions.hasOwnProperty(sessionName)) {
                sendChat(`${RED}Session "${sessionName}" does not exist. Start it or select an existing session`);
                availableSessionsNames()
                return;
            }

            // Save data to session name
            saveSessionData()

            // Set session name
            datav2.session = sessionName
            sendChat(`${GOLD}Session "${sessionName}" started`)

            // Load given session name
            Object.keys(seaCreatureConst).forEach(name => {
                datav2["seaCreaturesGlobal"][name].session = archive.sessions[sessionName][name]
            });
            break;
        case 'forceload':
            // Check session name
            if (sessionName == undefined) {
                sendChat(`${RED}Usage: /mixsession ${command} <session name>`);
                availableSessionsNames()
                return;
            }

            // Check session name
            if (!archive.sessions.hasOwnProperty(sessionName)) {
                sendChat(`${RED}Session "${sessionName}" does not exist. Start it or select an existing session`);
                availableSessionsNames()
                return;
            }

            // Set session name
            datav2.session = sessionName
            sendChat(`${GOLD}Session "${sessionName}" started`)

            // Load given session name
            Object.keys(seaCreatureConst).forEach(name => {
                datav2["seaCreaturesGlobal"][name].session = archive.sessions[sessionName][name]
            });
            break;
        case 'stop':
            // Save data to session name
            saveSessionData()

            // Set to default session
            datav2.session = "default"
            sendChat(`${GOLD}Session "default" started`)

            // Reset data
            Object.keys(seaCreatureConst).forEach(name => {
                datav2["seaCreaturesGlobal"][name].session = {
                    count: 0,
                    time: 0,
                    since: 0
                }
            });
            break;
        case 'delete':
            switch (sessionName) {
                case undefined:
                    sendChat(`${RED}Usage: /mixsession ${command} <session name>`);
                    availableSessionsNames()
                    return;
                case "default":
                    sendChat(`${RED}Cannot delete default session.`);
                    return;
                case datav2.session:
                    sendChat(`${RED}Cannot delete current session "${datav2.session}"`);
                    return;
                default:
                    delete archive.sessions[sessionName];
                    sendChat(`${GOLD}Deleted sessions "${sessionName}"`);
                    availableSessionsNames()
                    break;
            }
            break;
        case "display":
            // Check session name
            if (sessionName == undefined) {
                sendChat(`${GOLD + BOLD}Data for "${datav2.session}"`);
                let total = 0;
                Object.keys(seaCreatureConst).forEach(element => {
                    total += datav2["seaCreaturesGlobal"][element].session.count;
                })
                sendChat(`${GOLD + BOLD}TOTAL: ${WHITE + BOLD + total}`);
                Object.keys(seaCreatureConst).forEach(element => {
                    if (datav2["seaCreaturesGlobal"][element].session.count == 0) return;
                    let count = datav2["seaCreaturesGlobal"][element].session.count
                    let since = datav2["seaCreaturesGlobal"][element].session.since
                    let name = seaCreatureConst[element];
                    let time = formatMilliseconds(Date.now() - datav2["seaCreaturesGlobal"][element].session.time)
                    let percentage = (count / total) * 100;
                    sendChat(`${GOLD + name}: ${WHITE + BOLD + count} ${GOLD}[${since} in ${time}]`);
                });
                return;
            }
            if (!archive.sessions.hasOwnProperty(sessionName)) {
                sendChat(`${RED}Session "${sessionName}" does not exist. Start it or select an existing session`);
                availableSessionsNames()
                return;
            }
            let sessionSaved = formatMilliseconds(Date.now() - archive.sessions[sessionName].lastSaved);
            sendChat(`${GOLD + BOLD}Data for "${sessionName}" (${sessionSaved} ago)`);
            showSessionData(sessionName);
            break;
        case "list":
            availableSessionsNames()
            break;
        // case "edit":
        //     if (sessionName == undefined) { return; }
        //     archive.sessions[datav2.session][sessionName] = {
        //         count: 0,
        //         time: 0,
        //         since: 0
        //     }
        //     datav2["seaCreaturesGlobal"][sessionName].session = {
        //         count: 0,
        //         time: 0,
        //         since: 0
        //     }
        //     break;
        case "rename":
            if (sessionName == undefined) sendChat(`Select a new name for session "${datav2.session}"`)
            archive.sessions[sessionName] = archive.sessions[datav2.session];
            delete archive.sessions[datav2.session];
            sendChat(`Renamed "${datav2.session}" to "${sessionName}"`)
            datav2.session = sessionName;
            break;
        default:
            sendChat(`${GOLD + BOLD}Current session: ${datav2.session}`)
            sendChat(`${RED}Available arguments: <start save load stop delete display list rename>`)
            return;
    }

    archive.save();
    datav2.save();
}).setName("mixsession");

function availableSessionsNames() {
    sendChat(`${GOLD}Available sessions:`);
    Object.keys(archive.sessions).forEach(element => {
        let current = ""
        if (element == datav2.session) current = ` ${GREEN + BOLD}(current)`;
        sendChat(`${GOLD + element + current}`);
    });
};

function sendChat(test) {
    ChatLib.chat(`${mixendmod + test}`);
}

function showSessionData(sessionName) {
    let total = 0;
    Object.keys(seaCreatureConst).forEach(element => {
        total += archive.sessions[sessionName][element].count;
    })
    sendChat(`${GOLD + BOLD}TOTAL: ${WHITE + BOLD + total}`);
    Object.keys(seaCreatureConst).forEach(element => {
        if (archive.sessions[sessionName][element].count == 0) return;
        let count = archive.sessions[sessionName][element].count
        let since = archive.sessions[sessionName][element].since
        let name = seaCreatureConst[element];
        let time = formatMilliseconds(Date.now() - archive.sessions[sessionName][element].time)
        let percentage = (count / total) * 100;
        sendChat(`${GOLD + name}: ${WHITE + BOLD + count} ${GOLD}[${since} in ${time}]`);
    });
}

function saveSessionData() {
    sessionObject = {}
    Object.keys(seaCreatureConst).forEach(name => {
        sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
    })
    sendChat(`${GOLD}Saving data to session "${datav2.session}"`);
    sessionObject["lastSaved"] = Date.now();
    archive.sessions[datav2.session] = sessionObject
}

//#region Party commands
register("chat", () => {
    if (settings.enablePartyCommands) {
        sendCommand(`pc [Commands] !pt <playername> | !warp`);
    }
}).setCriteria("Party ${*}: !help");

register("chat", () => {
    let count = datav2["rareDrops"]["Radioactive Vial"].since;
    let time = datav2["rareDrops"]["Radioactive Vial"].time;
    sendCommand(`pc Last Vial ${count} Jawbus ago`);
}).setCriteria("Party ${*}: !vi");

register("chat", () => {
    let count = datav2["seaCreaturesGlobal"]["lord_jawbus"].since;
    let time = datav2["seaCreaturesGlobal"]["lord_jawbus"].time;
    sendCommand(`pc Last Jawbus ${count} sc ago [${datav2.average["lord_jawbus"].value} AVG]`);
}).setCriteria("Party ${*}: !ji");

register("chat", () => {
    let count = datav2["seaCreaturesGlobal"]["thunder"].since;
    let time = datav2["seaCreaturesGlobal"]["thunder"].time;
    sendCommand(`pc Last Thunder ${count} sc ago [${datav2.average["thunder"].value} AVG]`);
}).setCriteria("Party ${*}: !ti");

register("chat", (player) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        sendCommand(`p transfer ${player}`);
    }
}).setCriteria("Party ${*}: !pt ${player}");

register("chat", (player) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        sendCommand(`p ${player}`);
    }
}).setCriteria("Party ${*}: !p ${player}");

register("chat", (playername) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        sendCommand(`p transfer ${playername}`);
    }
}).setCriteria("Party > ${*} ${playername}: !pt");

register("chat", (playername) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        sendCommand(`p transfer ${playername}`);
    }
}).setCriteria("Party > ${*} ${playername}: !ptme");

register("chat", (playername) => {
    if (settings.enablePartyCommands) {
        sendCommand(`p settings allinvite`);
    }
}).setCriteria("Party > ${*} ${playername}: !allinvite");

register("chat", (playername) => {
    if (settings.enablePartyCommands) {
        sendCommand(`p settings allinvite`);
    }
}).setCriteria("Party > ${*} ${playername}: !allinv");

register("chat", () => {
    if (settings.enablePartyCommands && settings.enablePartyWarp) {
        sendCommand("p warp");
    }
}).setCriteria("Party ${*}: !warp");

register("chat", () => {
    if (settings.enablePartyCommands && settings.enablePartyWarp) {
        sendCommand("p warp");
    }
}).setCriteria("Party ${*}: !w");
//#endregion Party commands


register("chat", () => {
    Client.showTitle(`aaaaaaaa`, "", 1, 1, 1);
}).setCriteria("Sending to server ${*}");