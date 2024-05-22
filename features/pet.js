import { BOLD, DARK_GREEN, GOLD, GRAY } from "../utils/constants";

export let activePet = {
    level: "Lvl 0", name: "undefined", color: GRAY
};

let petTier = {
    '&d': "MYTHIC",
    '&6': "LEGENDARY",
    '&5': "EPIC",
    '&9': "RARE",
    '&a': "UNCOMMON",
    '&f': "COMMON",
}

// ====================================================
// Pet level up
// ====================================================
//#region Level up
register("chat", (pet, level) => {
    let color = GOLD;
    if (level == "100") {
        color = DARK_GREEN;
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 200, 10);
    }
    else if (parseInt(level) > 94 && parseInt(level) < 100) {
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 120, 10);
    }
    else {
        console.log(pet);

    }
}).setCriteria("Your ${pet} leveled up to level ${level}!");
//#endregion Level up

// ====================================================
// Active pet
// ====================================================
//#region Active pet
const regex = /Lvl (\d+)](?: \[(\d+).)?/;
register("chat", (level, pet, event) => {
    let match = level.match(regex);
    if (match) {
        activePet.level = `${match[1]}+${match[2]}`;
    }
    else {
        activePet.level = level;
    }
    activePet.color = ChatLib.getChatMessage(event, true).split(pet)[0].substr(-2);
    activePet.name = pet;
}).setCriteria("Autopet equipped your [${level}] ${pet}!${*}");

register("chat", (pet, event) => {
    activePet.color = ChatLib.getChatMessage(event, true).split(pet)[0].substr(-2);
    activePet.level = "?";
    activePet.name = pet;
}).setCriteria("You summoned your ${pet}!");
//#endregion Active pet