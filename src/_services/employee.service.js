import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAll,
  getAllTitles,
  getAllFunctions,
  getAllNames,
};

function getAll(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/employee-profile/all`, requestOptions).then(
    handleResponse
  );
}

function getAllTitles() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/employee-profile/titles`, requestOptions).then(
    handleResponse
  );
}

function getAllFunctions() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/employee-profile/functions`, requestOptions).then(
    handleResponse
  );
}
function getAllNames() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/employee-profile/names`, requestOptions).then(
    handleResponse
  );
}
