// Initialize Parse
Parse.initialize(
  "eJEDc1Sgrs3G8Oksyr4UMNasfBOuKBne42VsgF5t",
  "UtloqsDQi2YxrVWpXyz3pBvmLYhdfa5zmND3IOb0"
);
async function createNewUser(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("pass"),
  };
  const usr = new Parse.User();
  usr.set("email", data.email);
  usr.set("username", data.username);
  usr.set("password", data.password);
  try {
    await usr.save();
    alert("Welcome!");
  } catch (e) {
    alert(`Error: ${e.message}`);
  }
}
document.querySelector("form").addEventListener("submit", createNewUser);
Parse.serverURL = "https://parseapi.back4app.com/";
