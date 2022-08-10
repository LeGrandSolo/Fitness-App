import { get } from "../api/api.js";
import { html, render, repeat } from "../api/lib.js";
import { onSubmitNewExercise } from "../backendInteractions/data.js";

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

const myExercisesViewTemplate = (exercises, onSubmit) => html`
  <form @submit=${onSubmit} id="exercise-form">
    <button @click=${showForm} id="show-hide-btn">Add new exercise</button>
  </form>
  <div id="exercises">
    <ul>
      ${repeat(exercises, (e) => e.objectId, exerciseCard)}
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
const exerciseCard = (exercise) =>
  html` <li @click=${() => showExerciseDetails(exercise.objectId)}>
    <h3>${exercise.name}</h3>
  </li>`;
async function showExerciseDetails(exerciseId) {
  const quaryObj = {
    objectId: exerciseId,
  };
  const quary = "/Exercise?where=" + JSON.stringify(quaryObj);
  const exercise = (await get(quary)).results[0];
  for (const instanceId of exercise.instances) {
    const instQuaryObj = {
      objectId: instanceId,
    };
    const instQuary = "/Exercise?where=" + JSON.stringify(instQuaryObj);
    const instance = (await get(instQuary)).results[0];
  }
  console.log(exercise);
}
export async function showExerciseView(ctx) {
  const url = "/Exercise";
  const exercises = (await get(url)).results;
  ctx.render(myExercisesViewTemplate(exercises, onSubmitNewExercise));
}
