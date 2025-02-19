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

export let dianaData = new PogObject("MixendMod", {
    "minos_inquisitor": {
        count: 0,
        time: Date.now(),
        since: 0
    }
}, "data/diana.json")

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
