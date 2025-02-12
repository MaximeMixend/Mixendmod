import settings from "../settings";
import { BOLD, DARK_GREEN, BLUE, DARK_RED } from "../utils/constants";
import { fileData } from "../utils/data";
import { sendCommand } from "../utils/functions";

// -----------------------------------
// SPIRIT MASK
// -----------------------------------
// TODO: Make a GUI status
register("chat", () => {
    if (settings.spiritMaskFeature) {
        Client.showTitle(`${DARK_RED + BOLD}SPIRIT MASK USED`, "", 10, 120, 10);
        setTimeout(() => {
            Client.showTitle(`${DARK_GREEN + BOLD}SPIRIT MASK BACK`, "", 10, 120, 10);
        }, 30000)
    }
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!");

// -----------------------------------
// THUNDER BOTTLE
// -----------------------------------
register("chat", () => {
    if (settings.thunderBottleFeature) {
        setTimeout(() => {
            Client.showTitle(`${BLUE + BOLD}THUNDER BOTTLE FULL`, "", 0, 100, 10);
        }, 1000);
    }
}).setCriteria("> Your bottle of thunder has fully charged!");

// -----------------------------------
// Party command
// -----------------------------------
register("chat", () => {
    if (settings.enablePartyCommands) {
        sendCommand(`pc [Commands] !pt <playername> | !warp`);
    }
}).setCriteria("Party ${*}: !help");

register("chat", (player) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        sendCommand(`p transfer ${player}`);
    }
}).setCriteria("Party ${*}: !pt ${player}");

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

