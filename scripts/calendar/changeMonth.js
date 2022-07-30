import {
  currDate,
  generateDates,
  monthUsrIsOn as oldMonthUsrIsOn,
  pMonth,
  pYear,
  yearUsrIsOn as oldYearUsrIsOn,
} from "./generateDates.js";
const div = document.createElement("div");
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
let monthUsrIsOn = oldMonthUsrIsOn;
let yearUsrIsOn = oldYearUsrIsOn;
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
function changeToPrevMonth() {
  if (monthUsrIsOn === 0) {
    monthUsrIsOn = 12;
    yearUsrIsOn--;
    pYear.textContent = yearUsrIsOn;
  }
  monthUsrIsOn--;
  generateDates();
  pMonth.textContent = months[monthUsrIsOn];
  generateMonthAndYear()
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
  generateMonthAndYear()
}

export { changeToPrevMonth, changeToNextMonth,generateMonthAndYear };
