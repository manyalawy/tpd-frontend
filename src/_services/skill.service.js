import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAllCategories,
  getAllSubcategories,
  getAllSkills,
};

function getAllSubcategories(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/subcategories`, requestOptions).then(
    handleResponse
  );
}

function getAllCategories() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/skill/categories`, requestOptions).then(
    handleResponse
  );
}

function getAllSkills(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/`, requestOptions).then(handleResponse);
}
