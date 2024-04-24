import { BOLD, GOLD, GREEN, LIGHT_PURPLE, OBFUSCATED } from "../utils/constants";
import settings from "../settings";

// -----------------------------------
// ABILITY
// -----------------------------------
// TODO: Make a GUI status
register("chat", () => {
    if (settings.alertMiningSpeedBoost) {
        Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SPEED BOOST USED ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 120, 10);
    }
}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!");

register("chat", () => {
    if (settings.alertMiningSpeedBoost) {
        Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SPEED BOOST AVAILABLE ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 120, 10);
    }
}).setCriteria("Mining Speed Boost is now available!");

// Scrap message
register("chat", () => {
    ChatLib.command("pc [SCRAP] Got my one");
}).setCriteria("EXCAVATOR! You found a Suspicious Scrap!");

// Mineshaft message
register("chat", () => {
    ChatLib.command("pc [MINESHAFT] Hi");
    setTimeout(() => {
        ChatLib.command(`pc ${mineshaftMessage}`);
    }, 500);
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

// Extra party transfer options
register("chat", (player) => {
        ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: !pt");

register("chat", (player) => {
    ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: !ptme");

register("chat", (player) => {
    ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: .transfer");

register("worldUnload", () => {
    tracked = [];
});