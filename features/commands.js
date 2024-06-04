import { BOLD, DARK_RED, GOLD, GRAY, ITALIC, WHITE } from "../utils/constants";
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
    if (player.includes("]")) {
        player = player.split('] ')[1];
    }
    if (message == settings.partyCode) {
        sendCommand(`p ${player}`);
    }
}).setCriteria("From ${player}: ${message}");