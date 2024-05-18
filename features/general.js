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


const magicFindRegex = /Magic Find (I|II|III|IV|V|VI|VII|VIII|IX|X)/
const blazingfortuneRegex = /Blazing Fortune (I|II|III|IV|V|VI|VII|VIII|IX|X)/
const fishingExperienceRegex = /Fishing Experience (I|II|III|IV|V|VI|VII|VIII|IX|X)/
const ImportantDropsRender = {
    "Enchanted Book": [0, 0],
    "Slug Boots": [15, 5000],
    "Moogma Leggings": [20, 10000],
    "Flaming Chestplate": [25, 25000],
    "Taurus Helmet": [30, 50000],
    "Staff of the Volcano": [10, 5000],
    "Blade of the Volcano": [10, 5000],
    "Pitchin' Koi": [0, 22222],
    "Thunderbolt Necklace": [0, 0],
    "Thunder Helmet": [0, 0],
    "Thunder Chestplate": [0, 0],
    "Thunder Leggings": [0, 0],
    "Thunder Boots": [0, 0],
    "Magma Lord Helmet": [0, 0],
    "Magma Lord Chestplate": [0, 0],
    "Magma Lord Leggings": [0, 0],
    "Magma Lord Boots": [0, 0]
};
register('renderslot', (slot, gui, event) => {
    if (true) {
        // Get inventory item
        if (slot == null) return;

        item = slot.getItem()
        if (item == null) return;

        piece = false
        Object.keys(ImportantDropsRender).forEach(drop => {
            if (item.getName().includes(drop)) {
                piece = true
            }
        })

        if (!piece) return;

        lore = item.getLore().reduce((all, now) => all + `\n${now}`, ``);
        magicFindRegex.lastIndex = 0;
        blazingfortuneRegex.lastIndex = 0;

        if (magicFindRegex.test(lore)) {
            Renderer.scale(0.5, 0.5);
            Renderer.translate(slot.getDisplayX(), slot.getDisplayY(), 300.0);
            Renderer.drawStringWithShadow("&7&lMF", slot.getDisplayX(), slot.getDisplayY());
        }
        if (blazingfortuneRegex.test(lore)) {
            Renderer.scale(0.5, 0.5);
            Renderer.translate(slot.getDisplayX() + 10, slot.getDisplayY(), 300.0);
            Renderer.drawStringWithShadow("&7&lBF", slot.getDisplayX() + 10, slot.getDisplayY());
        }
        if (fishingExperienceRegex.test(lore)) {
            Renderer.scale(0.5, 0.5);
            Renderer.translate(slot.getDisplayX(), slot.getDisplayY() + 10, 300.0);
            Renderer.drawStringWithShadow("&7&lFE", slot.getDisplayX(), slot.getDisplayY() + 10);
        }
    }
})