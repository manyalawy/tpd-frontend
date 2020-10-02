import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default { getAllEmployeeTrainings, exportEmployeeTrainings };

function getAllEmployeeTrainings(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/training/employeeTrainings`, requestOptions).then(
    handleResponse
  );
}

function exportEmployeeTrainings(body) {
  const FileDownload = require("js-file-download");

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(
    `${apiUrl}/training/employeeTrainings/export`,
    requestOptions
  ).then((res) => {
    res.text().then((text) => FileDownload(text, "EmployeeTrainings.csv"));
  });
}
