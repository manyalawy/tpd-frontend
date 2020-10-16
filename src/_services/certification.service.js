import { API } from "#Helpers";

const certificationService = {
  getAllProviders,
  addProvider,
  editProvider,
  deleteProvider,
  deleteEmployeeCertification,
  getAllByProvider,
  addEmployeeCertificate,
  editEmployeeCertificate,
  getCertificates,
  editCertificates,
  addCertificate,
  deleteCertificate,
  getCertifactionsHistory,
  export: _export,
  exportHistory: _exportHistory,
  certificateHistory,
  getCertificateByProv,
};

function getCertifactionsHistory(body) {
  return API.post(`certification/history`, body);
}

function getAllProviders() {
  return API.get(`certification/provider`);
}

function getAllByProvider(body) {
  return API.post(`certification/allByProvider`, body);
}

function addProvider(body) {
  return API.post(`certification/provider`, body);
}
function addEmployeeCertificate(body) {
  return API.post(`certification/employee`, body);
}

function editProvider(body) {
  return API.put(`certification/provider`, body);
}

function editEmployeeCertificate(body) {
  return API.put(`certification/employee`, body);
}

function deleteProvider(body) {
  return API.delete(`certification/provider`, body);
}

function deleteEmployeeCertification(body) {
  return API.delete(`certification/employee`, body);
}

function _export() {
  const FileDownload = require("js-file-download");

  return API.get(`certification/provider/export`).then((res) => {
    FileDownload(res, "Certifications.csv");
  });
}

function getCertificates(body) {
  return API.post(`certification/all`, body);
}

function _exportHistory() {
  const FileDownload = require("js-file-download");

  return API.post(`certification/history/export`).then((res) => {
    FileDownload(res, "CertificatesHistory.csv");
  });
}

function editCertificates(body) {
  return API.put(`certification/`, body);
}

function addCertificate(body) {
  return API.post(`certification/`, body);
}

function deleteCertificate(body) {
  return API.delete(`certification/`, body);
}

function certificateHistory(body) {
  return API.post(`certification/history`, body);
}

function getCertificateByProv(body) {
  return API.post(`certification/allByProvider`, body);
}

export default certificationService;
