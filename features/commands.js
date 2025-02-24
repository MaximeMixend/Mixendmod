import settings from "../settings";
import { datav2 } from "../utils/data";
import { sendCommand } from "../utils/functions";

//#region Party commands
register("chat", (player, message) => {
    // Handle rank
    if (player.includes("]")) {
        player = player.split('] ')[1];
    }
    if (message == settings.partyCode) {
        sendCommand(`p ${player}`);
    }
}).setCriteria("From ${player}: ${message}");

register("chat", () => {
    if (settings.enablePartyCommands) {
        sendCommand(`pc [Commands] !pt <playername> | !warp`);
    }
}).setCriteria("Party ${*}: !help");

register("chat", () => {
    let count = datav2["rareDrops"]["Radioactive Vial"].since;
    sendCommand(`pc Last Vial ${count} Jawbus ago`);
}).setCriteria("Party ${*}: !vi");

register("chat", () => {
    let count = datav2["seaCreaturesGlobal"]["lord_jawbus"].since;
    sendCommand(`pc Last Jawbus ${count} sc ago [${datav2.average["lord_jawbus"].value} AVG]`);
}).setCriteria("Party ${*}: !ji");

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


register("chat", () => {
    if (settings.enablePartyCommands) {
        let x = Math.round(Player.getX());
        let y = Math.round(Player.getY());
        let z = Math.round(Player.getZ());
        let coords = `x: ${x}, y: ${y}, z: ${z} `
        sendCommand(`pc ${coords}`);
    }
}).setCriteria("Party ${*}: !coords");

//#endregion Party commands

// Quick fix for screen alert when changing lobby not working.
register("chat", () => {
    Client.showTitle(`aaaaaaaa`, "", 1, 1, 1);
}).setCriteria("Sending to server ${*}");