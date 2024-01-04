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
