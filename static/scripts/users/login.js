import { get, getFormData, post } from "../api/api.js";
import { html, page } from "../api/lib.js";
import { clearUserData, setUserData } from "../api/util.js";
import { monthUsrIsOn, yearUsrIsOn } from "../calendarView/changeMonth.js";

const loginTemplate = (onLogin) => html` <div class="user-form">
  <h3>Login</h3>
  <form @submit=${onLogin}>
    <label for="username">Username: </label
    ><input type="text" name="username" id="username" />
    <label for="password">Password: </label
    ><input type="password" name="password" id="password" />
    <input type="submit" id="submit" value="Login" />
  </form>
</div>`;

export function showLogin(ctx) {
  ctx.render(loginTemplate(onLogin));
  async function onLogin(ev) {
    let url = "/login";
    try {
      const formData = getFormData(ev);
      Object.values(formData).map((v) => {
        if (v === "") {
          throw new Error("All fields are required!");
        }
      });
      let loginQuary = `?username=${formData.username}&password=${formData.password}`;
      loginQuary = encodeURI(loginQuary);
      url += loginQuary;
      const res = await get(url, formData);
      const userData = {
        username: formData.username,
        id: res.objectId,
        sessionToken: res.sessionToken,
      };
      setUserData(userData);
      page.redirect(`/my-workouts/${monthUsrIsOn}-${yearUsrIsOn}`);
    } catch (err) {
      alert(err);
    }
  }
}
export async function onLogout(ev) {
  ev.preventDefault();
  post("/logout");
  clearUserData();
  page.redirect("/");
}
