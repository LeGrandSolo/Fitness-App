import {render } from "/static/node_modules/lit-html/lit-html.js";
import page from "/static/node_modules/page/page.mjs";
import { getUserData } from "./api/util.js";
import { showCalendar } from "./calendarView/calendarMain.js";
import { showExerciseView } from "./exerciseView/excerciseMain.js";
import { showHome } from "./home/home.js";
import { layoutTemplate } from "./layout/layout.js";
import { onLogout, showLogin } from "./users/login.js";
import { showRegister } from "./users/register.js";

const body = document.querySelector("body");

page(decorateCtx);
page("/static/index.html", "/");
page("/my-workouts/:month", showCalendar);
page("/", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/excercises", showExerciseView); 
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
