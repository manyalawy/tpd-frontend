import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAllCategories,
  getAllSubcategories,
  getAllSkills,
  addSkill,
  editSkill,
  addEmployeeSkill,
  deleteEmployeeSkill,
  editEmployeeSkill,
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

function getAllSkills() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/skill/`, requestOptions).then(handleResponse);
}

function addSkill(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function editSkill(body) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/`, requestOptions).then(handleResponse);
}

function editEmployeeSkill(body) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/employee`, requestOptions).then(handleResponse);
}

function addEmployeeSkill(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/employee`, requestOptions).then(handleResponse);
}

function deleteEmployeeSkill(body) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/skill/employee`, requestOptions).then(handleResponse);
}
