import settings from "../settings";
import { BOLD, LIGHT_PURPLE, GOLD } from "./constants";
import { dropData } from "./gameData";
import RenderLib from "../../RenderLib/index.js";

/**
 * For logging purposes
 */
export function sendCommand(msg, log = false) {
    ChatLib.command(msg);
    if (log) {
        console.log(msg);
    }
}

export function announceMob(partyMsg, counter, interval) {
    const valuePerHour = (counter * 3600000) / interval;
    const formattedInterval = formatMilliseconds(interval);
    const message = settings.catchPingMode
        ? `pc ${partyMsg} [${counter} at ${valuePerHour.toFixed(1)}/h]`
        : `pc ${partyMsg} [${counter} in ${formattedInterval}]`;

    sendCommand(message);
}

export function announceDrop(item, mf, count, time, spam) {
    if (settings.partyPingDrops) {
        sendCommand(`pc RARE DROP! ${item} (+${mf}% α Mixend Luck) [${count} in ${formatMilliseconds(Date.now() - time)}]`);
        if (spam) {
            sendCommand(`gc RARE DROP! ${item} (+${mf}% α Mixend Luck)`);
            sendCommand(`ac RARE DROP! ${item} (+${mf}% α Mixend Luck)`);
        }

    }
    let color = dropData(item).color ? dropData(item).color : GOLD;
    Client.showTitle(`${BOLD + color} ${item}${BOLD + LIGHT_PURPLE} (+${mf}% α Mixend Luck)`, "", 5, 60, 25);

};

/**
 * Converts time (ms) into readable duration (d:h:m:s)
 * @param  {Int} ms  Time duration in ms
 * @return {String}         Readable time duration
 */
export function formatMilliseconds(ms) {
    ms = Math.abs(ms);

    const weeks = Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
    const years = Math.floor(weeks / 52);
    const days = Math.floor((ms % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    const result = [];
    if (years > 5) return "wait too long ago...";
    if (years > 0) result.push(`${years}y`);
    if (weeks > 0) result.push(`${weeks % 52}w`);
    if (days > 0) result.push(`${days}d`);
    if (hours > 0) result.push(`${hours}h`);
    if (minutes > 0) result.push(`${minutes}m`);
    if (seconds > 0) result.push(`${seconds}s`);

    if (ms < 1000) return "0s";



    return result.join(' ');
};


export function findFormattedKey(mapping) {
    return new RegExp(`^(${Object.keys(mapping).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);
};

/**
* Computes average of list
* @param {List[Int]} list 
*/
export function calcAvg(list) {
    let sum = 0;
    list.forEach(elem => { sum += elem; });
    return sum / list.length;
}

/**
* Get area info
*/
export function getArea() {
    return TabList.getNames()?.find(tab => tab.startsWith("§r§b§lArea:") || tab.startsWith("§r§b§lDungeon:"))
        .split("Area: ")[1];
}
