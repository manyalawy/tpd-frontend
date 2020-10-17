import { API } from "#Helpers";

const skillService = {
  getAllCategories,
  getAllSubcategories,
  getAllSkills,
  addSkill,
  editSkill,
  addEmployeeSkill,
  deleteEmployeeSkill,
  editEmployeeSkill,
  deleteSkill,
  getSkillHistory,
  export: _export,
  getSkillTrackings,
  exportSkillTracking: _exportTrackings,
  exportAllSkills,
};

function _exportTrackings(body) {
  const FileDownload = require("js-file-download");

  return API.post(`skill/tracking/export`, body).then((res) => {
    FileDownload(res, "EmployeesSkillTracking.csv");
  });
}

function getSkillTrackings(body) {
  return API.post(`skill/tracking`, body);
}

function getAllSubcategories(body) {
  return API.post(`skill/subcategories`, body);
}

function getAllCategories() {
  return API.get(`skill/categories`);
}

function getAllSkills() {
  return API.get(`skill/`);
}

function addSkill(body) {
  return API.post(`skill/`, body);
}

function editSkill(body) {
  return API.put(`skill/`, body);
}

function editEmployeeSkill(body) {
  return API.put(`skill/employee`, body);
}

function deleteSkill(body) {
  return API({
    method: "Delete",
    url: "skill/",
    data: body,
  });
}

function addEmployeeSkill(body) {
  return API.post(`skill/employee`, body);
}

function getSkillHistory(body) {
  return API.post(`skill/history`, body);
}

function deleteEmployeeSkill(body) {
  return API({
    method: "Delete",
    url: "skill/employee",
    data: body,
  });
}

function _export(body) {
  const FileDownload = require("js-file-download");

  return API.post(`skill/history/export`, body).then((res) => {
    FileDownload(res, "Skills.csv");
  });
}

function exportAllSkills(body) {
  const FileDownload = require("js-file-download");

  return API.post(`skill/all/export`, body).then((res) => {
    FileDownload(res, "Skills.csv");
  });
}

export default skillService;
