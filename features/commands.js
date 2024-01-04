import settings from "../settings";
import { BOLD, DARK_BLUE, DARK_RED, GOLD, WHITE } from "../utils/constants";
import { playerData } from "../utils/data";
import { formatMilliseconds } from "../utils/functions";

function printCounterMessage(name, color, counter, time) {

    const counterMessage = `${GOLD + BOLD}Last ${color + BOLD}${name}${GOLD + BOLD}: ${counter} (${formatMilliseconds(Date.now() - time)} ago)`;
    ChatLib.chat(counterMessage);
}

register("command", (arg, event) => {
    switch (arg) {
        case 'last':
            ChatLib.chat(`${GOLD + BOLD}==================`);
            printCounterMessage("Jawbus", DARK_RED, playerData.COUNTER.lord_jawbus, playerData.TIME.lord_jawbus);
            printCounterMessage("Thunder", DARK_BLUE, playerData.COUNTER.thunder, playerData.TIME.thunder);
            printCounterMessage("Carrot King", WHITE, playerData.COUNTER.carrot_king, playerData.TIME.carrot_king);
            printCounterMessage("Sea Emperor", DARK_RED, playerData.COUNTER.sea_emperor, playerData.TIME.sea_emperor);
            ChatLib.chat(`${GOLD + BOLD}==================`);
            break;
        default:
            ChatLib.chat(`${arg} argument not supported. Valid are "last", and more to come.`)
            break;
    }
}).setName("mixshow", true);

register("command", (arg, event) => {
    ChatLib.chat(settings.guiCatchRateMode);
}).setName("mixtest", true);