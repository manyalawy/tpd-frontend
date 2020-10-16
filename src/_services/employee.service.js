import { API } from "#Helpers";

const employeeService = {
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
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTrainings,
  getEmployeeAssignments,
  getEmployeeAssignmentHistory,
};

function exportAll(body) {
  const FileDownload = require("js-file-download");

  return API.post(`employee-profile/all/export`, body).then((res) => {
    FileDownload(res, "Employees.csv");
  });
}

function getAll(body) {
  return API.post(`employee-profile/all`, body);
}

function getAllTitles() {
  return API.get(`employee-profile/titles`);
}

function getAllWorkgroups() {
  return API.get(`employee-profile/workgroups`);
}

function getMySkills() {
  return API.post(`skill/my`);
}

function getMyCertificates() {
  return API.post(`certification/my`);
}
function getMyTrainings() {
  return API.post(`training/my`);
}

function getMyDetails() {
  return API.post(`skill/my`);
}

function getAllFunctions() {
  return API.get(`employee-profile/functions`);
}

function getMyAssignments() {
  return API.post(`assignment/my`);
}

function getEmployeeAssignmentHistory(body) {
  return API.post(`assignment/history/empoloyee`, body);
}

function getEmployeeAssignments(body) {
  return API.post(`assignment/employee`, body);
}

function getAllNames() {
  return API.get(`employee-profile/names`);
}

function getEmployeeSkills(body) {
  return API.post(`skill/employee/all`, body);
}

function getEmployeeCertificates(body) {
  return API.post(`certification/employee/all`, body);
}

function getEmployeeTrainings(body) {
  return API.post(`training/employeeTrainings`, body);
}

export default employeeService;
