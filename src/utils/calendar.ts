import * as _ from 'lodash';

export const DATE_PATTERN = new RegExp('\\d{1,2}\\/\\d{1,2}\\/\\d{1,4}')

export const CURRENT_DATE = new Date()

export const THIS_YEAR: number = new Date().getFullYear();

export const THIS_MONTH: number = new Date().getMonth() + 1;

export const CURRENT_DATE_STRING = [
  _.padStart(`${CURRENT_DATE.getMonth() + 1}`, 2, '0'),
  _.padStart(`${CURRENT_DATE.getDate()}`, 2, '0'),
  _.padStart(`${CURRENT_DATE.getFullYear()}`, 4, '0'),
].join('/');


export const WEEK_DAYS = [
  { value: 1, label: 'Sun' },
  { value: 2, label: 'Mon' },
  { value: 3, label: 'Tue' },
  { value: 4, label: 'Wed' },
  { value: 5, label: 'Thu' },
  { value: 6, label: 'Fri' },
  { value: 7, label: 'Sat' },
];

export const MONTHS = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
];

export const CALENDAR_WEEKS = 6;


/**
 * If the input parameter doesn't match the 'mm/dd/yyyy' pattern this function
 * return the current date. Else it will parse the values for the day and month
 * and make sure they are valid. If not valid the values will be cast as the nearest
 * possible value. Ex: day = 99 ? day = 31
 * @param input
 */
export const dateInputParser = (input:string) => {
  if (!input.match(DATE_PATTERN)) return CURRENT_DATE_STRING
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
  const date = new Date(`${year}-${_.padStart(`${month}`, 2, '0')}-01`);
  const day = date.getDay();
  return day + 1;
};

export const isDate = (date: Date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

export const isSameMonthAndYear = (date: Date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) return false;
  const isSameMonth = date.getMonth() === baseDate.getMonth();
  const isSameYear = date.getFullYear() === baseDate.getFullYear();
  return isSameMonth && isSameYear;
};

export const isSameDay = (date: Date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) return false;

  const isSameDate = date.getDate() === baseDate.getDate();
  return isSameDate && isSameMonthAndYear(date, baseDate);
};

export const getDateISO = (dateString:string) => {
  const dateElements = dateString.split('/')
  const month = dateElements[0]
  const day = dateElements[1]
  const year = dateElements[2]
  return new Date(`${year}-${month}-${day}`)
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

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevYear);

  const prevMonthDates = _.range(daysFromPrevMonth).map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [
      `${prevYear}`,
      _.padStart(`${prevMonth}`, 2, '0'),
      _.padStart(`${day}`, 2, '0'),
    ];
  });

  const thisMonthDates = _.range(monthDays).map((n, index) => {
    const day = index + 1;
    return [
      `${year}`,
      _.padStart(`${month}`, 2, '0'),
      _.padStart(`${day}`, 2, '0'),
    ];
  });

  const nextMonthDates = _.range(daysFromNextMonth).map((n, index) => {
    const day = index + 1;
    return [
      `${nextYear}`,
      _.padStart(`${nextMonth}`, 2, '0'),
      _.padStart(`${day}`, 2, '0'),
    ];
  });


  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
