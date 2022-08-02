import { html } from "../api/lib.js";

const homeTemplate = () => html` <h1>This is home view!</h1> `;
 
export function showHome(ctx) {
    ctx.render(homeTemplate())
}