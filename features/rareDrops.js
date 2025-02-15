import settings from "../settings";
import { AQUA, BOLD, GOLD, LIGHT_PURPLE, WHITE, YELLOW } from "../utils/constants";
import { datav2 } from "../utils/data";
import { announceDrop, calcAvg, formatKeyAttribute, formatMilliseconds, numeralToRoman, sendCommand } from "../utils/functions";
import { dropData } from "../utils/gameData";

// Chat register RARE DROPS
register("chat", (drop, mf, event) => {
    // Check if item tracked
    if (!dropData(drop)) return;
    item = dropData(drop);
    if (!datav2["rareDrops"][drop]) {
        datav2["rareDrops"][drop] = {
            since: 0,
            time: 0,
            average: 0,
            archive: []
        }
    }
    // Ping party
    let kills = datav2["rareDrops"][drop].since
    let time = datav2["rareDrops"][drop].time
    if (item.dropPing) {
        let msg = ChatLib.getChatMessage(event, true)
        if (settings.customMagicFind) {
            cancel(event);
            msg = ChatLib.getChatMessage(event, true).replace("✯ Magic Find", "α Mixend Luck");
            ChatLib.chat(msg)
        }
        announceDrop(msg, kills, time, item.spam);
    }
    // Update tracking
    datav2["rareDrops"][drop].archive.push([parseInt(mf), kills])
    datav2["rareDrops"][drop].since = 0;
    datav2["rareDrops"][drop].time = Date.now();
    datav2.save()
}).setCriteria("RARE DROP! ${drop} (+${mf}% ✯ Magic Find)");
//RARE DROP! Lucky Clover Core (+69% ✯ Magic Find)

//# region Track drops 

// ChatLib.chat(`&6&lRARE DROP! &d&l${item.name}`);
let MobDrops = [
    {
        name: "Lord Jawbus",
        type: "Iron Golem",
        condition: () => true,
        items: ["MAGMA_LORD_FRAGMENT", "ATTRIBUTE_SHARD", "BOBBIN_SCRIPTURES"]
    },
    {
        name: "Thunder",
        type: "Guardian",
        condition: (entity) => entity.getWidth() > 1.5,
        items: ["ENCHANTED_BOOK", "ATTRIBUTE_SHARD"],
        book: ["Flash"]
    },
    {
        name: "Moogma",
        type: "Mooshroom",
        condition: () => true,
        items: ["MOOGMA_LEGGINGS"]
    },
    {
        name: "Magma Slug",
        type: "Magma Cube",
        condition: (entity) => entity.getWidth() > 1 && entity.getWidth() < 1.3,
        items: ["SLUG_BOOTS"]
    },
    {
        name: "Lava Flame",
        type: "Blaze",
        condition: () => true,
        items: ["FLAMING_CHESTPLATE"]
    },
    {
        name: "Taurus",
        type: "Pig",
        condition: () => true,
        items: ["TAURUS_HELMET"]
    }
]


let enchantmentsTable = {
    "ultimate_flash": {
        name: "Flash", color: LIGHT_PURPLE + BOLD
    },
}

function getSkyblock(item, field) {
    return item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.get(field);
}

// Track items via their skyblock ID
function scanPlayerInventory(itemsToScan) {
    let itemsSaved = [];
    // Scan for listed items and check item age
    Player?.getInventory()?.getItems().forEach(item => {
        itemsToScan.forEach(tracked => {
            if ((getSkyblock(item, "id")?.toString()?.replace(/['"]+/g, '') == tracked) &&
                (Date.now() - parseInt(getSkyblock(item, "timestamp")) < 800)) {
                itemsSaved.push(item);
            }
        });
    });
    return itemsSaved;
}

register("entityDeath", (entity) => {
    if (!Player?.asPlayerMP()?.getDimension() === -1) { return; }

    // Entity death is one tracked
    let matchedDrop = MobDrops.find((e) => entity.name == e.type && e.condition(entity));

    if (matchedDrop) {
        setTimeout(() => {
            let foundItems = scanPlayerInventory(matchedDrop.items)
            foundItems.forEach((item) => {
                handleItemDropped(item);
            }
            );
        }, 100);

    }
});

let toDisplayUUID = [];
let timerDisplay = 0;
// Queue for item to announce
register("step", (event) => {
    let toDisplay = [];
    itemToDisplay.forEach(elem => {
        if (toDisplayUUID.includes(elem[0])) {
            console.log(`Skipped: ${elem[0]}`)
            return;
        }
        console.log(`Added to display: ${elem[0]}`)
        toDisplay.push(elem[1]);
        toDisplayUUID.push(elem[0]);
    })
    toDisplay.forEach(elem => {
        console.log(`Display: ${elem}`)
        ChatLib.chat(elem);
    })
    itemToDisplay = new Set();
    timerDisplay = timerDisplay + 1;
    if (timerDisplay == 1000) {
        console.log(`CLEAR ${toDisplayUUID.length} elements`)
        toDisplayUUID = [];
        timerDisplay = 0;
    }
}).setFps(5);

let itemToDisplay = new Set();
// Handle message based on item drop
function handleItemDropped(item) {
    let itemID = getSkyblock(item, "id")?.toString()?.replace(/['"]+/g, '');
    let name = "";
    let itemName = '';
    let uuid = getSkyblock(item, "uuid").hashCode();
    if (itemToDisplay.has(uuid)) {
        return;
    }

    switch (itemID) {
        case "ENCHANTED_BOOK":
            let elem = enchantmentsTable[getSkyblock(item, "enchantments").keySet[0]];
            name = `${elem.color}${elem.name} I`;
            break;
        case "ATTRIBUTE_SHARD":
            let key = getSkyblock(item, "attributes").keySet[0];
            let level = getSkyblock(item, "attributes").get(key);
            itemName = item.getNBT().get("tag").get("display").get("Name")?.toString()?.replace(/['"]+/g, '');
            name = `${itemName} ${AQUA}(${formatKeyAttribute(key)} ${numeralToRoman(parseInt(level))})`;
            break;
        case "MOOGMA_LEGGINGS":
        case "SLUG_BOOTS":
        case "TAURUS_HELMET":
        case "FLAMING_CHESTPLATE":
            // if attribute MF or BF
            let keys = getSkyblock(item, "attributes").keySet;
            let attrName = ['magic_find', 'blazing_fortune', 'fishing_experience']
                .filter(attr => keys.includes(attr))
                .map(attr => {
                    let value = getSkyblock(item, "attributes").get(attr);
                    return `${attr.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())} ${numeralToRoman(parseInt(value))}`;
                });

            if (attrName.length === 0) {
                return; // Exit the function early
            }

            let attributes = attrName.length ? attrName.join(' & ') : 'None';
            itemName = item.getNBT().get("tag").get("display").get("Name")?.toString()?.replace(/['"]+/g, '');
            name = `${itemName} ${AQUA}(${attributes})`;
            break;
        default:
            name = item.getNBT().get("tag").get("display").get("Name")?.toString()?.replace(/['"]+/g, '');
            break;
    }
    console.log(`ITEM DETECTED: ${uuid} (${name})`)
    itemToDisplay.add([
        uuid,
        `${GOLD + BOLD}RARE DROP! ${name}`
    ])
}
//#endregion Track drops 

register("command", () => {
    let item = Player?.getInventory()?.getItems()[0];
    handleItemDropped(item);
    console.log(item.getNBT());
}).setName("mixTestDrop", true);