import { get, getFormData, post } from "../api/api.js";
import { html, page } from "../api/lib.js";
import { clearUserData, setUserData } from "../api/util.js";

const registerTemplate = (onRegister) => html`
  <h3>Register</h3>
  <form @submit=${onRegister}>
    <label>Email: <input type="email" name="email" id="email" /></label>
    <label>Username: <input type="text" name="username" id="username" /></label>
    <label
      >Password: <input type="password" name="password" id="password"
    /></label>
    <label
      >Confirm password: <input type="password" name="repass" id="repass"
    /></label>
    <label>Submit: <input type="submit" /></label>
  </form>
`;

const loginTemplate = (onLogin) => html`<h3>Login</h3>
  <form @submit=${onLogin}>
    <label>Username: <input type="text" name="username" id="username" /></label>
    <label
      >Password: <input type="password" name="password" id="password"
    /></label>
    <label>Submit: <input type="submit" /></label>
  </form>`;
export function showRegister(ctx) {
  ctx.render(registerTemplate(onRegister));
  async function onRegister(ev) {
    const url = "/users";
    try {
      const formData = getFormData(ev);
      Object.values(formData).map((v) => {
        if (v === "") {
          throw new Error("All fields are required!");
        }
      });
      if (formData.password !== formData.repass) {
        throw new Error("Passwords don't match!");
      }
      const sentData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      const res = await post(url, sentData);
      setUserData({ sessionToken: res.sessionToken });
      page.redirect("/");
    } catch (err) {
      alert(err);
    }
  }
}
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
      let loginQuary = `?username=${encodeURIComponent(
        formData.username
      )}&password=${encodeURIComponent(formData.password)}`;
      url += loginQuary;
      const res = await get(url, formData);
      setUserData({ sessionToken: res.sessionToken });
      page.redirect("/");
    } catch (err) {
      alert(err);
    }
  }
}
export async function onLogout(ev) {
  ev.preventDefault();
  await post("/logout");
  clearUserData();
  page.redirect("/");
}
