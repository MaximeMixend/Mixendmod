import { DARK_BLUE, DARK_PURPLE, DARK_RED, LIGHT_PURPLE } from "./constants";

export const dropData = {
    "Radioactive Vial": {
        color: LIGHT_PURPLE
    },
    "Lucky Clover Core": {
        color: DARK_PURPLE
    }
}

export const seaCreatureData = {
    "lord_jawbus": {
        color: DARK_RED,
        sendCoords: true,
        tracked_loot: "Radioactive Vial",
        track_avg: true
    },
    "thunder": {
        color: DARK_BLUE,
        sendCoords: false,
        tracked_loot: undefined,
        track_avg: true
    },
    "plhlegblast": {
        color: DARK_PURPLE,
        sendCoords: true,
        tracked_loot: undefined,
        track_avg: false
    },
    "carrot_king": {
        color: DARK_PURPLE,
        sendCoords: false,
        tracked_loot: "Lucky Clover Core",
        track_avg: false
    },
    "sea_emperor": {
        color: DARK_RED,
        sendCoords: false,
        tracked_loot: undefined,
        track_avg: false
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
    "Sea Emperor arises from the depths.": "sea_emperor",
    "Your Chumcap Bucket trembles, it's an Agarimoo.": "agarimoo"
};

export const spookyCatch = {
    "Phew! It's only a Scarecrow.": "scarecrow",
    "You hear trotting from beneath the waves, you caught a Nightmare.": "nightmare",
    "It must be a full moon, a Werewolf appears.": "werewolf",
    "The spirit of a long lost Phantom Fisherman has come to haunt you.": "phantom_fisherman",
    "This can't be! The manifestation of death himself!": "grim_reaper"
}

export const doubleHookCatch = /^(It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!|Double Hook\!)$/;
