import decode from "jwt-decode";

export function accountProperties() {
  const userToken = localStorage.getItem("user");
  if (userToken) {
    return decode(userToken);
  }
  return;
}
