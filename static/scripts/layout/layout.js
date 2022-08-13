import { html, styleMap } from "../api/lib.js";
import { getUserData } from "../api/util.js";

export const layoutTemplate = (ctx, template) => html` <header>
    <h1>
      <a href="/" id="title">Be Healthier!</a>
    </h1>
    <nav>
      <ul class="ul-global">
        <li class="li-global"><a href="/my-workouts/8">My workouts</a></li>
        <li class="li-global">
          <a href="/excercises">Learn new skills</a>
        </li>
        <span
          id="guest"
          style=${styleMap(
            ctx.userData ? { display: "none" } : { display: "inline" }
          )}
          ><li class="li-global">
            <a href="/login">Login</a>
          </li>
          <li class="li-global">
            <a href="/register">Register</a>
          </li></span
        >
        <span
          id="user"
          style=${styleMap(
            ctx.userData ? { display: "inline" } : { display: "none" }
          )}
          ><li class="li-global">
            <a href="javascript:void(0)" @click=${ctx.logout}>Logout</a>
          </li></span
        >
      </ul>
    </nav>
  </header>
  <main>${template}</main>`;
