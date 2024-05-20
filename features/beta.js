import { BOLD, DETECTED_SOUND, LIGHT_PURPLE } from "../utils/constants";

//#region Armor attributes 
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
register('renderslot', (slot) => {
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
});
//#endregion Armor attributes

//#region Endstone sword
let endstoneTimer = 0;
register("chat", () => {
    endstoneTimer = 5;
}).setCriteria("You now have ${percent}% Damage Resistance for 5 seconds and +${*}% damage on your next hit within 5 seconds!");

// Updates endstone sword timer
register("step", () => {
    if (endstoneTimer > 0) {
        endstoneTimer -= 1;
    }
}).setFps(1);

register("renderoverlay", () => {
    if (!endstoneTimer) { return; }
    for (let i = 0; i < endstoneTimer; i++) {
        let xPos = (Renderer.screen.getWidth() / 2) - (2.5 - i) * Renderer.screen.getWidth() / 50;
        let yPos = Renderer.screen.getHeight() / 4;
        let width = Renderer.screen.getWidth() / 60;
        let height = Renderer.screen.getWidth() / 60;
        new Rectangle(Renderer.GRAY, xPos, yPos, width, height).setOutline(Renderer.BLACK, 1).draw();
    }

});
//#endregion Endstone sword

register("chat", () => {
    DETECTED_SOUND?.play();
    Client.showTitle(`${BOLD + LIGHT_PURPLE}GO GET EGGS`, "", 5, 60, 25);
}).setCriteria("HOPPITY'S HUNT A Chocolate Breakfast Egg has appeared!");


register("chat", () => {
    setTimeout(() => {
        ChatLib.command("gfs volta 13");
    }, 500);
    setTimeout(() => {
        ChatLib.command("gfs box_of_seeds 11");
    }, 1500);
}).setCriteria("GROSS! While you were offline, Pests spawned in ${*}");
