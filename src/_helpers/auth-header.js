export function authHeader() {
  // return authorization header with jwt token if user is logged in
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
}
