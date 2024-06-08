import settings from "../settings";
import { RED, DARK_BLUE, DARK_GRAY, DARK_PURPLE, DARK_RED, GOLD, LIGHT_PURPLE, AQUA } from "./constants";

/**
 * Return relevant data about the drop
 * @param {String} itemName 
 */
export function dropData(itemName) {
    switch (itemName) {
        case "Radioactive Vial": return {
            color: LIGHT_PURPLE,
            dropPing: settings.sendRadioactiveVialPing,
            spam: true
        }
        case "Lucky Clover Core": return {
            color: DARK_PURPLE,
            dropPing: settings.sendLuckyCloverCorePing,
            spam: false
        }
        case "Deep Sea Orb": return {
            color: DARK_PURPLE,
            dropPing: settings.sendDeepSeaOrbPing,
            spam: false
        }
        case "Daedalus Stick": return {
            color: GOLD,
            dropPing: settings.sendDaedalusStickPing,
            spam: false
        }
        default:
            return false;
    }
}

/**
 * Settings when catching a mob
 * @param {String} mobName 
 */
export function catchMobData(mobName) {
    switch (mobName) {
        case "lord_jawbus": return {
            color: DARK_RED, // For the custom chat message
            name: "Lord Jawbus",
            partyPing: settings.jawbusPartyPing,
            partyMessage: settings.jawbusMessage,
            trackedLoot: itemDrop.radioactiveVial,
            trackAverage: true
        }
        case "thunder": return {
            color: DARK_BLUE,
            name: "Thunder",
            partyPing: settings.thunderPartyPing,
            partyMessage: settings.thunderMessage,
            trackedLoot: undefined,
            trackAverage: true
        }
        case "plhlegblast": return {
            color: DARK_GRAY,
            name: "Plhlegblast",
            partyPing: settings.plhlegblastPartyPing,
            partyMessage: settings.plhlegblastMessage,
            trackedLoot: undefined,
            trackAverage: false
        }
        case "grim_reaper": return {
            color: DARK_PURPLE,
            name: "Grim Reaper",
            partyPing: settings.grimReaperPartyPing,
            partyMessage: settings.grimReaperMessage,
            trackedLoot: itemDrop.deepSeaOrb,
            trackAverage: false
        }
        case "phantom_fisherman": return {
            color: DARK_PURPLE,
            name: "Phantom Fisherman",
            partyPing: settings.phantomFishermanPartyPing,
            partyMessage: settings.phantomFishermanMessage,
            trackedLoot: itemDrop.deepSeaOrb,
            trackAverage: false
        }
        case "carrot_king": return {
            color: GOLD,
            name: "Carrot King",
            partyPing: settings.carrotKingPartyPing,
            partyMessage: settings.carrotKingMessage,
            trackedLoot: itemDrop.luckyCloverCore,
            trackAverage: false
        }
        case "sea_emperor": return {
            color: RED,
            name: "Sea Emperor",
            partyPing: settings.seaEmperorPartyPing,
            partyMessage: settings.seaEmperorMessage,
            trackedLoot: undefined,
            trackAverage: false
        }
        case "water_hydra": return {
            color: RED,
            name: "Sea Emperor",
            partyPing: settings.waterHydraPartyPing,
            partyMessage: settings.waterHydraMessage,
            trackedLoot: undefined,
            trackAverage: false
        }
        case "yeti": return {
            color: AQUA,
            name: "Yeti",
            partyPing: settings.yetiPartyPing,
            partyMessage: settings.yetiMessage,
            trackedLoot: undefined,
            trackAverage: false
        }
        default:
            return false;
    }
}

export const crimsonIsleCatch = {
    "WOAH! A Plhlegblast appeared.": "plhlegblast",
    "From beneath the lava appears a Magma Slug.": "magma_slug",
    "You hear a faint Moo from the lava... A Moogma appears.": "moogma",
    "A small but fearsome Lava Leech emerges.": "lava_leech",
    "You feel the heat radiating as a Pyroclastic Worm surfaces.": "pyroclastic_worm",
    "A Lava Flame flies out from beneath the lava.": "lava_flame",
    "A Fire Eel slithers out from the depths.": "fire_eel",
    "Taurus and his steed emerge.": "taurus",
    "You hear a massive rumble as Thunder emerges.": "thunder",
    "You have angered a legendary creature... Lord Jawbus has arrived.": "lord_jawbus"
};

export const crystalHollowCatch = {
    "A Water Worm surfaces!": "water_worm",
    "A Poisoned Water Worm surfaces!": "poison_worm",
    "An Abyssal Miner breaks out of the water!": "abyssal_miner",
    "A Flaming Worm surfaces from the depths!": "flaming_worm",
    "A Lava Blaze has surfaced from the depths!": "lava_blaze",
    "A Lava Pigman arose from the depths!": "lava_pigman"
}

export const waterCatch = {
    "A Squid appeared.": "squid",
    "You caught a Sea Walker.": "sea_walker",
    "Pitch darkness reveals a Night Squid.": "night_squid",
    "You stumbled upon a Sea Guardian.": "sea_guardian",
    "It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!": "sea_witch",
    "You reeled in a Sea Archer.": "sea_archer",
    "The Rider of the Deep has emerged.": "rider_of_the_deep",
    "Huh? A Catfish!": "catfish",
    "Is this even a fish? It's the Carrot King!": "carrot_king",
    "Gross! A Sea Leech!": "sea_leech",
    "You've discovered a Guardian Defender of the sea.": "guardian_defender",
    "You have awoken the Deep Sea Protector, prepare for a battle!": "deep_sea_protector",
    "The Water Hydra has come to test your strength.": "water_hydra",
    "The Sea Emperor arises from the depths.": "sea_emperor",
    "Your Chumcap Bucket trembles, it's an Agarimoo.": "agarimoo",
};

export const spookyCatch = {
    "Phew! It's only a Scarecrow.": "scarecrow",
    "You hear trotting from beneath the waves, you caught a Nightmare.": "nightmare",
    "It must be a full moon, a Werewolf appears.": "werewolf",
    "The spirit of a long lost Phantom Fisher has come to haunt you.": "phantom_fisherman",
    "This can't be! The manifestation of death himself!": "grim_reaper"
};

export const festivalCatch = {
    "A tiny fin emerges from the water, you've caught a Nurse Shark.": "nurse_shark",
    "You spot a fin as blue as the water it came from, it's a Blue Shark.": "blue_shark",
    "A striped beast bounds from the depths, the wild Tiger Shark!": "tiger_shark",
    "Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!": "great_white_shark"
};

export const jerryWorkshopCatch = {
    "Frozen Steve fell into the pond long ago, never to resurface...until now!": "frozen_steve",
    "It's a snowman! He looks harmless.": "frosty",
    "The Grinch stole Jerry's Gifts...get them back!": "grinch",
    "What is this creature!?": "yeti",
    "You found a forgotten Nutcracker laying beneath the ice.": "nutcracker",
    "A Reindrake forms from the depths.": "reindrake"
};

export const doubleHookCatch = /^(It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!|Double Hook\!)$/;

export const waterSeaCreature = [
    "squid",
    "sea_walker",
    "night_squid",
    "sea_guardian",
    "sea_witch",
    "sea_archer",
    "rider_of_the_deep",
    "catfish",
    "carrot_king",
    "sea_leech",
    "guardian_defender",
    "deep_sea_protector",
    "water_hydra",
    "sea_emperor",
    "agarimoo",
    "scarecrow",
    "nightmare",
    "werewolf",
    "phantom_fisherman",
    "grim_reaper",
    "nurse_shark",
    "blue_shark",
    "tiger_shark",
    "great_white_shark",
    "frozen_steve",
    "frosty",
    "grinch",
    "yeti",
    "nutcracker",
    "reindrake",
    "water_worm",
    "poison_worm",
    "abyssal_miner"
];

export const lavaSeaCreature = [
    "plhlegblast",
    "magma_slug",
    "moogma",
    "lava_leech",
    "pyroclastic_worm",
    "lava_flame",
    "fire_eel",
    "taurus",
    "thunder",
    "lord_jawbus",
    "flaming_worm",
    "lava_blaze",
    "lava_pigman"
];

export const seaCreatureConst = {
    "squid": "Squid",
    "sea_walker": "Sea Walker",
    "night_squid": "Night Squid",
    "sea_guardian": "Sea Guardian",
    "sea_witch": "Sea Witch",
    "sea_archer": "Sea Archer",
    "rider_of_the_deep": "Rider of the Deep",
    "catfish": "Catfish",
    "carrot_king": "Carrot King",
    "sea_leech": "Sea Leech",
    "guardian_defender": "Guardian Defender",
    "deep_sea_protector": "Deep Sea Protector",
    "water_hydra": "Water Hydra",
    "sea_emperor": "Sea Emperor",
    "agarimoo": "Agarimoo",
    "scarecrow": "Scarecrow",
    "nightmare": "Nightmare",
    "werewolf": "Werewolf",
    "phantom_fisherman": "Phantom Fisherman",
    "grim_reaper": "Grim Reaper",
    "nurse_shark": "Nurse Shark",
    "blue_shark": "Blue Shark",
    "tiger_shark": "Tiger Shark",
    "great_white_shark": "Great White Shark",
    "frozen_steve": "Frozen Steve",
    "frosty": "Frosty",
    "grinch": "Grinch",
    "yeti": "Yeti",
    "nutcracker": "Nutcracker",
    "reindrake": "Reindrake",
    "plhlegblast": "Plhlegblast",
    "magma_slug": "Magma Slug",
    "moogma": "Moogma",
    "lava_leech": "Lava Leech",
    "pyroclastic_worm": "Pyroclastic Worm",
    "lava_flame": "Lava Flame",
    "fire_eel": "Fire Eel",
    "taurus": "Taurus",
    "thunder": "Thunder",
    "lord_jawbus": "Lord Jawbus",
    "water_worm": "Water Worm",
    "poison_worm": "Poison Worm",
    "abyssal_miner": "Abyssal Miner",
    "flaming_worm": "Flaming Worm",
    "lava_blaze": "Lava Blaze",
    "lava_pigman": "Lava Pigman"
};

export const itemDrop = {
    luckyCloverCore: "Lucky Clover Core",
    radioactiveVial: "Radioactive Vial",
    deepSeaOrb: "Deep Sea Orb",
    daedalusStick: "Daedalus Stick"
}