//========================================
// DROPS
//========================================

import settings from "../settings";
import { datav2 } from "../utils/data";
import { announceDrop } from "../utils/functions";
import { dropData } from "../utils/gameData";

// Chat register RARE DROPS
register("chat", (drop, mf, event) => {
    // Check if item tracked
    if (!dropData(drop)) return;
    if (!datav2["rareDrops"][drop]) {
        datav2["rareDrops"][drop] = {
            since: 0,
            time: 0,
            archive: []
        }
    }
    // Ping party
    let kills = datav2["rareDrops"][drop].since
    let time = datav2["rareDrops"][drop].time
    if (dropData(drop).dropPing) {
        let msg = ChatLib.getChatMessage(event, true)
        if (settings.customMagicFind) {
            cancel(event);
            msg = ChatLib.getChatMessage(event, true).replace("✯ Magic Find", "α Mixend Luck");
            ChatLib.chat(msg)
        }
        announceDrop(msg, kills, time, dropData(drop).spam);

    }

    // Update tracking
    datav2["rareDrops"][drop].archive.push(`MF: ${parseInt(mf)} KILLS:${kills} TIME:${time}`)
    datav2["rareDrops"][drop].since = 0;
    datav2["rareDrops"][drop].time = Date.now();
    datav2.save()


}).setCriteria("RARE DROP! ${drop} (+${mf}% ✯ Magic Find)");
//RARE DROP! Lucky Clover Core (+69% ✯ Magic Find)