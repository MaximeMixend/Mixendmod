import { BOLD, GOLD, GREEN, LIGHT_PURPLE, OBFUSCATED } from "../utils/constants";
import settings from "../settings";

// -----------------------------------
// ABILITY
// -----------------------------------
// TODO: Make a GUI status
register("chat", () => {
    if (settings.alertMiningSpeedBoost) {
        Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SPEED BOOST USED ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 120, 10);
    }
}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!");

register("chat", () => {
    if (settings.alertMiningSpeedBoost) {
        Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SPEED BOOST AVAILABLE ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 120, 10);
    }
}).setCriteria("Mining Speed Boost is now available!");

<<<<<<< HEAD

register("chat", () => {
    Client.showTitle(`${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}] ${GREEN + BOLD}SHAFT ${GOLD + BOLD}[${LIGHT_PURPLE + OBFUSCATED}a${GOLD + BOLD}]`, "", 10, 100, 10);
    ChatLib.command(`pc [MINESHAFT] Hi`);
    setTimeout(() => {
        ChatLib.command(`pc ${settings.mineshaftMessage}`);
    }, 1000);
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

register("chat", () => {
    ChatLib.command(`pc [SCRAP] Got my one.`);

}).setCriteria("EXCAVATOR! You found a Suspicious Scrap!");


let foundGrotto = false;
let pingGrotto = true;
register("step", () => {
    let count = 0;
    let coord = 0;
    World.getAllEntities().forEach(entity => {
        if (entity.getName().includes("Butterfly")) {
            count += 1;
            let x = Math.round(entity.getX());
            let y = Math.round(entity.getY());
            let z = Math.round(entity.getZ());
            coord = `x: ${x}, y: ${y}, z: ${z}`;
        }
    });

    foundGrotto = count > 0; // Set foundGrotto to true only if count is greater than 0
    if (count === 0) {
        foundGrotto = false;
        pingGrotto = true;
    }
    if (pingGrotto && foundGrotto) {
        ChatLib.chat(`${coord} JASPER`);
        Client.showTitle(`${LIGHT_PURPLE + BOLD}GROTTO FOUND`, "", 10, 80, 10);
        pingGrotto = false;
    }
}).setFps(1);

let foundLava = false;
let pibngLava = true;
register("step", () => {
    let count = 0;
    let coord = 0;
    World.getAllEntities().forEach(entity => {
        if (entity.getName().includes("Emerald")) {
            count += 1;
            let x = Math.round(entity.getX());
            let y = Math.round(entity.getY());
            let z = Math.round(entity.getZ());
            coord = `x: ${x}, y: ${y}, z: ${z}`;
        }
    });

    foundLava = count > 0; // Set foundGrotto to true only if count is greater than 0
    if (count === 0) {
        foundLava = false;
        pibngLava = true;
    }
    if (pibngLava && foundLava) {
        ChatLib.chat(`${coord}`);
        ChatLib.chat(`LAVA?`);
        Client.showTitle(`${GREEN + BOLD}WORMS??`, "", 10, 80, 10);
        pibngLava = false;
    }
}).setFps(2);
=======
// Scrap message
register("chat", () => {
    ChatLib.command("pc [SCRAP] Got my one");
}).setCriteria("EXCAVATOR! You found a Suspicious Scrap!");

// Mineshaft message
register("chat", () => {
    ChatLib.command("pc [MINESHAFT] Hi");
    setTimeout(() => {
        ChatLib.command(`pc ${mineshaftMessage}`);
    }, 500);
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

// Extra party transfer options
register("chat", (player) => {
        ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: !pt");

register("chat", (player) => {
    ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: !ptme");

register("chat", (player) => {
    ChatLib.command(`p transfer ${player}`);
}).setCriteria("Party > ${*} ${player}: .transfer");

register("worldUnload", () => {
    tracked = [];
});
>>>>>>> 017d29c7f2eea8f2bc3f22ed89e4891519b7accd
