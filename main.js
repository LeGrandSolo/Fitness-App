const calendarElem = document.getElementById("calendar");
const datesElem = document.querySelector(".dates");
const div = document.createElement("div");
const pMonth = document.createElement("p");
const pYear = document.createElement("p");
const currDate = new Date();
let monthUsrIsOn = currDate.getMonth();
let yearUsrIsOn = currDate.getFullYear();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
datesElem.addEventListener("click", showPopupOnDate);
document.getElementById("prev").addEventListener("click", changeToPrevMonth);
document.getElementById("next").addEventListener("click", changeToNextMonth);
generateMonthAndYear();
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
      createAndAppendLiWithDateNum(i, false, "not-curr-month");
    }
  }
  let numOfDaysInCurrMonth = getNumberOfDaysOfMonth(yearUsrIsOn, monthUsrIsOn);
  for (let i = 1; i <= numOfDaysInCurrMonth; i++) {
    createAndAppendLiWithDateNum(i, true, "curr-month");
  }
  const weekDayOfLastDateOfMonth = getWeekDay(
    yearUsrIsOn,
    monthUsrIsOn,
    numOfDaysInCurrMonth
  );
  if (weekDayOfLastDateOfMonth !== 0) {
    let addDate = 1;
    for (let i = 7 - (7 - weekDayOfLastDateOfMonth); i < 7; i++) {
      createAndAppendLiWithDateNum(addDate, false, "not-curr-month");
      addDate++;
    }
  }
}
function createAndAppendLiWithDateNum(num, isCurrMonth, liClassName) {
  const li = document.createElement("li");
  li.textContent = num;
  if (isCurrMonth) {
    if (num === currDate.getDate()) {
      li.id = "active";
    }
  }
  li.className = liClassName;
  datesElem.appendChild(li);
}

function generateMonthAndYear() {
  pMonth.textContent = months[monthUsrIsOn];
  pYear.textContent = currDate.getFullYear();
  pMonth.id = "monthHeaderName";
  pYear.id = "yearHeaderName";
  pMonth.className = "month-year-header";
  pYear.className = "month-year-header";
  div.append(pMonth, pYear);
  div.style.margin = "auto";
  generateDates();
  document.getElementById("month-header").appendChild(div);
}
function selectActiveDate() {
  const dates = document.querySelector(".dates");
  dates.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
      const prevActive = document.getElementById("active");
      prevActive.id = "";
      e.target.id = "active";
    }
  });
}
function changeToPrevMonth() {
  if (monthUsrIsOn === 0) {
    monthUsrIsOn = 12;
    yearUsrIsOn--;
    pYear.textContent = yearUsrIsOn;
  }
  monthUsrIsOn--;
  generateDates();
  pMonth.textContent = months[monthUsrIsOn];
}
function changeToNextMonth() {
  if (monthUsrIsOn === 11) {
    monthUsrIsOn = -1;
    yearUsrIsOn++;
    pYear.textContent = yearUsrIsOn;
  }
  monthUsrIsOn++;
  generateDates();
  pMonth.textContent = months[monthUsrIsOn];
}
function getNumberOfDaysOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(year, month, day) {
  return new Date(year, month, day).getDay();
}
function showPopupOnDate(e) {
  let popup = document.querySelector("#popup");
  popup.style.display = "block";
  if (e.target.nodeName === "LI") {
    popup.textContent = e.target.textContent;
  }
}
