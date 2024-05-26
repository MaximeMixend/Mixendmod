import settings from "../settings";
import { BOLD, DARK_GREEN, BLUE, DARK_RED } from "../utils/constants";
import { fileData } from "../utils/data";

// -----------------------------------
// SPIRIT MASK
// -----------------------------------
// TODO: Make a GUI status
register("chat", () => {
    Client.showTitle(`${DARK_RED + BOLD}SPIRIT MASK USED`, "", 10, 120, 10);
    setTimeout(() => {
        Client.showTitle(`${DARK_GREEN + BOLD}SPIRIT MASK BACK`, "", 10, 120, 10);
    }, 30000)
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!");

// -----------------------------------
// THUNDER BOTTLE
// -----------------------------------
register("chat", () => {
    setTimeout(() => {
        Client.showTitle(`${BLUE + BOLD}THUNDER BOTTLE FULL`, "", 0, 100, 10);
    }, 1000);
}).setCriteria("> Your bottle of thunder has fully charged!");

// -----------------------------------
// Party command
// -----------------------------------
register("chat", () => {
    if (settings.enablePartyCommands) {
        ChatLib.command(`pc [Commands] !pt <playername> | !warp`);
    }
}).setCriteria("Party ${*}: !help");

register("chat", (player) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        ChatLib.command(`p transfer ${player}`);
    }
}).setCriteria("Party ${*}: !pt ${player}");

register("chat", (playername) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        ChatLib.command(`p transfer ${playername}`);
    }
}).setCriteria("Party > ${*} ${playername}: !pt");

register("chat", (playername) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        ChatLib.command(`p transfer ${playername}`);
    }
}).setCriteria("Party > ${*} ${playername}: !ptme");

register("chat", (playername) => {
    ChatLib.command(`p settings allinvite`);
}).setCriteria("Party > ${*} ${playername}: !allinvite");

register("chat", (playername) => {
    ChatLib.command(`p settings allinvite`);
}).setCriteria("Party > ${*} ${playername}: !allinv");

register("chat", () => {
    if (settings.enablePartyCommands && settings.enablePartyWarp) {
        ChatLib.command("p warp");
    }
}).setCriteria("Party ${*}: !warp");

register("chat", (mf) => {
    if (!fileData.magmacores) {
        fileData.magmacores = 0
    }
    fileData.magmacores += 1;
    ChatLib.command(`pc core #${fileData.magmacores}! [+${mf}% ✯]`);
    fileData.save();
}).setCriteria("RARE DROP! Magma Core (+${mf}% ✯ Magic Find)");

register("command", () => {
    fileData.magmacores = 0;
    fileData.save();
}).setName("mixresetcores");

