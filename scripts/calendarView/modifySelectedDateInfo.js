import { get, getFormData, post } from "../api/api.js";
import { html, render, repeat } from "../api/lib.js";
import { getUserData } from "../api/util.js";
import { getActiveDateParams } from "./calendarMain.js";
import {
  changeToNextMonth,
  changeToPrevMonth,
  monthUsrIsOn,
  yearUsrIsOn,
} from "./changeMonth.js";

const popupTemplate = (onSubmit, exercises) => html`
  <form @submit=${onSubmit}>
    <label for="name">Exercise Name :</label>
    <input type="text" name="name" id="name" />
    <label for="sets">Sets :</label>
    <input type="text" name="sets" id="sets" />
    <label for="reps">Reps :</label>
    <input type="text" name="reps" id="reps" />
    <input type="submit" />
  </form>
  <div id="date-exercises">
    <table>
      <tr>
        <th>Exercise</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Intensity</th>
      </tr>
      ${repeat(exercises, (e) => e.objectId, renderActiveDayExercises)}
    </table>
  </div>
`;
const exerciseCard = (exercise) => html`
  <tr>
    <td>${exercise.name}</td>
    <td>${exercise.sets}</td>
    <td>${exercise.reps}</td>
    <td>${exercise.intensity}</td>
  </tr>
`;

function selectActiveDate(e) {
  const prevActive = document.querySelector(".active");
  if (e.target.nodeName === "LI") {
    if (e.target.className === "curr-month") {
      checkPrevActive(e);
    } else if (e.target.className === "prev-month") {
      changeToPrevMonth();
      checkPrevActive(e);
    } else if (e.target.className === "next-month") {
      changeToNextMonth();
      checkPrevActive(e);
    }
    function checkPrevActive(e) {
      if (prevActive !== e.target) {
        prevActive.classList.remove("active");
        e.target.classList.add("active");
        showPopupOnSelectedDate(e);
      }
    }
  }
}
async function showPopupOnSelectedDate(e) {
  const currDate = new Date(
    `${yearUsrIsOn}-${monthUsrIsOn + 1}-${getActiveDateParams().day}`
  ).toISOString();
  window.currDate = currDate;
  let url = "/DoneExercises";
  const obj = {
    user: {
      __type: "Pointer",
      className: "_User",
      objectId: "IqXzgLbPYG",
    },
    date: {
      __type: "Date",
      iso: currDate,
    },
  };
  //filter only current user exercises and done on that day
  let quary = "?where=" + JSON.stringify(obj);
  quary = encodeURI(quary);
  //console.log(obj.date);
  url += quary;
  const popupDiv = document.getElementById("popup");
  try {
    const exercises = (await get(url)).results;
    render(popupTemplate(onSubmit, exercises), popupDiv);
    console.log(exercises);
  } catch (err) {
    alert(err);
  }
  async function onSubmit(ev) {
    const url = "/DoneExercises";
    try {
      const formData = getFormData(ev);
      const sentData = {
        name: formData.name,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        date: {
          __type: "Date",
          iso: currDate,
        },
      };
      await post(url, sentData);
    } catch (err) {
      alert(err);
    }
  }
}

function renderActiveDayExercises(exercise) {
  return exerciseCard(exercise.exercise);
}
export { selectActiveDate, showPopupOnSelectedDate as showPopupOnSelectedDate };
