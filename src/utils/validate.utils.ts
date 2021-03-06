import { err } from './log.utils';
import { DateFormat } from './format.utils';

const NUMERIC_EXP = /^[0-9]*$/;
const ALPHANUMERIC_EXP = /^[a-z0-9]*$/i;

/**
 * Checks whether a given value is not `null` or
 * `undefined`.
 *
 * @export
 * @param {*} val
 * @returns boolean
 */
export function isValue ( val:any ) {
    return typeof val !== 'undefined' && val !== null;
}


/**
 * Checks whether a given value is alphanumeric.
 *
 * @export
 * @param {(string|number)} val
 * @returns boolean
 */
export function isAlphanumeric ( val:string|number ) {
    return isValue(val) && ALPHANUMERIC_EXP.test(val.toString());
}

/**
 * Checks whether a given vlaue is numeric.
 *
 * @export
 * @param {(string|number)} val
 * @returns
 */
export function isNumeric ( val:string|number ) {
    return isValue(val) && NUMERIC_EXP.test(val.toString() );
}

/**
 * Checks whether a given value has a certain min/max length.
 * If `max` is ommited the value must be exactly `min`.
 *
 * @export
 * @param {(string|number)} val
 * @param {number} min
 * @param {number} [max]
 * @returns boolean
 */
export function hasLength ( val:string|number, min:number, max?:number ) {
    // Match exact if max i ommited.
    max = isValue(max) ? max : min;
    if ( min > max ) {
        err(`Expected "min" to equal or smaller then "max" to do a range check, got [${min}, ${max}]`);
    }
    if ( min < 0 ||  max < 0 ) {
        err(`Expected "min" and "max" to be positive integers, got [${min}, ${max}]`);
    }
    const length = val.toString().length;
    return min <= length && length <= max;
}

/**
 * Check wheter date is correctly formated.
 *
 * @export
 * @param {string} date
 * @param {DateFormat} format
 * @returns
 */
export function isDate ( date:string|number, format:DateFormat ) {
    if ( !isValue(format) ) { return true; }
    return isNumeric(date) && hasLength(date, DateFormat[format].length);
}