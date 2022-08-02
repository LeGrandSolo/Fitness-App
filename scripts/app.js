import { render, page } from "./api/lib.js";
import { showCalendar } from "./calendarView/calendarMain.js";
import { showExercise } from "./exerciseView/excerciseMain.js";
import { showHome } from "./homeView/homeMain.js";

const main = document.querySelector("main");

page(decorateCtx);
page("/index.html", "/");
page("/my-workouts/:month", showCalendar);
page("/", showHome);
page("/excercises", showExercise);
page.start();

function renderMain(template) {
  render(template, main);
}

function decorateCtx(ctx, next) {
  ctx.render = renderMain;
  next();
}
