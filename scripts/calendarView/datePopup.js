import { get } from "../api/api.js";
import { render, html, repeat, until } from "../api/lib.js";
import {
  getExercises,
  onSubmitExerciseInstance,
  onSubmitNewExercise,
} from "../backendInteractions/data.js";
import { addNewExerciseTemplate } from "../exerciseView/excerciseMain.js";
import { retrieveCurrUser } from "../users/retrieveCurrUser.js";
import { getActiveDateParams } from "./calendarMain.js";
import { monthUsrIsOn, yearUsrIsOn } from "./changeMonth.js";

export const popupTemplate = (
  onSubmit,
  exercisesInstancesPromise,
  exercises,
  addNewInfoFunction
) => html`
  <form @submit=${onSubmit}>
    <label for="name" id="nameLabel">Name</label>
    <select
      name="name"
      id="name"
      @change=${showNewExerciseForm}
    >
      ${repeat(exercises, (e) => e.objectId, optionCard)}
      <option id="add-new">Add New</option>
    </select>
    <div id="add-info">${addNewInfoFunction()}</div>
  </form>
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

const optionCard = (exercise) =>
  html`<option .value=${exercise.objectId}>${exercise.name}</option>`;
export const exerciseInstanceCard = (exercise) => html`
  <tr>
    <td>${exercise.name}</td>
    <td>${exercise.sets}</td>
    <td>${exercise.reps}</td>
    <td>${exercise.intensity}</td>
    <td>${exercise.note}</td>
  </tr>
`;

function showNewExerciseForm() {
  if (this.options[this.selectedIndex].id === 'add-new') {
    showPopupOnSelectedDate(true)
  }
}

export async function showPopupOnSelectedDate(createsNewExercise) {
  const popupDiv = document.getElementById("popup");
  const currDate = new Date(
    `${yearUsrIsOn}-${monthUsrIsOn + 1}-${getActiveDateParams().day}`
  ).toISOString();
  let userId;
  try {
    userId = (await retrieveCurrUser())?.objectId;
  } catch (err) {}
  let url = "/DoneExercises";
  const obj = {
    user: {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    },
    date: {
      __type: "Date",
      iso: currDate,
    },
  };
  //filter only current user exercises and done on that day
  let quary = "?where=" + JSON.stringify(obj);
  quary = encodeURI(quary);
  url += quary;
  try {
    const exercises = (await get("/Exercise")).results;
    const exerciseInstances = getExercises(url, exerciseInstanceCard);
    render(
      popupTemplate(
        (ev) => onSubmitExerciseInstance(ev, userId),
        exerciseInstances,
        exercises,(createsNewExercise?addNewExerciseTemplate:addNewInsanceTemplate)
      ),
      popupDiv
    );
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
const addNewInsanceTemplate = () => html`<div id="new-instance-info">
  <label for="sets">Sets</label>
  <input type="text" name="sets" id="sets" />
  <label for="reps">Reps</label>
  <input type="text" name="reps" id="reps" />
  <label for="note">Note</label>
  <input type="text" name="note" id="note" />
  <input type="submit" value=" Sumbit " />
</div>`;
//TODO do not reload all exercises when add-new is selected