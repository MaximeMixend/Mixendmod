import settings from "../settings";
import { RED, DARK_BLUE, DARK_GRAY, DARK_PURPLE, DARK_RED, GOLD, LIGHT_PURPLE, AQUA, GREEN, GRAY } from "./constants";

/**
 * Return relevant data about the drop
 * @param {String} itemName 
 */
export function dropData(itemName) {
    switch (itemName) {
        case "Radioactive Vial": return {
            color: LIGHT_PURPLE,
            dropPing: settings.sendRadioactiveVialPing,
            spam: true,
            average: true,
            mob: "lord_jawbus"
        }
        case "Lucky Clover Core": return {
            color: DARK_PURPLE,
            dropPing: settings.sendLuckyCloverCorePing,
            spam: false,
            average: true,
            mob: "carrot_king"
        }
        case "Deep Sea Orb": return {
            color: DARK_PURPLE,
            dropPing: settings.sendDeepSeaOrbPing,
            spam: false,
            average: false,
            mob: "grim_reaper"
        }
        case "Daedalus Stick": return {
            color: GOLD,
            dropPing: settings.sendDaedalusStickPing,
            spam: false,
            average: false,
            mob: "minotaur"
        }
        case "Test Item 123": return {
            color: GREEN,
            dropPing: settings.sendRadioactiveVialPing,
            spam: false,
            average: false,
            mob: "a"
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
            trackAverage: true
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
            name: "Water Hydra",
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
        case "reindrake": return {
            color: DARK_PURPLE,
            name: "Reindrake",
            partyPing: settings.reindrakePartyPing,
            partyMessage: settings.reindrakeMessage,
            trackedLoot: undefined,
            trackAverage: false
        }
        case "great_white_shark": return {
            color: GRAY,
            name: "Great White Shark",
            partyPing: settings.greatWhiteSharkPartyPing,
            partyMessage: settings.greatWhiteSharkMessage,
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

export const seaCreatureData = {
    "squid": {
        name: "Squid",
        experience: 41,
        weight: 1200
    },
    "sea_walker": {
        name: "Sea Walker",
        experience: 68,
        weight: 800
    },
    "night_squid": {
        name: "Night Squid",
        experience: 270,
        weight: 1100
    },
    "sea_guardian": {
        name: "Sea Guardian",
        experience: 101,
        weight: 600
    },
    "sea_witch": {
        name: "Sea Witch",
        experience: 338,
        weight: 700
    },
    "sea_archer": {
        name: "Sea Archer",
        experience: 169,
        weight: 550
    },
    "rider_of_the_deep": {
        name: "Rider of the Deep",
        experience: 338,
        weight: 400
    },
    "catfish": {
        name: "Catfish",
        experience: 405,
        weight: 250
    },
    "carrot_king": {
        name: "Carrot King",
        experience: 810,
        weight: 300
    },
    "sea_leech": {
        name: "Sea Leech",
        experience: 675,
        weight: 160
    },
    "guardian_defender": {
        name: "Guardian Defender",
        experience: 10113,
        weight: 130
    },
    "deep_sea_protector": {
        name: "Deep Sea Protector",
        experience: 1350,
        weight: 88
    },
    "water_hydra": {
        name: "Water Hydra",
        experience: 2025,
        weight: 18
    },
    "sea_emperor": {
        name: "Sea Emperor",
        experience: 3375,
        weight: 10
    },
    "agarimoo": {
        name: "Agarimoo",
        experience: 80,
        weight: 950
    },
    "scarecrow": {
        name: "Scarecrow",
        experience: 420,
        weight: 1000
    },
    "nightmare": {
        name: "Nightmare",
        experience: 820,
        weight: 550
    },
    "werewolf": {
        name: "Werewolf",
        experience: 1235,
        weight: 250
    },
    "phantom_fisherman": {
        name: "Phantom Fisherman",
        experience: 2525,
        weight: 90
    },
    "grim_reaper": {
        name: "Grim Reaper",
        experience: 3950,
        weight: 25
    },
    "nurse_shark": {
        name: "Nurse Shark",
        experience: 405,
        weight: 1100
    },
    "blue_shark": {
        name: "Blue Shark",
        experience: 810,
        weight: 550
    },
    "tiger_shark": {
        name: "Tiger Shark",
        experience: 1013,
        weight: 300
    },
    "great_white_shark": {
        name: "Great White Shark",
        experience: 2025,
        weight: 150
    },
    "frozen_steve": {
        name: "Frozen Steve",
        experience: 101,
        weight: 1100
    },
    "frosty": {
        name: "Frosty",
        experience: 203,
        weight: 800
    },
    "grinch": {
        name: "Grinch",
        experience: 405,
        weight: 50
    },
    "yeti": {
        name: "Yeti",
        experience: 4050,
        weight: 30
    },
    "nutcracker": {
        name: "Nutcracker",
        experience: 950,
        weight: 60
    },
    "reindrake": {
        name: "Reindrake",
        experience: 0,
        weight: 6
    },
    "plhlegblast": {
        name: "Plhlegblast",
        experience: 5000,
        weight: 0
    },
    "magma_slug": {
        name: "Magma Slug",
        experience: 730,
        weight: 1600
    },
    "moogma": {
        name: "Moogma",
        experience: 950,
        weight: 1200
    },
    "lava_leech": {
        name: "Lava Leech",
        experience: 1400,
        weight: 600
    },
    "pyroclastic_worm": {
        name: "Pyroclastic Worm",
        experience: 1100,
        weight: 400
    },
    "lava_flame": {
        name: "Lava Flame",
        experience: 2100,
        weight: 360
    },
    "fire_eel": {
        name: "Fire Eel",
        experience: 2200,
        weight: 280
    },
    "taurus": {
        name: "Taurus",
        experience: 4300,
        weight: 160
    },
    "thunder": {
        name: "Thunder",
        experience: 12000,
        weight: 40
    },
    "lord_jawbus": {
        name: "Lord Jawbus",
        experience: 40000,
        weight: 8
    },
    "water_worm": {
        name: "Water Worm",
        experience: 240,
        weight: 300
    },
    "poison_worm": {
        name: "Poison Worm",
        experience: 270,
        weight: 300
    },
    "abyssal_miner": {
        name: "Abyssal Miner",
        experience: 770,
        weight: 90
    },
    "flaming_worm": {
        name: "Flaming Worm",
        experience: 240,
        weight: 180
    },
    "lava_blaze": {
        name: "Lava Blaze",
        experience: 548,
        weight: 36
    },
    "lava_pigman": {
        name: "Lava Pigman",
        experience: 548,
        weight: 36
    }
}

export const legendaryExp = [0, 660,
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