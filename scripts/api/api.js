//import { getUserData } from "./util.js";

//const host = "http://localhost:3030";
export function getFormData(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const asObj = Object.fromEntries(formData.entries());
  return asObj;
}
/* export async function request(method, url, data) {
  const userData = getUserData();
  const options = {
    method,
    headers: {},
  };
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }
  try {
    const res = await fetch(host + url, options);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    if (res.status == 204) {
      return res;
    }
    return await res.json();
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
export async function get(url) {
  return await request("GET", url);
}
export async function put(url, data) {
  return await request("PUT", url, data);
}
export async function post(url, data) {
  return await request("POST", url, data);
}
export async function deleteReq(url) {
  return await request("DELETE", url);
}
 */