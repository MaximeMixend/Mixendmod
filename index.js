import settings from "./settings";
import "./features/fishing.js";
import "./features/commands.js";
import "./features/mining.js";
import "./features/diana.js";
import "./utils/functions.js";
import { BOLD, DARK_GREEN, DARK_RED, GOLD } from "./utils/constants.js";

ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${BOLD}Loading...`);

// -----------------------------------
// SETTINGS GUI
// -----------------------------------
register("command", () => {
    settings.openGUI()
}).setName("mixend").setAliases("mix");

ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${DARK_GREEN + BOLD}v0.6.1 Loaded.`);
ChatLib.chat(`${GOLD}[${DARK_RED + BOLD}MixendMod${GOLD}] ${DARK_GREEN + BOLD}Use /mixend to open the settings!`);
