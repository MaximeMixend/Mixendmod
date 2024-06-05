import settings from "../settings";
import { RED, BLUE, DARK_BLUE, DARK_GRAY, DARK_PURPLE, DARK_RED, GOLD, LIGHT_PURPLE, itemDrop, AQUA } from "./constants";

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

export const entitiesList = {
    FishHook: Java.type("net.minecraft.entity.projectile.EntityFishHook"),
    Jawbus: Java.type("net.minecraft.entity.monster.EntityIronGolem"),
    Thunder: Java.type("net.minecraft.entity.monster.EntityGuardian"),
    Vanquisher: Java.type("net.minecraft.entity.boss.EntityWither"),
    Plhlegblast: Java.type("net.minecraft.entity.passive.EntitySquid")
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

export const lavaDict = {
    0: { id: "magma_slug", name: "Magma slug" },
    1: { id: "moogma", name: "Moogma cow" },
    2: { id: "lava_leech", name: "Lava leech" },
    3: { id: "pyroclastic_worm", name: "Pyroclastic worm" },
    4: { id: "lava_flame", name: "Lava flame" },
    5: { id: "fire_eel", name: "Fire eel" },
    6: { id: "taurus", name: "Taurus" },
    7: { id: "thunder", name: "Thunder" },
    8: { id: "lord_jawbus", name: "Lord Jawbus" },
}

export const waterDict = {
    0: { id: "squid", name: "Squid" },
    1: { id: "night_squid", name: "Night Squid" },
    2: { id: "sea_walker", name: "Sea Walker" },
    3: { id: "sea_witch", name: "Sea Witch" },
    4: { id: "sea_guardian", name: "Sea Guardian" },
    5: { id: "sea_archer", name: "Sea Archer" },
    6: { id: "rider_of_the_deep", name: "Rider of the Deep" },
    7: { id: "catfish", name: "Catfish" },
    8: { id: "sea_leech", name: "Sea Leech" },
    9: { id: "guardian_defender", name: "Guardian Defender" },
    10: { id: "deep_sea_protector", name: "Deep Sea Protector" },
    11: { id: "agarimoo", name: "Agarimoo" },
    12: { id: "carrot_king", name: "Carrot King" },
    13: { id: "water_hydra", name: "Water Hydra" },
    14: { id: "sea_emperor", name: "Sea Emperor" },
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
    "The Sea Emperor arises from the depths.": "sea_emperor",
    "Your Chumcap Bucket trembles, it's an Agarimoo.": "agarimoo",
    "Phew! It's only a Scarecrow.": "scarecrow",
    "You hear trotting from beneath the waves, you caught a Nightmare.": "nightmare",
    "It must be a full moon, a Werewolf appears.": "werewolf",
    "The spirit of a long lost Phantom Fisher has come to haunt you.": "phantom_fisherman",
    "This can't be! The manifestation of death himself!": "grim_reaper",
    "What is this creature!?": "yeti"
};


export const doubleHookCatch = /^(It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!|Double Hook\!)$/;
