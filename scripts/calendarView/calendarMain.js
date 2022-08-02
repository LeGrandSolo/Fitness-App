import { html } from "../api/lib.js";
import {
  currDate,
  generateMonthAndYear,
  changeToPrevMonth,
  changeToNextMonth,
} from "./changeMonth.js";
import { selectActiveDate, showPopupOnSelectedDate } from "./modifySelectedDateInfo.js";
import {
  prevMonthDates,
  currMonthDates,
  nextMonthDates,
  generateDates,
} from "./generateDates.js";

const calendarTemplate = () => html` <h2 id="sub-title">My workouts</h2>
  <div id="calendar">
    <div class="month">
      <ul class="ul-global">
        <button class="hitbox prev">
          <li class="li-global prev" @click=${changeToPrevMonth}>&#10094;</li>
        </button>
        <button class="hitbox next">
          <li class="li-global next" @click=${changeToNextMonth}>&#10095;</li>
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
      <div id="popup">
      </div>
    </div>
  </div>`;
const dateTemplate = (num, isCurrMonth, liClassArr) => html`
  <li
    id=${num === currDate.getDate() && isCurrMonth ? "active" : null}
    class=${liClassArr.join(" ")}
  >
    ${num}
  </li>
`;
export function showCalendar(ctx) {
  generateDates();
  ctx.render(calendarTemplate());
  showPopupOnSelectedDate()
}
