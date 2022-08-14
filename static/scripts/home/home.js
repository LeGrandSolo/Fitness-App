import { html} from "/static/node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`<h2>Home</h2>`;
export function showHome(ctx) {
  ctx.render(homeTemplate());
}
