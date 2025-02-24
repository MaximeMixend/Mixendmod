import settings from "../settings";

register("chat", (kills, bonus, event) => {
    if (settings.removeComboYap) {
        cancel(event);
    }
    // console.log("&");
}).setCriteria("+${kills} Kill Combo ${bonus}")

register("chat", (yapping, event) => {
    if (settings.removeTribeYap) {
        cancel(event);
    }
}).setCriteria("[NPC] Tribe Member: ${yapping}")
// [NPC] Tribe Member: You need to be taught some manners. (5)