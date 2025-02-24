import settings from "./settings";
import "./features/fishing.js";
import "./features/commands.js";
import "./features/diana.js";
import "./features/miniboss.js";
import "./utils/functions.js";
import "./features/itemInfo.js";
import "./features/rareDrops.js";
import "./features/toOrganize.js";

// Fishing
import "./features/fishing/magmaCore.js";
import "./features/fishing/crimsonIsle.js";

import { BOLD, DARK_RED, GOLD, YELLOW } from "./utils/constants.js";

// -----------------------------------
// SETTINGS GUI
// -----------------------------------
register("command", () => {
    settings.openGUI()
}).setName("mixend").setAliases("mix");

ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${GOLD + BOLD}v0.8.0`);

