import settings from "../settings";
import { BOLD, DARK_RED, GOLD, GRAY, ITALIC, RED, WHITE } from "../utils/constants";
import { archive, datav2 } from "../utils/data";
import { sendCommand } from "../utils/functions";
import { seaCreatureConst } from "../utils/gameData";
const commands = [['/mixend /mix', "Opens settings"],
['/mixgui', "Moves GUI"],
['/mixguimini', "Moves gui for the miniboss"],
['/mixresetcores', "Resets magma core counter"],
];

register("command", () => {
    ChatLib.chat(`${DARK_RED + BOLD}--------------------------------`);
    ChatLib.chat(`${DARK_RED + BOLD}---- MixendMod command helper ----`);
    ChatLib.chat(`${DARK_RED + BOLD}--------------------------------`);
    commands.forEach(element => {
        ChatLib.chat(`${GOLD}${element[0]}${GRAY + ITALIC} ${element[1]}`);
    });
    ChatLib.chat(`${DARK_RED + BOLD}--------------------------------`);

}).setName("mixhelp", true);

register("chat", (player, message) => {
    // Handle rank
    console.log(player, message)
    if (player.includes("]")) {
        player = player.split('] ')[1];
    }
    console.log(player)
    if (message == settings.partyCode) {
        sendCommand(`p ${player}`);
    }
}).setCriteria("From ${player}: ${message}");

register("command", (command, ...arg) => {

    let sessionName = undefined;
    if (arg != undefined) { sessionName = arg.join(" "); }

    let sessionObject = {}
    switch (command) {
        case 'start':
            // Check session name
            if (sessionName == undefined) {
                ChatLib.chat(`${RED + BOLD}Enter a session name to start in the command`);
                ChatLib.chat(`${RED + BOLD}Example: /mixsession start cishing`);
                ChatLib.chat(`${RED + BOLD}Available sessions:`);
                Object.keys(archive.sessions).forEach(element => {
                    ChatLib.chat(`${RED + BOLD + element}`);
                });
                return;
            }

            // Cannot start an existing session
            if (archive.sessions.hasOwnProperty(sessionName)) {
                ChatLib.chat(`${RED + BOLD}Session "${sessionName}" already exists. Load or delete it.`);
                return;
            }

            // Save data to current session
            sessionObject = {}
            Object.keys(seaCreatureConst).forEach(name => {
                sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
            })
            ChatLib.chat(`${GRAY + BOLD}Saving data to session "${datav2.session}"`);
            archive.sessions[datav2.session] = sessionObject

            // Set session name
            datav2.session = sessionName
            ChatLib.chat(`${GRAY + BOLD}Session "${sessionName}" started`)

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
            sessionObject = {}
            Object.keys(seaCreatureConst).forEach(name => {
                sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
            })
            ChatLib.chat(`${GRAY + BOLD}Saving data to session "${datav2.session}"`);
            archive.sessions[datav2.session] = sessionObject
            break;
        case 'load':
            // Check session name
            if (sessionName == undefined) {
                ChatLib.chat(`${RED + BOLD}Enter a session name to load it in the command`);
                ChatLib.chat(`${RED + BOLD}Example: /mixsession load cishing`);
                ChatLib.chat(`${RED + BOLD}Available sessions:`);
                Object.keys(archive.sessions).forEach(element => {
                    ChatLib.chat(`${RED + BOLD + element}`);
                });
                return;
            }

            if (sessionName == datav2.session) {
                ChatLib.chat(`${RED + BOLD}You are already in the session "${datav2.session}"`);
                return;
            }

            // Check session name
            if (!archive.sessions.hasOwnProperty(sessionName)) {
                ChatLib.chat(`${RED + BOLD}Session "${sessionName}" does not exist. Start it or select an existing session`);
                return;
            }

            // Save data to session name
            sessionObject = {}
            Object.keys(seaCreatureConst).forEach(name => {
                sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
            })
            ChatLib.chat(`${GRAY + BOLD}Saving data to session "${datav2.session}"`);
            archive.sessions[datav2.session] = sessionObject

            // Set session name
            datav2.session = sessionName
            ChatLib.chat(`${GRAY + BOLD}Session "${sessionName}" started`)

            // Load given session name
            Object.keys(seaCreatureConst).forEach(name => {
                datav2["seaCreaturesGlobal"][name].session = archive.sessions[sessionName][name]
            });
            break;
        case 'stop':
            // Save data to session name
            sessionObject = {}
            Object.keys(seaCreatureConst).forEach(name => {
                sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
            })
            ChatLib.chat(`${GRAY + BOLD}Saving data to session "${datav2.session}"`);
            archive.sessions[datav2.session] = sessionObject

            // Set to default session
            datav2.session = "default"
            ChatLib.chat(`${GRAY + BOLD}Session "default" started`)

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
                    ChatLib.chat(`${RED + BOLD}Enter a session name to delete it in the command`);
                    ChatLib.chat(`${RED + BOLD}Example: /mixsession delete cishing`);
                    ChatLib.chat(`${RED + BOLD}Available sessions:`);
                    Object.keys(archive.sessions).forEach(element => {
                        ChatLib.chat(`${RED + BOLD + element}`);
                    });
                    return;
                case "default":
                    ChatLib.chat(`${RED + BOLD}Cannot delete default session.`);
                    return;
                case datav2.session:
                    ChatLib.chat(`${RED + BOLD}Cannot delete current session "${datav2.session}"`);
                    return;
                default:
                    delete archive.sessions[sessionName];
                    ChatLib.chat(`${GRAY + BOLD}Deleted sessions "${sessionName}"`);
                    ChatLib.chat(`${GRAY + BOLD}Available sessions:`);
                    Object.keys(archive.sessions).forEach(element => {
                        ChatLib.chat(`${GRAY + BOLD + element}`);
                    });
                    break;
            }
            break;
        default:
            ChatLib.chat(`${GOLD + BOLD}Current session: ${datav2.session}`)
            ChatLib.chat(`${GOLD + BOLD}Available an arguments: <start save load stop delete>`)
            return;
    }
    archive.save();
    datav2.save();
}).setName("mixsession");