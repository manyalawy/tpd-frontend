import isTokenExpired from "./isTokenExpired";

export function authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        if (!isTokenExpired(user)) return { Authorization: user };
    } else {
        return {};
    }
}
