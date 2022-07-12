import { generateDates } from "./generateDates.js";
import { selectActiveDate } from "./modifySelectedDateInfo.js";

window.onload = function () {
  generateCalendar();
};
function generateCalendar() {
    generateDates();
    selectActiveDate();
  }