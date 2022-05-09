import * as _ from 'lodash';

export const THIS_YEAR: number = +new Date().getFullYear();

export const THIS_MONTH: number = +new Date().getMonth() + 1;

export const WEEK_DAYS = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

export const CALENDAR_WEEKS = 6;

/**
 * Return the correct numbers of day in a month. If the month is february
 * It will return either 29 or 28 whether it is a leap year or not.
 * @param month
 * @param year
 */
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  if (month === 2) return leapYear ? 29 : 28;
  else return months30.includes(month) ? 30 : 31;
};

/**
 * The first day of a given month and year will be returned
 * as a number between 1 and 7, where 1 is
 * @param month
 * @param year
 */
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  const date = new Date(`${_.padStart(`${month}`, 2, '0')}-01-${year}`);
  const day = date.getDay();
  return day + 1;
};

export const isSameMonthAndYear = (date: Date, baseDate = new Date()) => {
  const isSameMonth = date.getMonth() === baseDate.getMonth();
  const isSameYear = date.getFullYear() === baseDate.getFullYear();
  return isSameMonth && isSameYear;
};

export const isSameDay = (date: Date, baseDate = new Date()) => {
  const isSameDate = date.getDate() === baseDate.getDate();
  return isSameDate && isSameMonthAndYear(date, baseDate);
};

export const getDateISO = (date = new Date()) => {
  return [
    _.padStart(`${date.getMonth() + 1}`, 2, '0'), // Month
    _.padStart(`${date.getDate()}`, 2, '0'), // Day
    date.getFullYear(), // Year
  ].join('-');
};

export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevYear };
};

export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};
