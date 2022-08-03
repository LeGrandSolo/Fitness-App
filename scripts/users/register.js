import { html } from "../api/lib.js";
import { getFormData, post } from "../api/api.js";
import { setUserData } from "../api/util.js";

const registerTemplate = (onRegister) => html`
  <div class="user-form">
    <h3>Register</h3>
    <form @submit=${onRegister}>
      <label for="email">Email: </label
      ><input type="email" name="email" id="email" />
      <label for="username">Username: </label
      ><input type="text" name="username" id="username" />
      <label for="password">Password: </label
      ><input type="password" name="password" id="password" />
      <label for="repass">Confirm password: </label
      ><input type="password" name="repass" id="repass" />
      <input type="submit" id="submit" value="Register" />
    </form>
  </div>
`;

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
      const userData = {
        username: sentData.username,
        id:res.ownerId,
        sessionToken: res.sessionToken,
      };
      setUserData(userData);
      page.redirect("/");
    } catch (err) {
      alert(err);
    }
  }
}
