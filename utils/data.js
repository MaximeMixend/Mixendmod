import PogObject from "../../PogData";
import { itemDrop, seaCreatureConst } from "./gameData";

export let fileData = new PogObject("MixendMod", {
    "doubleHook": false,
    "baseX": 10,
    "baseY": 10,
    "sessionGuiX": 10,
    "sessionGuiY": 75,
    "miniGuiX": 10,
    "miniGuiY": 175,
    "miniBossHistory": ["bladesoul"]
}, "data/variables.json");

export let catchHistory = new PogObject("MixendMod", {
    "history": []
}, "data/catchHistory.json");

export let playerData = new PogObject("MixendMod", {
    "DIANA": {
        "minos_hunter": 0,
        "siamese_lynx": 0,
        "minotaur": 0,
        "gaia_construct": 0,
        "minos_champion": 0,
        "minos_inquisitor": 0,
        "griffin_feather": 0,
        "coins": 0
    },
    "Radioactive Vial": {
        "time_drop": 0,
        "current_count": 0,
        "count_to_drop": [],
        "magic_find": []
    },
    "Lucky Clover Core": {
        "time_drop": 0,
        "current_count": 0,
        "count_to_drop": [],
        "magic_find": []
    },
    "Daedalus Stick": {
        "time_drop": 0,
        "current_count": 0,
        "count_to_drop": [],
        "magic_find": []
    },
    "Deep Sea Orb": {
        "time_drop": 0,
        "current_count": 0,
        "count_to_drop": [],
        "magic_find": []
    },
    "COUNTER": {
        "lord_jawbus": 0,
        "plhlegblast": 0,
        "thunder": 0,
        "carrot_king": 0,
        "sea_emperor": 0,
        "minos_inquisitor": 13
    },
    "TIME": {
        "lord_jawbus": 0,
        "plhlegblast": 0,
        "thunder": 0,
        "carrot_king": 0,
        "sea_emperor": 0,
        "minos_inquisitor": 0
    },
    "AVG_DATA": {
        "lord_jawbus": [],
        "thunder": [],
        "lord_jawbus_avg": 0,
        "thunder_avg": 0
    },
    "CURRENT_TRACK": {
        "plhlegblast": 0,
        "magma_slug": 0,
        "moogma": 0,
        "lava_leech": 0,
        "pyroclastic_worm": 0,
        "lava_flame": 0,
        "fire_eel": 0,
        "taurus": 0,
        "thunder": 0,
        "lord_jawbus": 0
    }, "TOTAL": 0,
    "TOTAL_WATER": 0
}, "data/data.json")

export let currentSession = new PogObject("MixendMod", {
    "CURRENT_TRACK": {
        "magma_slug": 0,
        "moogma": 0,
        "lava_leech": 0,
        "pyroclastic_worm": 0,
        "lava_flame": 0,
        "fire_eel": 0,
        "taurus": 0,
        "thunder": 0,
        "lord_jawbus": 0
    },
    "CURRENT_TRACK_TIMER": {
        "magma_slug": 0,
        "moogma": 0,
        "lava_leech": 0,
        "pyroclastic_worm": 0,
        "lava_flame": 0,
        "fire_eel": 0,
        "taurus": 0,
        "thunder": 0,
        "lord_jawbus": 0
    },
    "CURRENT_WATER_SC": {
        "squid": 0,
        "sea_walker": 0,
        "night_squid": 0,
        "sea_guardian": 0,
        "sea_witch": 0,
        "sea_archer": 0,
        "rider_of_the_deep": 0,
        "catfish": 0,
        "carrot_king": 0,
        "sea_leech": 0,
        "guardian_defender": 0,
        "deep_sea_protector": 0,
        "water_hydra": 0,
        "sea_emperor": 0,
        "agarimoo": 0
    },
    "TIME_WATER_SC": {
        "squid": 0,
        "sea_walker": 0,
        "night_squid": 0,
        "sea_guardian": 0,
        "sea_witch": 0,
        "sea_archer": 0,
        "rider_of_the_deep": 0,
        "catfish": 0,
        "carrot_king": 0,
        "sea_leech": 0,
        "guardian_defender": 0,
        "deep_sea_protector": 0,
        "water_hydra": 0,
        "sea_emperor": 0,
        "agarimoo": 0
    },
    "TOTAL_WATER": 0,
    "TOTAL": 0
}, "data/current_session.json");

let seaCreatures = {};
Object.keys(seaCreatureConst).forEach(name => {
    seaCreatures[name] = {
        count: 0,
        time: 0,
        since: 0,
        session: {
            count: 0,
            time: 0,
            since: 0
        }
    };
});

let rareDrops = {};
Object.values(itemDrop).forEach(name => {
    rareDrops[name] = {
        since: 0,
        time: 0,
        archive: [] //Contains RARE DROP! blabla (+100mf) [${since} in ${time}]
    };
});

let average = {};
Object.keys(seaCreatureConst).forEach(name => {
    average[name] = {
        all: [],
        value: 0,
    }
})

export let datav2 = new PogObject("MixendMod", {
    session: "default",
    "vanquisher": {
        count: 0,
        time: 0,
        since: 0,
        session: {
            count: 0,
            time: 0,
            since: 0
        }
    },
    "seaCreaturesGlobal": seaCreatures,
    "rareDrops": rareDrops,
    "average": average
}, "data/data-v2.json");
datav2.save();

export let archive = new PogObject("MixendMod", {
    sessions: {},
}, "data/archive.json");

archive.save();