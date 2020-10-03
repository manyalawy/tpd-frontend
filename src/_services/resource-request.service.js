import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  export: _export,
  getAllByManager,
  exportAllByManager,
};

function exportAllByManager(body) {
  const FileDownload = require("js-file-download");
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(
    `${apiUrl}/resource-request/manager/exportAll`,
    requestOptions
  ).then((res) => {
    res.text().then((text) => FileDownload(text, "ResourceRequests.csv"));
  });
}

function getAllByManager(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(
    `${apiUrl}/resource-request/manager/getAll`,
    requestOptions
  ).then(handleResponse);
}

function getAll(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/resource-request/all`, requestOptions).then(
    handleResponse
  );
}

function getById(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/resource-request/one`, requestOptions).then(
    handleResponse
  );
}

function create(resourceRequest) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ ResourceRequest: resourceRequest }),
  };

  return fetch(`${apiUrl}/resource-request`, requestOptions).then(
    handleResponse
  );
}

function update(resourceRequest) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ ResourceRequest: resourceRequest }),
  };

  return fetch(`${apiUrl}/resource-request`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(reference_number) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      ResourceRequest: { reference_number: reference_number },
    }),
  };

  return fetch(`${apiUrl}/resource-request`, requestOptions).then(
    handleResponse
  );
}

function _export(body) {
  const FileDownload = require("js-file-download");
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/resource-request/exportAll`, requestOptions).then(
    (res) => {
      res.text().then((text) => FileDownload(text, "ResourceRequests.csv"));
    }
  );
}
