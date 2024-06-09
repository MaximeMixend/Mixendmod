//========================================
// DROPS
//========================================

import { datav2 } from "../utils/data";
import { announceDrop } from "../utils/functions";

// Chat register RARE DROPS
register("chat", (drop, mf, event) => {
    // Check if item tracked
    if (!datav2["rareDrops"][drop]) return;

    // Ping party
    let kills = datav2["rareDrops"][drop].since
    let time = Date.now() - datav2["rareDrops"][drop].time;
    if (dropData(drop).dropPing) {
        cancel(event);
        let msg = ChatLib.getChatMessage(event, true).replace("✯ Magic Find", "α Mixend Luck");
        ChatLib.chat(msg);
        announceDrop(drop, mf, kills, time, dropData(drop).spam);
    }

    // Update tracking
    datav2["rareDrops"][drop].archive.push(`MF: ${parseInt(mf)} KILLS:${kills} TIME:${time}`)
    datav2["rareDrops"][drop].since = 0;
    datav2["rareDrops"][drop].time = Date.now();
    datav2.save()


}).setCriteria("RARE DROP! ${drop} (+${mf}% ✯ Magic Find)");