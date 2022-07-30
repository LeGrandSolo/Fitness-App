import { changeToNextMonth, changeToPrevMonth, generateMonthAndYear } from "./changeMonth.js";
import { generateDates } from "./generateDates.js";
import { selectActiveDate } from "./modifySelectedDateInfo.js";

window.onload = function () {
  generateCalendar();
};
document.getElementById('prev').addEventListener('click', changeToPrevMonth);
document.getElementById('next').addEventListener('click', changeToNextMonth);
function generateCalendar() {
    generateDates();
    selectActiveDate();
    generateMonthAndYear();
  }