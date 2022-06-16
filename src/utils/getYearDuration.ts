/**
 * Utility function to get the years difference between now and the date passed as a parameter.
 * Works like a function to get the age of a person.
 * @param inputDate
 */
function getYearDuration(inputDate: Date) {
  const today = new Date();
  let years = today.getFullYear() - inputDate.getFullYear();
  const month = today.getMonth() - inputDate.getMonth();
  // Reduce years difference by taking in account the month and the day
  if (month < 0 || (month === 0 && today.getDate() < inputDate.getDate())) {
    years--;
  }
  return years;
}

export default getYearDuration;
