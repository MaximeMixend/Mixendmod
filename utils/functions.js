import settings from "../settings";
import { BOLD, LIGHT_PURPLE, GOLD } from "./constants";
import { dropData } from "./gameData";
import RenderLib from "../../RenderLib/index.js";

export function announceMob(partyMsg, counter, interval, coord) {
    ChatLib.command(`pc ${coord}┌( ಠ_ಠ)┘ ${partyMsg} [${counter} in ${formatMilliseconds(interval)}]`);
};

export function announceDrop(item, mf, count, time) {
    if (settings.partyPingDrops) {
        ChatLib.command(`pc MIXEND DROP! ${item} (+${mf}% ✯ Magic Find) [${count} in ${formatMilliseconds(Date.now() - time)}]`);
    }
    let color = dropData(item).color ? dropData(item).color : GOLD;
    Client.showTitle(`${BOLD + color} ${item}${BOLD + LIGHT_PURPLE} (+${mf}% ✯ Magic Find)`, "", 5, 60, 25);

};

/**
 * Converts time (ms) into readable duration (d:h:m:s)
 * @param  {Int} ms  Time duration in ms
 * @return {String}         Readable time duration
 */
export function formatMilliseconds(ms) {
    ms = Math.abs(ms);

    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    const result = [];
    if (days > 0) result.push(`${days}d`);
    if (hours > 0) result.push(`${hours}h`);
    if (minutes > 0) result.push(`${minutes}m`);
    if (seconds > 0) result.push(`${seconds}s`);

    if (ms < 1000) return "0s";

    return result.join(' ');
};

/**
 * Compute readable entity coords to use
 * @param  {Entity} entity  Entity object
 * @return {String}         Readable coordinates
 */
export function entityCoords(entity) {
    let x = Math.round(entity.getX());
    let y = Math.round(entity.getY());
    let z = Math.round(entity.getZ());
    return `x: ${x}, y: ${y}, z: ${z}`;

};

/**
 * Render entity hitbox. Inspired by volcaddons
 * @param  {Entity} entity  Entity object
 * @param  {int} r  color code red for hitbox
 * @param  {int} g  color code green for hitbox
 * @param  {int} b  color code blue for hitbox
 * @param  {int} title  Hitbox name to display
 * @param  {int} delta  time delta to estimate position
 * @param  {boolean} fill  fill faces or not
 */
export function renderEntity(entity, r, g, b, title, delta = 0.5, fill = true) {
    entity = entity?.getEntity() ?? entity;

    // Position estimate based on last tick movement (current pos - last tick position)
    const x = entity.field_70165_t * delta - entity.field_70142_S * (delta - 1);
    const y = entity.field_70163_u * delta - entity.field_70137_T * (delta - 1);
    const z = entity.field_70161_v * delta - entity.field_70136_U * (delta - 1);

    // Box dimensions
    const width = entity.field_70130_N;
    const height = entity.field_70131_O;

    // Draw hitbox wireframe
    RenderLib.drawEspBox(x, y, z, width, height, r, g, b, 1, true);

    // Add transparent faces
    if (fill) RenderLib.drawInnerEspBox(x, y, z, width, height, r, g, b, 100 / 510, true);
    if (title !== undefined) {
        Tessellator.drawString(`${title} §7[§b${Player.asPlayerMP().distanceTo(entity).toFixed(0)}m§7]`, x, y + height + 1, z, 0xffffff, true);
    }
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