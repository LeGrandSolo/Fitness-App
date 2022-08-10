import { getUserData } from "./util.js";

export function getFormData(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const asObj = Object.fromEntries(formData.entries());
  return asObj;
}
export async function request(method, url, data) {
  let host = "https://parseapi.back4app.com";
  const userData = getUserData();
  const options = {
    method,
    headers: {
      "X-Parse-Application-Id": "eJEDc1Sgrs3G8Oksyr4UMNasfBOuKBne42VsgF5t",

      "X-Parse-REST-API-Key": "VlQKadGc11LdggQFbvusq0ZOGA6Klls7BPaxEncQ",
    },
  };
  if (
    url.split("/")[1] === "users" ||
    url.split("/")[1].split("?")[0] === "login"
  ) {
    options.headers["X-Parse-Revocable-Session"] = "1";
  } else if (url.split("/")[1] !== "logout") {
    host += "/classes";
  }
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  if (userData) {
    options.headers["X-Parse-Session-Token"] = userData.sessionToken;
  }
  try {
    const res = await fetch(host + url, options);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error);
    }
    return await res.json();
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
export function get(url) {
  return request("GET", url);
}
export function put(url, data) {
  return request("PUT", url, data);
}
export async function post(url, data) {
  return await request("POST", url, data);
}
export function deleteReq(url) {
  return request("DELETE", url);
}
