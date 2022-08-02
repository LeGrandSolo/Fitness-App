import { render, page, html, styleMap } from "./api/lib.js";
import { getUserData } from "./api/util.js";
import { showCalendar } from "./calendarView/calendarMain.js";
import { showExercise } from "./exerciseView/excerciseMain.js";
import { onLogout, showLogin, showRegister } from "./homeView/users.js";

const header = document.querySelector("header");
const main = document.querySelector("main");

const navTemplate = (onLogout) => html` <h1>
    <a href="/" id="title">Be Healthier!</a>
  </h1>
  <nav>
    <ul class="ul-global">
      <li class="li-global"><a href="/my-workouts/8">My workouts</a></li>
      <li class="li-global">
        <a href="/excercises">Learn new skills</a>
      </li>
      <span
        id="guest"
        style=${styleMap(
          getUserData() ? { display: "none" } : { display: "inline" }
        )}
        ><li class="li-global">
          <a href="/login">Login</a>
        </li>
        <li class="li-global">
          <a href="/register">Register</a>
        </li></span
      >
      <span
        id="user"
        style=${styleMap(
          getUserData() ? { display: "inline" } : { display: "none" }
        )}
        ><li class="li-global">
          <a href="javascript:void(0)" @click=${onLogout}>Logout</a>
        </li></span
      >
    </ul>
  </nav>`;

page(decorateCtx);
page("/index.html", "/");
page("/my-workouts/:month", showCalendar);
page('/', showCalendar)
page("/login", showLogin);
page("/register", showRegister);
page("/excercises", showExercise);
page.start();

function renderMain(template) {
  render(template, main);
}

function decorateCtx(ctx, next) {
  render(navTemplate(onLogout), header);
  ctx.render = renderMain;
  next();
}
