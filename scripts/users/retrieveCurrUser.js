import { get } from "../api/api.js";

export function retrieveCurrUser() {
    const url = "/users/me";
    return get(url);
}

