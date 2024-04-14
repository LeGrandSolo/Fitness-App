import { html, styleMap } from "../api/lib.js";
import {
  currDate,
  generateMonthAndYear,
  changeToPrevMonth,
  changeToNextMonth,
  monthUsrIsOn,
  yearUsrIsOn,
} from "./changeMonth.js";
import { selectActiveDate } from "./modifySelectedDateInfo.js";
import {
  prevMonthDates,
  currMonthDates,
  nextMonthDates,
  generateDates,
} from "./generateDates.js";
import { showPopupOnSelectedDate } from "./datePopup.js";

export const calendarTemplate = (ctx) => html` <div id="calendar">
  <h2 id="sub-title">My workouts</h2>
  <div class="month">
    <ul class="ul-calendar">
      <button class="hitbox prev">
        <li class="li-calendar prev" @click=${changeToPrevMonth}>&#10094;</li>
      </button>
      <button class="hitbox next">
        <li class="li-calendar next" @click=${changeToNextMonth}>&#10095;</li>
      </button>
      <li id="month-header">
        <div>
          <p id="monthHeaderName" class="month-year-header">
            ${generateMonthAndYear().month}
          </p>
          <p id="yearHeaderName" class="month-year-header">
            ${generateMonthAndYear().year}
          </p>
        </div>
      </li>
    </ul>
  </div>
  <div class="days">
    <ul class="weekday">
      <li>Mon</li>
      <li>Tue</li>
      <li>Wed</li>
      <li>Thu</li>
      <li>Fri</li>
      <li>Sat</li>
      <li>Sun</li>
    </ul>
    <ul class="dates" @click=${selectActiveDate}>
      ${prevMonthDates.map((d) =>
        dateTemplate(d, false, ["not-curr-month", "prev-month"])
      )}
      ${currMonthDates.map((d) => dateTemplate(d, true, ["curr-month"]))}
      ${nextMonthDates.map((d) =>
        dateTemplate(d, false, ["not-curr-month", "next-month"])
      )}
    </ul>
    <div
      id="popup"
      style=${styleMap(
        ctx.userData ? { display: "block" } : { display: "none" }
      )}
    ></div>
  </div>
</div>`;
const dateTemplate = (num, isCurrMonth, liClassArr) => {
  num === currDate.getDate() && isCurrMonth ? liClassArr.push("active") : null;
  return html`
    <li id=${isCurrMonth ? num : null} class=${liClassArr.join(" ")}>${num}</li>
  `;
};
export function showCalendar(ctx) {
  generateDates();
  ctx.render(calendarTemplate(ctx));
  showPopupOnSelectedDate();
}
export function getActiveDateParams() {
  let activeDay = document.querySelector(".active").id;
  console.log(activeDay)
  activeDay = Number(activeDay);
  //check for invalid id (if for example user had modified it with inspector)
  try {
    if (Number.isNaN(activeDay) || activeDay > 31 || activeDay < 0) {
      throw new Error("Couldn\t get active date!");
    }
    return { day: activeDay, month: monthUsrIsOn, year: yearUsrIsOn };
  } catch (err) {
    alert(err.message);
  }
}
