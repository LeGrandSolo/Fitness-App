import { html } from "../api/lib.js";

const homeTemplate = () => html`<h2>Home</h2>`;
export function showHome(ctx) {
  ctx.render(homeTemplate());
}
