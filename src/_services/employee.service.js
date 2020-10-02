import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAll,
  getAllTitles,
  getAllFunctions,
  getAllNames,
  getAllWorkgroups,
  getMySkills,
  getMyDetails,
  getMyCertificates,
  getMyTrainings,
  getMyAssignments,
  exportAll,
};

function exportAll(body) {
  const FileDownload = require("js-file-download");

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/employee-profile/all/export`, requestOptions).then(
    (res) => {
      res.text().then((text) => FileDownload(text, "Employees.csv"));
    }
  );
}

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

function getAllWorkgroups() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/employee-profile/workgroups`, requestOptions).then(
    handleResponse
  );
}

function getMySkills() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/skill/my`, requestOptions).then(handleResponse);
}

function getMyCertificates() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/certification/my`, requestOptions).then(
    handleResponse
  );
}
function getMyTrainings() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/training/my`, requestOptions).then(handleResponse);
}

function getMyDetails() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/skill/my`, requestOptions).then(handleResponse);
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

function getMyAssignments() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/assignment/my`, requestOptions).then(handleResponse);
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
