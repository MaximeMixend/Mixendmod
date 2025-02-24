import settings from "../settings";
import { BOLD, DARK_GREEN, GOLD, GRAY, GREEN, RED } from "../utils/constants";
import { sendChat } from "../utils/functions";
import { legendaryExp } from "../utils/gameData";

export let activePet = {
    level: "Lvl 0", name: "undefined", color: GRAY
};

let petReached100 = false
let timeAlertPet100 = 0;
const TIME_ALERT_CD = 10;

// ====================================================
// Pet level up
// ====================================================
//#region Level up
register("chat", (pet, level, event) => {
    if (!settings.petLevelWarning) { return; }

    if (parseInt(level) == 100) {
        // Make this screal until stopped
        petReached100 = true;
        timeAlertPet100 = TIME_ALERT_CD;
        new Message(
            new TextComponent(`${GOLD}[MIX] ${RED}Pet reached Level 100. ${DARK_GREEN}${BOLD}[Click to remove the alert]`)
                .setClickAction('run_command')
                .setClickValue('/mixpet100 ')
        ).chat();
        Client.showTitle(`${DARK_GREEN + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 5, 50, 5);
    }
    else if (parseInt(level) > 94 && parseInt(level) < 100) {
        Client.showTitle(`${GOLD + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 5, 50, 5);
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

register("command", (...args) => {
    petReached100 = false;
    timeAlertPet100 = 0;
    sendChat(`${GREEN}Removed the pet alert.`);
}).setName("mixpet100");

// // Uncomment for debug
// register("command", (...args) => {
//     petReached100 = true;
//     timeAlertPet100 = TIME_ALERT_CD;
//     Client.showTitle(`${DARK_GREEN + BOLD} LEVEL`, "", 10, 50, 10);
//     new Message(
//         new TextComponent(`${GOLD}[MIX] ${RED}Pet reached Level 100. ${DARK_GREEN}${BOLD}[Click to remove the alert]`)
//             .setClickAction('run_command')
//             .setClickValue('/mixpet100 ')
//     ).chat();
// }).setName("mixtestpet100");

register("step", (event) => {
    if (!petReached100) { return; }

    if (timeAlertPet100 == 0) {
        Client.showTitle(`${DARK_GREEN + BOLD} PET LEVEL 100`, "", 10, 50, 10);
        new Message(
            new TextComponent(`${GOLD}[MIX] ${RED}Pet reached Level 100. ${DARK_GREEN}${BOLD}[Click to remove the alert]`)
                .setClickAction('run_command')
                .setClickValue('/mixpet100 ')
        ).chat();
        timeAlertPet100 = TIME_ALERT_CD;
    }
    else {
        timeAlertPet100 -= 1;
    }
}).setFps(2);

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