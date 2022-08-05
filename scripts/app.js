import { render, page, html, styleMap } from "./api/lib.js";
import { getUserData } from "./api/util.js";
import { showCalendar } from "./calendarView/calendarMain.js";
import { showExercise } from "./exerciseView/excerciseMain.js";
import { layoutTemplate } from "./layout/layout.js";
import { onLogout, showLogin } from "./users/login.js";
import { showRegister } from "./users/register.js";

const body = document.querySelector("body");

page(decorateCtx);
page("/index.html", "/");
page("/my-workouts/:month", showCalendar);
page("/", showCalendar);
page("/login", showLogin);
page("/register", showRegister);
page("/excercises", showExercise);
page.start();

function renderMain(ctx, template) {
  render(layoutTemplate(ctx, template), body);
}

function decorateCtx(ctx, next) {
  ctx.logout = onLogout;
  ctx.userData = getUserData();
  ctx.render = renderMain.bind(null, ctx);
  next();
}
