import settings from "../settings";
import { sendCommand } from "../utils/functions";

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
