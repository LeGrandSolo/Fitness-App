import { getFormData, post } from "../api/api.js";
import { html, render } from "../api/lib.js";
import { changeToNextMonth, changeToPrevMonth } from "./changeMonth.js";

const popupTemplate = (onSubmit, exercises) => html`
  <form @submit=${onSubmit}>
    <label for="exercise-name">Exercise Name :</label>
    <input type="text" name="exercise-name" />
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
    </table>
  </div>
`;
const exerciseCard = (exercise) => html`
  <tr>
    <td>${exercise.name}</td>
    <td>${exercise.sets}</td>
    <td>${exercise.repetitions}</td>
    <td>${exercise.intensity}</td>
  </tr>
`;
function showPopupOnSelectedDateAndFetchData(e) {
  /* const url = "/classes/Exercises";
  const res = await get("/classes/Exercises"); */
  const popupDiv = document.getElementById("popup");
  popupDiv.style.display = "block";
  render(popupTemplate(onSubmit), popupDiv);
  function onSubmit(ev) {
    const data = getFormData(ev);
    console.log(data);
  }
  /*   const input = document.createElement("input");
  const btn = document.createElement("button");
  const popup = document.querySelector("#popup");
  btn.style.width = "1em";
  btn.style.height = "1em";
  while (popup.childNodes[2]) {
    popup.childNodes[2].remove();
  }
  let ul;
  if (typeof e === "number") {
    ul = dateData[e];
  } else {
    ul = dateData[e.target.textContent];
  }
  btn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = input.value;
    li.style.display = "block";
    let dateDataKey;
    if (typeof e === "number") {
      dateDataKey = e;
    } else {
      dateDataKey = e.target.textContent;
    }
    ul = dateData[dateDataKey];
    ul.appendChild(li);
    dateData[dateData] = ul;
  });
  popup.append(input, btn);
  popup.appendChild(ul);
  popup.style.display = "block";  */
}
function selectActiveDate(e) {
  const prevActive = document.getElementById("active");
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
        prevActive.id = "";
        e.target.id = "active";
        showPopupOnSelectedDateAndFetchData(e);
      }
    }
  }
}
export {
  selectActiveDate,
  showPopupOnSelectedDateAndFetchData as showPopupOnSelectedDate,
};
