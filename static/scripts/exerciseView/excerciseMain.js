import { get } from "../api/api.js";
import { html, render } from "/static/node_modules/lit-html/lit-html.js";
import { repeat } from "/static/node_modules/lit-html/directives/repeat.js";
import { onSubmitNewExercise } from "../backendInteractions/data.js";
import { calendarTemplate } from "../calendarView/calendarMain.js";
import { showPopupOnSelectedDate } from "../calendarView/datePopup.js";
import { generateDates } from "../calendarView/generateDates.js";

const showForm = (ev) => {
  ev.preventDefault();
  const form = document.getElementById("exercise-form");
  const showHideBtn = document.getElementById("show-hide-btn");
  //check if add exercise form is rendered
  if (document.getElementById("name")) {
    render(html``, form);
    showHideBtn.textContent = "Add new exercise";
  } else {
    render(addNewExerciseTemplate(), form);
    showHideBtn.textContent = "Hide input fields";
  }
};

const myExercisesViewTemplate = (ctx, exercises, onSubmit) => html`
  <form @submit=${onSubmit} id="exercise-form">
    <button @click=${showForm} id="show-hide-btn">Add new exercise</button>
  </form>
  <div id="exercises">
    <ul>
      ${repeat(
        exercises,
        (e) => e.objectId,
        (e) => exerciseCard(ctx, e)
      )}
    </ul>
  </div>
`;
export const addNewExerciseTemplate = () => html`
  <div id="exercise-form-data">
    <h3>Add new exercise</h3>
    <label for="name">Exercise Name</label>
    <input type="text" name="name" id="name" />
    <label for="sets">Target Area</label>
    <input type="text" name="area" id="area" />
    <label for="reps">Target Muscles</label>
    <input type="text" name="muscles" id="muscles" />
    <label for="note">Note</label>
    <input type="text" name="note" id="note" />
    <input type="submit" value=" Add exercise " />
  </div>
`;
const exerciseDetailsCard = (exercise, instances) => html`
  <div id="exercise-details">
    <h3>${exercise.name}</h3>
    <ul>
      ${repeat(instances, (inst) => inst.objectId, instanceCard)}
    </ul>
  </div>
`;
const instanceCard = (instance) => {
  const instanceDate = new Date(instance.date.iso);
  const currDate = new Date()
  return html`
    <li class="instance">
      <p>
        ${String(instanceDate.getDate()).length === 1
          ? "0" + instanceDate.getDate()
          : instanceDate.getDate()}-${String(instanceDate.getMonth() + 1)
          .length === 1
          ? "0" + (instanceDate.getMonth() + 1)
          : instanceDate.getMonth() + 1}-${instanceDate.getFullYear()}
          <span>(${Math.floor((currDate - instanceDate) /(1000*3600*24))} days ago)</span>
      </p>
      <p>Reps ${instance.reps}, Sets ${instance.sets}</p>
      <button @click=${cal}> click</button>
      <div id="instance-calendar" >
      </div>
    </li>
  `;
};
function cal() {
  const div = document.getElementById("instance-calendar")
  generateDates();
  render(calendarTemplate(),div );
  showPopupOnSelectedDate();
}
const exerciseCard = (ctx, exercise) =>
  html` <li>
    <h3
      @click=${() => getExerciseData(ctx, exercise)}
      id="exercise-details-head"
    >
      ${exercise.name}
    </h3>
  </li>`;
async function getExerciseData(ctx, exercise) {
  const instances = [];
  for (const instanceId of exercise.instances) {
    const instQuaryObj = {
      objectId: instanceId,
    };
    const instQuary = "/DoneExercise?where=" + JSON.stringify(instQuaryObj);
    const instance = (await get(instQuary)).results[0];
    instances.push(instance);
  }
  ctx.render(exerciseDetailsCard(exercise, instances));
}
export async function showExerciseView(ctx) {
  const url = "/Exercise";
  const exercises = (await get(url)).results;
  ctx.render(myExercisesViewTemplate(ctx, exercises, onSubmitNewExercise));
}
