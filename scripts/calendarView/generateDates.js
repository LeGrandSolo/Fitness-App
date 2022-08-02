import { currDate, monthUsrIsOn, yearUsrIsOn } from "./changeMonth.js";
import { getNumberOfDaysOfMonth, getWeekDay } from "./getDateInfo.js";

let prevMonthDates = [];
let currMonthDates = [];
let nextMonthDates = [];

function generateDates() {
  prevMonthDates = [];
  currMonthDates = [];
  nextMonthDates = [];
  let weekDayOfFirstDayOfMonth = getWeekDay(yearUsrIsOn, monthUsrIsOn, 1);
  if (weekDayOfFirstDayOfMonth === 0) {
    weekDayOfFirstDayOfMonth = 7;
  }
  if (weekDayOfFirstDayOfMonth > 1) {
    let hightestDateOfPrevMonth = 0;
    if (monthUsrIsOn !== 0) {
      hightestDateOfPrevMonth = getNumberOfDaysOfMonth(
        yearUsrIsOn,
        monthUsrIsOn - 1
      );
    } else {
      hightestDateOfPrevMonth = getNumberOfDaysOfMonth(
        yearUsrIsOn - 1,
        monthUsrIsOn - 1
      );
    }
    for (
      let i = hightestDateOfPrevMonth - (weekDayOfFirstDayOfMonth - 2);
      i <= hightestDateOfPrevMonth;
      i++
    ) {
      prevMonthDates.push(i);
    }
  }
  let numOfDaysInCurrMonth = getNumberOfDaysOfMonth(yearUsrIsOn, monthUsrIsOn);
  for (let i = 1; i <= numOfDaysInCurrMonth; i++) {
    currMonthDates.push(i);
  }
  const weekDayOfLastDateOfMonth = getWeekDay(
    yearUsrIsOn,
    monthUsrIsOn,
    numOfDaysInCurrMonth
  );
  if (weekDayOfLastDateOfMonth !== 0) {
    let addDate = 1;
    for (let i = 7 - (7 - weekDayOfLastDateOfMonth); i < 7; i++) {
      nextMonthDates.push(addDate);
      addDate++;
    }
  }
}
export { prevMonthDates, currMonthDates, nextMonthDates, generateDates };
