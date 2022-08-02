import { page } from "../api/lib.js";
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
function generateMonthAndYear() {
  return { month: months[monthUsrIsOn], year: yearUsrIsOn };
}
function changeToPrevMonth() {
  if (monthUsrIsOn === 0) {
    monthUsrIsOn = 12;
    yearUsrIsOn--;
  }
  monthUsrIsOn--;
  page.redirect(`/my-workouts/${monthUsrIsOn}-${yearUsrIsOn}`);
}
function changeToNextMonth() {
  if (monthUsrIsOn === 11) {
    monthUsrIsOn = -1;
    yearUsrIsOn++;
  }
  monthUsrIsOn++;
  page.redirect(`/my-workouts/${monthUsrIsOn}-${yearUsrIsOn}`);
}

export {
  changeToPrevMonth,
  changeToNextMonth,
  generateMonthAndYear,
  currDate,
  monthUsrIsOn,
  yearUsrIsOn,
};
