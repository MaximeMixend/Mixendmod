import { BOLD, GOLD, GREEN, LIGHT_PURPLE, OBFUSCATED } from "../utils/constants";
import settings from "../settings";
import { sendCommand } from "../utils/functions";

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
    if (settings.mineshaftMessage) {
        sendCommand(`pc ${settings.mineshaftMessage}`);
    }
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

register("chat", () => {
    if (settings.mineshaftScrapMessage) {
        sendCommand(`pc ${settings.mineshaftScrapMessage}`);
    }
}).setCriteria("EXCAVATOR! You found a Suspicious Scrap!");


