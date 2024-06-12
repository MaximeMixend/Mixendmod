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

register("command", (...arg) => {

    //Check name
    if (arg == undefined) { ChatLib.chat(`${RED + BOLD}Enter a session name`); return; }

    let sessionName = arg.join(" ");
    //Check if it exists
    if (archive.sessions.hasOwnProperty(sessionName)) {
        ChatLib.chat(`${RED + BOLD}Session "${sessionName}" already exists`)
        return;
    }

    // Save session
    let sessionObject = {}
    Object.keys(seaCreatureConst).forEach(name => {
        sessionObject[name] = datav2["seaCreaturesGlobal"][name].session
    })
    archive.sessions[sessionName] = sessionObject
    ChatLib.chat(`${RED + BOLD}Saving session data as ${sessionName}`);

    //Reset
    ChatLib.chat(`${RED + BOLD}Resetting session data...`)
    Object.keys(seaCreatureConst).forEach(name => {
        datav2["seaCreaturesGlobal"][name].session = {
            count: 0,
            time: 0,
            since: 0
        }
    });
    datav2.save();
    archive.save()
}).setName("mixsessionreset");

register("command", (...arg) => {

    if (arg == undefined) { ChatLib.chat(`${RED + BOLD}Enter a session name`); return; }


    let sessionName = arg.join(" ");

    //Check if session is valid
    if (!archive.sessions.hasOwnProperty(sessionName)) {
        ChatLib.chat(`${RED + BOLD}Session "${sessionName}" not found`)
        return;
    }

    // Load
    ChatLib.chat(`${RED + BOLD}Session "${sessionName}" loaded and removed from archives`)
    Object.keys(seaCreatureConst).forEach(name => {
        datav2["seaCreaturesGlobal"][name].session = archive.sessions[sessionName][name]
    });
    delete archive.sessions[sessionName];
    archive.save();
    datav2.save();
}).setName("mixsessionload");