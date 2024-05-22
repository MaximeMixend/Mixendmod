import { BOLD, GOLD, GRAY, GREEN, LIGHT_PURPLE, RED, WHITE } from "../utils/constants";
import settings from "../settings";
import { fileData } from "../utils/data";

//#region Variables
let moveGui = new Gui();
const miniBossData = {
    ashfang: {
        name: "ASHFANG",
        distance: 10,
        timer: 0,
        status: false,
        five: false
    },
    barbarian_duke_x: {
        name: "BARBARIAN DUKE X",
        distance: 10,
        timer: 0,
        status: false,
        five: false
    },
    bladesoul: {
        name: "BLADESOUL",
        distance: 10,
        timer: 0,
        status: false,
        five: false
    },
    magma_boss: {
        name: "MAGMA BOSS",
        distance: 20,
        timer: 0,
        status: false,
        five: false
    },
    mage_outlaw: {
        name: "MAGE OUTLAW",
        distance: 10,
        timer: 0,
        status: false,
        five: false
    }
};
const miniNameToKey = {
    "BARBARIAN DUKE X": "barbarian_duke_x",
    "BLADESOUL": "bladesoul",
    "MAGE OUTLAW": "mage_outlaw",
    "ASHFANG": "ashfang",
    "MAGMA BOSS": "magma_boss"
};
//#endregion Variables

// ====================================================
// GUI
// ====================================================
//#region GUI
register("command", (arg) => {
    if (!settings.guiMiniboss) { return; }
    switch (arg) {
        case "reset":
        case "-r":
            fileData.miniGuiX = 10;
            fileData.miniGuiY = 185;
            fileData.save();
            break;
        default:
            moveGui.open()
            break;
    }
}).setName("mixguimini");

register("guimouseclick", (x, y, button, gui, event) => {
    if (moveGui.isOpen()) {
        fileData.miniGuiX = x;
        fileData.miniGuiY = y;
        fileData.save();
    }
})

register("renderoverlay", () => {
    let xPos = fileData.miniGuiX;
    let yPos = fileData.miniGuiY;

    if (moveGui.isOpen()) {
        new Text(`${RED + BOLD}ECHAP to save position`, Renderer.screen.getWidth() / 2, 20).draw();
        new Text(`${GREEN + BOLD}Click to place to left corner of GUI`, Renderer.screen.getWidth() / 2, 30).draw();
    }

    if (!settings.guiMiniboss) { return; }

    for (let key in miniBossData) {
        let mini = miniBossData[key];
        let color = RED;
        let displayText = "HIT!";

        if (mini.five) {
            displayText = 'FIVE IN A ROW!';
            color = GRAY;
        }
        else if (mini.status === false && mini.timer <= 0) {
            color = GOLD;
        } else if (mini.timer > 0) {
            displayText = `${mini.timer}s`;
        }
        else if (mini.status === true && mini.timer <= 0) {
            color = GREEN;
            displayText = "";
        }

        new Text(`${color + BOLD}${mini.name} ${WHITE + displayText}`, xPos, yPos).setShadow(true).draw();
        yPos += 10;
    }
});
//#endregion GUI

// ====================================================
// Track miniboss status
// ====================================================
//#region Track
register("step", (event) => {
    for (let key in miniBossData) {
        let mini = miniBossData[key];
        let detectedMobs = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand")).filter(entity => entity.getName().toLowerCase().includes(mini.name.toLowerCase()));
        let nearMob = false;
        if (detectedMobs.length && Player.asPlayerMP().distanceTo(detectedMobs[0].getEntity()) < mini.distance) {
            nearMob = true;
        }
        if (mini.timer > 0) {
            mini.timer -= 1;
            mini.status = false;
            // Add need the entity
        } else if (nearMob && key != "ashfang") {
            mini.status = true;
        }
    }
}).setFps(1);

register("chat", () => {
    miniBossData.ashfang.status = true;
}).setCriteria("CRITICAL HIT The Blazing Soul dealt 2,000,000 damage to Ashfang!");


register("chat", (bossName) => {
    const trimmedBossName = bossName.trim();
    const miniKey = miniNameToKey[trimmedBossName];
    let lastFive = fileData.miniBossHistory;

    if (!miniKey) { return; }
    miniBossData[miniKey].timer = 120;

    // Check if killstreak has been broken
    const allSameBefore = lastFive.every(key => key === lastFive[0]);
    if (allSameBefore && lastFive[0] != miniKey) {
        miniBossData[lastFive[0]].five = false;
    }

    lastFive.push(miniKey);
    if (lastFive.length > 5) {
        lastFive.shift();
    }

    // Check if killstreak is at 5
    const allSame = lastFive.every(key => key === lastFive[0]);
    if (allSame) {
        miniBossData[miniKey].five = true;
    }
    fileData.miniBossHistory = lastFive;
    fileData.save()
}
).setCriteria("${bossName} DOWN!");
//#endregion Variables

// ====================================================
// Reset variables
// ====================================================
//#region reset
register("worldUnload", () => {
    for (let key in miniBossData) {
        let mini = miniBossData[key];
        mini.timer = -1;
        mini.status = false;
        mini.five = false;
    }
});
//#endregion reset
