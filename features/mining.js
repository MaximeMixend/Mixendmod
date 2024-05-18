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

register("chat", () => {
    Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SHAFT ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 100, 10);
    ChatLib.command(`pc [MINESHAFT] Hi`);
    setTimeout(() => {
        ChatLib.command(`pc ${settings.mineshaftMessage}`);
    }, 1000);
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

register("chat", () => {
    ChatLib.command(`pc [SCRAP] Got my one.`);
}).setCriteria("EXCAVATOR! You found a Suspicious Scrap!");


