import { get } from "../api/api.js";
import { html, repeat } from "../api/lib.js";

const exerciseViewTemplate = (exercises) => html`
  <div id="exercises">
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
  const url = "/Exercises";
  const exercises = (await get(url)).results;
  ctx.render(exerciseViewTemplate(exercises));
}
