import settings from "../settings";
import { BOLD, DARK_GREEN, BLUE, DARK_RED } from "../utils/constants";

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