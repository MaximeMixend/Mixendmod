import { BOLD, GOLD, GREEN, RED, WHITE } from "../utils/constants";
import settings from "../settings";
import { fileData } from "../utils/data";

//#region Variables
let moveGui = new Gui();
const miniBossData = {
    ashfang: {
        name: "ASHFANG",
        distance: 10,
        timer: 0,
        position: [-483, 135, -1015],
        status: false
    },
    barbarian_duke_x: {
        name: "BARBARIAN DUKE X",
        distance: 10,
        timer: 0,
        position: [-534, 117, -903],
        status: false
    },
    bladesoul: {
        name: "BLADESOUL",
        distance: 10,
        timer: 0,
        position: [-317, 83, -517],
        status: false
    },
    magma_boss: {
        name: "MAGMA BOSS",
        distance: 20,
        timer: 0,
        position: [-365, 60, -804],
        status: false
    },
    mage_outlaw: {
        name: "MAGE OUTLAW",
        distance: 10,
        timer: 0,
        position: [-181, 105, -858],
        status: false
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

//#region GUI
// ====================================================
// Miniboss GUI
// ====================================================

register("command", () => {
    if (settings.guiMiniboss) {
        moveGui.open()
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

        if (mini.status === false && mini.timer <= 0) {
            color = GOLD;
        } else if (mini.timer > 0) {
            displayText = `${mini.timer}s`;
        }
        if (mini.status === true && mini.timer <= 0) {
            color = GREEN;
            displayText = "";
        }

        new Text(`${color + BOLD}${mini.name} ${WHITE + displayText}`, xPos, yPos).setShadow(true).draw();
        yPos += 10;
    }
});
//#endregion Variables

//#region Track

// ====================================================
// Track miniboss status
// ====================================================

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
        } else if (nearMob) {
            mini.status = true;
        }
    }
}).setFps(1);

register("chat", (bossName) => {
    const trimmedBossName = bossName.trim();
    const miniKey = miniNameToKey[trimmedBossName];

    if (miniKey) {
        miniBossData[miniKey].timer = 120;
    }
}).setCriteria("${bossName} DOWN!");
//#endregion Variables

//#region reset
// ====================================================
// Reset
// ====================================================

register("worldUnload", () => {
    for (let key in miniBossData) {
        let mini = miniBossData[key];
        mini.timer = -1;
        mini.status = false;
    }
});
//#endregion reset
