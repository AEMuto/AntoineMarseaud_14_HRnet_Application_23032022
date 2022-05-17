import * as _ from "lodash";
import {getMonthDays} from "./calendar";

const currentDate = new Date();

const currentDateString = [
	_.padStart(`${currentDate.getMonth() + 1}`, 2, '0'),
	_.padStart(`${currentDate.getDate()}`, 2, '0'),
	_.padStart(`${currentDate.getFullYear()}`, 4, '0'),
].join('/');

const datePattern = new RegExp('\\d{1,2}\\/\\d{1,2}\\/\\d{1,4}')

/**
 * If the input parameter doesn't match the 'mm/dd/yyyy' pattern this function
 * return the current date. Else it will parse the values for the day and month
 * and make sure they are valid. If not valid the values will be cast as the nearest
 * possible value. Ex: day = 99 ? day = 31
 * @param input
 */
export const dateInputParser = (input:string) => {
	if (!input.match(datePattern)) return currentDateString
	const dateElements = input.split('/')
	let month = parseInt(dateElements[0],10)
	let day = parseInt(dateElements[1], 10)
	let year = parseInt(dateElements[2], 10)

	if (month > 12) month = 12
	if (month < 1) month = 1
	if (day < 1) day = 1

	// Return the correct maximum day depending on the month & year
	if (day > getMonthDays(month, year)) day = getMonthDays(month, year)

	return [
		_.padStart(`${month}`, 2, '0'),
		_.padStart(`${day}`, 2, '0'),
		_.padStart(`${year}`, 4, '0'),
	].join('/');

}