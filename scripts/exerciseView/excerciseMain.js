import { get } from "../api/api.js";
import { html, repeat } from "../api/lib.js";
import { onSubmitNewExercise } from "../backendInteractions/data.js";

const exerciseViewTemplate = (exercises, onSubmit) => html`
  <div id="exercises">
  <form @submit=${onSubmit}>
    <label for="name">Exercise Name</label>
    <input type="text" name="name" id="name" />
    <label for="sets">Target Area</label>
    <input type="text" name="area" id="area" />
    <label for="reps">Target Muscles</label>
    <input type="text" name="muscles" id="muscles" />
    <label for="note">Note</label>
    <input type="text" name="note" id="note" />
    <input type="submit" value=" Sumbit " />
  </form>
    <ul>
      ${repeat(exercises, (e) => e.objectId, exerciseCard)}
    </ul>
  </div>
`;

const exerciseCard = (exercise) =>
  html` <li>
    <p>${exercise.name} - Sets ${exercise.sets}, Reps ${exercise.reps}</p>
  </li>`;
export async function showExercise(ctx) {
  const url = "/Exercise";
  const exercises = (await get(url)).results;
  ctx.render(exerciseViewTemplate(exercises, onSubmitNewExercise));
}
