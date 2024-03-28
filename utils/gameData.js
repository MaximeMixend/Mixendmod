import settings from "../settings";
import { BLACK, DARK_BLUE, DARK_PURPLE, DARK_RED, GOLD, LIGHT_PURPLE } from "./constants";

/**
 * Return relevant data about the drop
 * @param {String} itemName 
 */
export function dropData(itemName) {
    switch (itemName) {
        case "Radioactive Vial": return {
            color: LIGHT_PURPLE,
            dropPing: settings.sendRadioactiveVialPing
        }
        case "Lucky Clover Core": return {
            color: DARK_PURPLE,
            dropPing: settings.sendLuckyCloverCorePing
        }
        case "Deep Sea Orb": return {
            color: DARK_PURPLE,
            dropPing: settings.sendDeepSeaOrbPing
        }
        case "Daedalus Stick": return {
            color: GOLD,
            dropPing: settings.sendDaedalusStickPing
        }
        default:
            return false;

    }
}


export function detectMobData(mobName) {
    switch (mobName) {
        case "lord_jawbus": return {
            color: DARK_RED,
            name: "Lord Jawbus",
            type: Java.type("net.minecraft.entity.monster.EntityIronGolem")
        }
        case "thunder": return {
            color: DARK_BLUE,
            name: "Thunder",
            type: Java.type("net.minecraft.entity.monster.EntityGuardian")
        }
        case "vanquisher": return {
            color: DARK_PURPLE,
            name: "Vanquisher",
            type: Java.type("net.minecraft.entity.boss.EntityWither")
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
 * Return relevant data about the mob
 * @param {String} mobName 
 */
export function seaCreatureData(mobName) {
    switch (mobName) {
        case "lord_jawbus": return {
            color: DARK_RED,
            sendCoords: true,
            tracked_loot: "Radioactive Vial",
            track_avg: true,
            catchPing: settings.sendJawbusCatch,
        }
        case "thunder": return {
            color: DARK_BLUE,
            sendCoords: false,
            tracked_loot: undefined,
            track_avg: true,
            catchPing: settings.sendThunderCatch
        }
        case "plhlegblast": return {
            color: DARK_PURPLE,
            sendCoords: true,
            tracked_loot: undefined,
            track_avg: false,
            catchPing: settings.sendPlhlegblastCatch
        }
        case "carrot_king": return {
            color: DARK_PURPLE,
            sendCoords: false,
            tracked_loot: "Lucky Clover Core",
            track_avg: false,
            catchPing: settings.sendCarrotKingCatch
        }
        case "sea_emperor": return {
            color: DARK_RED,
            sendCoords: false,
            tracked_loot: undefined,
            track_avg: false,
            catchPing: settings.sendSeaEmperorCatch
        }
        case "grim_reaper": return {
            color: BLACK,
            sendCoords: false,
            tracked_loot: "Deep Sea Orb",
            track_avg: false,
            catchPing: settings.sendGrimReaperCatch
        }
        case "phantom_fisherman": return {
            color: GOLD,
            sendCoords: false,
            tracked_loot: "Deep Sea Orb",
            track_avg: false,
            catchPing: settings.sendPhantomFishermanCatch
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
