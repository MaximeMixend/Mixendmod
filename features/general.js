import { BOLD, DARK_GREEN, BLUE, DARK_RED, GOLD } from "../utils/constants";

export let activePet = {
    level: "Lvl 0", name: "undefined"
};
// -----------------------------------
// SPIRIT MASK
// -----------------------------------
// TODO: Make a GUI status
register("chat", () => {
    Client.showTitle(`${DARK_RED + BOLD}SPIRIT MASK USED`, "", 10, 120, 10);
    setTimeout(() => {
        Client.showTitle(`${DARK_GREEN + BOLD}SPIRIT MASK BACK`, "", 10, 120, 10);
    }, 30000)
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!");

// -----------------------------------
// PET
// -----------------------------------
// Level up 100
register("chat", (pet, level) => {
    let color = GOLD;
    if (level == "100") {
        color = DARK_GREEN;
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 120, 10);
    }
    else if (parseInt(level) > 96) {
        Client.showTitle(`${color + BOLD + pet.toUpperCase()} LEVEL ${level}`, "", 10, 120, 10);
    }
    else { }
}).setCriteria("Your ${pet} leveled up to level ${level}!");

// Active pet
register("chat", (level, pet, event) => {
    activePet.level = level;
    activePet.name = pet;
}).setCriteria("Autopet equipped your [${level}] ${pet}!${*}");

register("chat", (pet, event) => {
    activePet.level = "?";
    activePet.name = pet;
}).setCriteria("You summoned your ${pet}!");

// -----------------------------------
// THUNDER BOTTLE
// -----------------------------------

register("chat", () => {
    Client.showTitle(`${BLUE + BOLD}THUNDER BOTTLE FULL`, "", 0, 100, 10);
}).setCriteria("> Your bottle of thunder has fully charged!");

// -----------------------------------
// Party command
// -----------------------------------
register("chat", () => {
    setTimeout(() => {
        ChatLib.command(`pc [Commands] !pt <playername> | !warp`);
    }, 250);

}).setCriteria("Party ${*}: !help");

register("chat", (player) => {
    ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party ${*}: !pt ${player}");

register("chat", () => {
    ChatLib.command("p warp");
}).setCriteria("Party ${*}: !warp");