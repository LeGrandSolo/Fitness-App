import { getNumberOfDaysOfMonth, getWeekDay } from "./getDateInfo.js";
import { showPopupOnSelectedDate } from "./modifySelectedDateInfo.js";
import { monthUsrIsOn, yearUsrIsOn, currDate } from "./changeMonth.js";
const dateData = {};
const datesElem = document.querySelector(".dates");
const pMonth = document.createElement("p");
const pYear = document.createElement("p");
function generateDates() {
  while (datesElem.firstChild) {
    datesElem.removeChild(datesElem.firstChild);
  }
  const weekDayOfFirstDayOfMonth = getWeekDay(yearUsrIsOn, monthUsrIsOn, 1);
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
      createAndAppendLiWithDateNum(i, false, ["not-curr-month", "prev-month"]);
    }
  }
  let numOfDaysInCurrMonth = getNumberOfDaysOfMonth(yearUsrIsOn, monthUsrIsOn);
  for (let i = 1; i <= numOfDaysInCurrMonth; i++) {
    dateData[i] = document.createElement("ul");
    createAndAppendLiWithDateNum(i, true, ["curr-month"]);
  }
  const weekDayOfLastDateOfMonth = getWeekDay(
    yearUsrIsOn,
    monthUsrIsOn,
    numOfDaysInCurrMonth
  );
  if (weekDayOfLastDateOfMonth !== 0) {
    let addDate = 1;
    for (let i = 7 - (7 - weekDayOfLastDateOfMonth); i < 7; i++) {
      createAndAppendLiWithDateNum(addDate, false, [
        "not-curr-month",
        "next-month",
      ]);
      addDate++;
    }
  }
}
function createAndAppendLiWithDateNum(num, isCurrMonth, liClassArr) {
  const li = document.createElement("li");
  li.textContent = num;
  if (isCurrMonth) {
    if (num === currDate.getDate()) {
      li.id = "active";
      showPopupOnSelectedDate(num);
    }
  }
  for (const className of liClassArr) {
    li.classList.add(className);
  }
  datesElem.appendChild(li);
}
export {
  generateDates,
  createAndAppendLiWithDateNum,
  dateData,
  datesElem,
  pYear,
  pMonth,
};
