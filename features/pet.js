import settings from "../settings";
import { BOLD, DARK_GREEN, GOLD, GRAY, RED } from "../utils/constants";

export let activePet = {
    level: "Lvl 0", name: "undefined", color: GRAY
};

const legendaryExp = [0, 660,
    1390,
    2190,
    3070,
    4030,
    5080,
    6230,
    7490,
    8870,
    10380,
    12030,
    13830,
    15790,
    17920,
    20230,
    22730,
    25430,
    28350,
    31510,
    34930,
    38630,
    42630,
    46980,
    51730,
    56930,
    62630,
    68930,
    75930,
    83730,
    92430,
    102130,
    112930,
    124930,
    138230,
    152930,
    169130,
    186930,
    206430,
    227730,
    250930,
    276130,
    303530,
    333330,
    365730,
    400930,
    439130,
    480530,
    525330,
    573730,
    625930,
    682130,
    742530,
    807330,
    876730,
    950930,
    1030130,
    1114830,
    1205530,
    1302730,
    1406930,
    1518630,
    1638330,
    1766530,
    1903730,
    2050430,
    2207130,
    2374830,
    2554530,
    2747230,
    2953930,
    3175630,
    3413330,
    3668030,
    3940730,
    4232430,
    4544130,
    4877830,
    5235530,
    5619230,
    6030930,
    6472630,
    6949330,
    7466030,
    8027730,
    8639430,
    9306130,
    10032830,
    10824530,
    11686230,
    12622930,
    13639630,
    14741330,
    15933030,
    17219730,
    18606430,
    20103130,
    21719830,
    23466530,
    25353230]

// ====================================================
// Pet level up
// ====================================================
//#region Level up
register("chat", (pet, level, event) => {
    if (!settings.petLevelWarning) { return; }

    let color = GOLD;
    if (level == "100") {
        color = DARK_GREEN;
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 140, 10);
    }
    else if (parseInt(level) > 94 && parseInt(level) < 100) {
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 120, 10);
    }
    else {

    }
    if (!settings.petPercentageProgress) { return; }
    if (ChatLib.getChatMessage(event, true).split(pet)[0].substr(-2) == "&6" && parseInt(level) <= 100) {
        let percentage = 100 * legendaryExp[parseInt(level - 1)] / legendaryExp[99]
        cancel(event);
        ChatLib.chat(ChatLib.getChatMessage(event, true) + ` ${GOLD}[${percentage.toFixed(2)}%]`);
    }
}).setCriteria("Your ${pet} leveled up to level ${level}!");
//#endregion Level up

// ====================================================
// Active pet
// ====================================================
//#region Active pet
const regex = /Lvl (\d+)](?: \[(\d+).)?/;
register("chat", (level, pet, event) => {

    if (settings.petAutopetHide) {
        cancel(event);
    }

    let match = level.match(regex);
    if (match) {
        activePet.level = `${match[1]}+${match[2]}`;
    }
    else {
        activePet.level = level;
    }
    let msg = ChatLib.getChatMessage(event, true);
    let basePet = pet.includes("✦") ? pet.slice(0, -2) : pet;

    activePet.color = msg.split(basePet)[0].substr(-2);

    if (pet.includes("✦")) {
        activePet.name = basePet + msg.split(basePet)[1].split("✦")[0] + "✦";
    } else {
        activePet.name = pet;
    }
}).setCriteria("Autopet equipped your [${level}] ${pet}!${*}");

register("chat", (pet, event) => {
    if (settings.petSummonHide)
        cancel(event);
    let msg = ChatLib.getChatMessage(event, true);
    let basePet = pet.includes("✦") ? pet.slice(0, -2) : pet;

    activePet.color = msg.split(basePet)[0].substr(-2);

    if (pet.includes("✦")) {
        activePet.name = basePet + msg.split(basePet)[1].split("✦")[0] + "✦";
    } else {
        activePet.name = pet;
    }
    activePet.level = "?";
}).setCriteria("You summoned your ${pet}!");
//#endregion Active pet