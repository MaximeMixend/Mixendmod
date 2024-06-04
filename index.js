import settings from "./settings";
import "./features/fishing.js";
import "./features/commands.js";
import "./features/mining.js";
import "./features/diana.js";
import "./features/miniboss.js";
import "./utils/functions.js";
import "./features/general.js";
import "./features/beta.js";

import { BOLD, DARK_GREEN, DARK_RED, GOLD, GREEN, YELLOW } from "./utils/constants.js";

// -----------------------------------
// SETTINGS GUI
// -----------------------------------
register("command", () => {
    settings.openGUI()
}).setName("mixend").setAliases("mix");

ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${GOLD + BOLD}v0.7.1`);
ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${GOLD + BOLD}Use ${YELLOW + BOLD}/mixhelp${GOLD + BOLD} for more info!`);
