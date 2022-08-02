function getNumberOfDaysOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(year, month, day) {
  return new Date(year, month, day).getDay();
}
export { getNumberOfDaysOfMonth, getWeekDay };
