import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAllProviders,
  addProvider,
  editProvider,
  deleteProvider,
  deleteEmployeeCertification,
  getAllByProvider,
  addEmployeeCertificate,
  editEmployeeCertificate,
};

function getAllProviders() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/certification/provider`, requestOptions).then(
    handleResponse
  );
}

function getAllByProvider(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/allByProvider`, requestOptions).then(
    handleResponse
  );
}

function addProvider(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/provider`, requestOptions).then(
    handleResponse
  );
}
function addEmployeeCertificate(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/employee`, requestOptions).then(
    handleResponse
  );
}

function editProvider(body) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/provider`, requestOptions).then(
    handleResponse
  );
}

function editEmployeeCertificate(body) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/employee`, requestOptions).then(
    handleResponse
  );
}

function deleteProvider(body) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/provider`, requestOptions).then(
    handleResponse
  );
}

function deleteEmployeeCertification(body) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/employee`, requestOptions).then(
    handleResponse
  );
}

// --------------------------Certifications----------------------------------

// function deleteProvider(body) {
//   const requestOptions = {
//     method: "GET",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   };

//   return fetch(`${apiUrl}/certification/all`, requestOptions).then(
//     handleResponse
//   );
// }
