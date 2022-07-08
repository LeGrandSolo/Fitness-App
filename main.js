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
document.getElementById("prev").addEventListener("click", changeToPrevMonth);
document.getElementById("next").addEventListener("click", changeToNextMonth);
generateMonthAndYear();
function generateDates() {
  while (datesElem.firstChild) {
    datesElem.removeChild(datesElem.firstChild);
  }
  const weekDayOfFirstDayOfMonth = getWeekDayOfFirstDateInMonth(
    yearUsrIsOn,
    monthUsrIsOn
  );
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
      const li = document.createElement("li");
      li.textContent = i;
      li.style.color = '#96bbbb';
      datesElem.appendChild(li);
    }
  }
  let numOfDaysInCurrMonth = getNumberOfDaysOfMonth(yearUsrIsOn, monthUsrIsOn);
  for (let i = 1; i <= numOfDaysInCurrMonth; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    if (i === currDate.getDate()) {
        li.id = "active";
    }
    datesElem.appendChild(li);
  }
}
function generateMonthAndYear() {
  pMonth.textContent = months[monthUsrIsOn];
  pYear.textContent = currDate.getFullYear();
  pMonth.id = "monthHeaderName";
  pYear.id = "yearHeaderName";
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
function getWeekDayOfFirstDateInMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
