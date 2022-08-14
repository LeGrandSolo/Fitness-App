import { get } from "../api/api.js";
import { html, render } from "/static/node_modules/lit-html/lit-html.js";
import { repeat } from "/static/node_modules/lit-html/directives/repeat.js";
import { until } from "/static/node_modules/lit-html/directives/until.js";
import {
  getExercises,
  onSubmitExerciseInstance,
  onSubmitNewExercise,
} from "../backendInteractions/data.js";
import { addNewExerciseTemplate } from "../exerciseView/excerciseMain.js";
import { retrieveCurrUser } from "../users/retrieveCurrUser.js";
import { getActiveDateParams } from "./calendarMain.js";
import { monthUsrIsOn, yearUsrIsOn } from "./changeMonth.js";

export const popupTemplate = (exercisesInstancesPromise) => html`
  <div id="form"></div>
  <div id="date-exercises">
    <table>
      <tr>
        <th>Exercise</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Intensity</th>
        <th>Note</th>
      </tr>
      ${until(
        exercisesInstancesPromise,
        html`<tr id="loading">
          Loading...
        </tr>`
      )}
    </table>
  </div>
`;

let userId;
const formTemplate = (onSubmit, exercises, addNewInfoTemplate) => html`<form
  @submit=${onSubmit}
>
  <label for="name" id="nameLabel">Name</label>
  <select name="name" id="name" @change=${showNewExerciseForm}>
    ${repeat(exercises, (e) => e.objectId, optionCard)}
    <option id="add-new">Add New</option>
  </select>
  <div id="add-info">${addNewInfoTemplate()}</div>
</form>`;

const optionCard = (exercise) =>
  html`<option .value=${exercise.objectId} selected>${exercise.name}</option>`;
const addNewInsanceTemplate = () => html`<div id="new-instance-info">
  <label for="sets">Sets</label>
  <input type="text" name="sets" id="sets" />
  <label for="reps">Reps</label>
  <input type="text" name="reps" id="reps" />
  <label for="intensity">Intensity</label>
  <input type="text" name="intensity" id="intensity" />
  <label for="note">Note</label>
  <input type="text" name="note" id="note" />
  <input type="submit" value=" Sumbit " />
</div>`;
export const exerciseInstanceCard = (exercise) => html`
  <tr>
    <td>${exercise.name}</td>
    <td>${exercise.sets}</td>
    <td>${exercise.reps}</td>
    <td>${exercise.intensity}</td>
    <td>${exercise.note}</td>
  </tr>
`;

async function showForm(createsNewExercise) {
  const formDiv = document.getElementById("form");
  const exercises = (await get("/Exercise")).results;
  render(
    formTemplate(
      createsNewExercise
        ? (ev) => onSubmitNewExerciseOnCalendar(ev, userId)
        : (ev) => onSubmitExerciseInstance(ev, userId),
      exercises,
      createsNewExercise ? addNewExerciseTemplate : addNewInsanceTemplate
    ),
    formDiv
  );
}

function showNewExerciseForm() {
  if (this.options[this.selectedIndex].id === "add-new") {
    showForm(true);
  } else {
    showForm(false);
  }
}

async function onSubmitNewExerciseOnCalendar(ev, userId) {
  const newOption = await onSubmitNewExercise(ev, userId);
  showForm();
}
export async function showPopupOnSelectedDate() {
  const popupDiv = document.getElementById("popup");
  const currDate = new Date(
    `${yearUsrIsOn}-${monthUsrIsOn + 1}-${getActiveDateParams().day}`
  ).toISOString();
  try {
    userId = (await retrieveCurrUser())?.objectId;
  } catch (err) {}
  let url = "/DoneExercise";
  const filter = {
    user: {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    },
    date: {
      $gte: {
        __type: "Date",
        iso: currDate.substring(0, currDate.indexOf("T")) + "T00:00:00.000Z",
      },
      $lte: {
        __type: "Date",
        iso: currDate.substring(0, currDate.indexOf("T")) + "T23:59:59.000Z",
      },
    },
  };
  //filter only current user exercises and done on that day
  let quary = "?where=" + JSON.stringify(filter);
  quary = encodeURI(quary);
  url += quary;
  console.log(url);
  try {
    const exerciseInstances = getExercises(url, exerciseInstanceCard);
    render(
      //change form depending on desired action
      popupTemplate(exerciseInstances),
      popupDiv
    );
    showForm();
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
