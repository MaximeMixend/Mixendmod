import settings from "../settings";
import { BOLD, LIGHT_PURPLE, GOLD } from "./constants";
import { crimsonIsleCatch, crystalHollowCatch, festivalCatch, spookyCatch, waterCatch, jerryWorkshopCatch, dropData } from "../utils/gameData";


let textItem = new Text("", 0, 0);
/**
 * For logging purposes
 */
export function sendCommand(msg, log = false) {
    ChatLib.command(msg);
    if (log) {
        console.log(msg);
    }
}

export function sendChat(msg, condition = true) {
    if (condition) {
        ChatLib.chat(msg);
    }
}

export function announceMob(partyMsg, counter, interval) {
    const valuePerHour = (counter * 3600000) / interval;
    const formattedInterval = formatMilliseconds(interval);
    let message = `pc ${partyMsg}`;
    if (settings.catchMessageInformation)
        message += settings.catchPingMode
            ? ` [${counter} at ${valuePerHour.toFixed(1)}/h]`
            : ` [${counter} in ${formattedInterval}]`;

    sendCommand(message);
}

export function announceDrop(msg, count, time, spam) {
    if (settings.partyPingDrops) {
        sendCommand(`pc ${msg.replace(/&./g, '')} [${count} in ${formatMilliseconds(Date.now() - time)}]`);
        if (false) {
            sendCommand(`gc ${msg.replace(/&./g, '')} [${count} in ${formatMilliseconds(Date.now() - time)}]`);
            sendCommand(`ac ${msg.replace(/&./g, '')} [${count} in ${formatMilliseconds(Date.now() - time)}]`);
        }

    }
    Client.showTitle("", `${msg}`, 5, 60, 25);

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
    if (years > 5) return "way too many years...";
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

export function getArea() {
    let areaMsg = TabList.getNames()?.find(tab => tab.startsWith("§r§b§lArea:") || tab.startsWith("§r§b§lDungeon:"));
    if (!(areaMsg == undefined)) {
        return areaMsg.split("Area: ")[1].replace(/§./g, '');
    }
    else return;
}

export function getDate() {
    let now = (new Date().getTime() - 1560275700000) / 1000; // Current time in seconds
    let hourDuration = 50; // There are 50 real seconds in a skyblock hour
    let dayDuration = hourDuration * 24; // There are 24 skyblock hours in a day
    let monthDuration = dayDuration * 31; // There are 31 skyblock days in a month
    let seasonDuration = monthDuration * 3; // There are 3 months in a skyblock season
    let yearDuration = seasonDuration * 4; // There are 4 seasons in a skyblock year

    // Calculate the current year, season, month, day, hour, and minute
    let year = Math.floor(now / yearDuration);
    now %= yearDuration;
    let raw = now;

    let seasonNames = ["Spring", "Summer", "Autumn", "Winter"];
    let seasonStageNames = ["Early", "", "Late"];

    let seasonIndex = Math.floor(now / seasonDuration);
    now %= seasonDuration;

    let monthIndex = Math.floor(now / monthDuration);
    now %= monthDuration;

    let dayIndex = Math.floor(now / dayDuration);
    now %= dayDuration;

    let hour = Math.floor(now / hourDuration);
    let minute = Math.floor((now % hourDuration) * 6 / hourDuration) * 10; // Convert seconds to minutes and display in increments of 10

    return {
        raw: raw,
        year: year,
        season: seasonNames[seasonIndex],
        stage: seasonStageNames[monthIndex],
        day: dayIndex + 1, // Days start from 1
        hour: hour,
        minute: minute
    };
}

export function isSpooky() {
    let hourDuration = 50; // There are 50 real seconds in a skyblock hour
    let dayDuration = hourDuration * 24; // There are 24 skyblock hours in a day
    let monthDuration = dayDuration * 31; // There are 31 skyblock days in a month
    let spookyStart = 7 * monthDuration + 25 * dayDuration;
    let spookyEnd = 8 * monthDuration + 3 * dayDuration;
    let time = getDate().raw
    return (time < spookyEnd && time > spookyStart)
}

// Function to get catch options based on the area
export function getCatchOptions() {
    area = getArea();
    // Zone specific
    let mobs = { "": "" };
    switch (area) {
        case 'Crimson Isle':
            mobs = { ...crimsonIsleCatch, ...waterCatch };
            break;
        case 'Crystal Hollows':
            mobs = { ...crystalHollowCatch, ...waterCatch };
            break;
        case 'Jerry\'s Workshop':
            mobs = { ...jerryWorkshopCatch, ...waterCatch };
            break;
        default:
            mobs = { ...waterCatch };
            break;
    }
    if (isSpooky() && area != "Crimson Isle") {
        mobs = { ...mobs, ...spookyCatch }
    }
    return mobs
}

// Parse string time like 5m 30s into the equivalent integer number of seconds
export function parseTimeToSeconds(timeStr) {
    let totalSeconds = 0;

    // Match minutes (e.g., "5m") or seconds (e.g., "60s") with optional spaces
    const minutesMatch = timeStr.match(/(\d+)m/);
    const secondsMatch = timeStr.match(/(\d+)s/);

    // If minutes are found, convert to seconds and add to total
    if (minutesMatch) {
        const minutes = parseInt(minutesMatch[1], 10);
        totalSeconds += minutes * 60;
    }

    // If seconds are found, add directly to total
    if (secondsMatch) {
        const seconds = parseInt(secondsMatch[1], 10);
        totalSeconds += seconds;
    }

    return totalSeconds;
}


export function numeralToRoman(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export function formatKeyAttribute(str) {
    return str
        .replace(/_/g, ' ') // Replace underscores with spaces
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}