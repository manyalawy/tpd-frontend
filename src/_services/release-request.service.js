import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/release-request/all`, requestOptions).then(
    handleResponse
  );
}

function getById(reference_number) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ reference_number: reference_number }),
  };

  return fetch(`${apiUrl}/release-request`, requestOptions).then(
    handleResponse
  );
}

function create(releaseRequest) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(releaseRequest),
  };

  return fetch(`${apiUrl}/release-request`, requestOptions).then(
    handleResponse
  );
}

function update(releaseRequest) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(releaseRequest),
  };

  return fetch(`${apiUrl}/release-request`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(reference_number) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ reference_number: reference_number }),
  };

  return fetch(`${apiUrl}/release-request`, requestOptions).then(
    handleResponse
  );
}
