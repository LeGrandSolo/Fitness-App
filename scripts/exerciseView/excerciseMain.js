import { html } from "../api/lib.js";

const exerciseViewTemplate = () => html` <h1>This is home view!</h1> `;
 
export function showExercise(ctx) {
    ctx.render(exerciseViewTemplate())
}