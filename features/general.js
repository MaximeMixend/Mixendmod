import settings from "../settings";
import { BOLD, DARK_GREEN, BLUE, DARK_RED, GOLD, DETECTED_SOUND } from "../utils/constants";
import { fileData } from "../utils/data";

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
    else if (parseInt(level) > 96 && parseInt(level) < 100) {
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
    setTimeout(() => {
        Client.showTitle(`${BLUE + BOLD}THUNDER BOTTLE FULL`, "", 0, 100, 10);
    }, 1000);
}).setCriteria("> Your bottle of thunder has fully charged!");

// -----------------------------------
// Vanquisher
// -----------------------------------
register("chat", () => {
    if (settings.sendVanquisherPing && settings.vanquisherSettings) {
        let x = Math.round(Player.getX());
        let y = Math.round(Player.getY());
        let z = Math.round(Player.getZ());
        coord = `x: ${x}, y: ${y}, z: ${z}`
        ChatLib.command(`pc ${coord} (✿◠‿◠) VANQUISHER SPAWNED`);
    }
}).setCriteria("A Vanquisher is spawning nearby!");

// -----------------------------------
// Party command
// -----------------------------------
register("chat", () => {
    if (settings.enablePartyCommands) {
        ChatLib.command(`pc [Commands] !pt <playername> | !warp`);
    }
}).setCriteria("Party ${*}: !help");

register("chat", (player) => {
    if (settings.enablePartyCommands && settings.enablePartyTransfer) {
        ChatLib.command(`p transfer ${player}`);
    }
}).setCriteria("Party ${*}: !pt ${player}");

register("chat", (playername) => {
    ChatLib.command(`p transfer ${playername}`);
}).setCriteria("Party > ${*} ${playername}: !pt");

register("chat", (playername) => {
    ChatLib.command(`p transfer ${playername}`);
}).setCriteria("Party > ${*} ${playername}: !ptme");

register("chat", () => {
    if (settings.enablePartyCommands && settings.enablePartyWarp) {
        ChatLib.command("p warp");
    }
}).setCriteria("Party ${*}: !warp");

register("chat", (mf) => {
    if (!fileData.magmacores) {
        fileData.magmacores = 0
    }
    fileData.magmacores += 1;
    ChatLib.command(`pc core #${fileData.magmacores}! [+${mf}% ✯]`);
    fileData.save();
}).setCriteria("RARE DROP! Magma Core (+${mf}% ✯ Magic Find)");

register("chat", (mf) => {
    fileData.save();
}).setCriteria("RARE DROP! Eternal Flame Ring (+${mf}% ✯ Magic Find)");

register("command", () => {
    fileData.magmacores = 0;
    fileData.save();
}).setName("mixresetcores");

