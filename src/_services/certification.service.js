import { authHeader, handleResponse } from "../_helpers";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default {
  getAllProviders,
  addProvider,
  editProvider,
  deleteProvider,
  getCertificates,
  editCertificates,
  addCertificate,
  deleteCertificate,
  export: _export,
  exportHistory: _exportHistory,
  certificateHistory,
  getCertificateByProv,
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

function _export() {
  const FileDownload = require("js-file-download");
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}/certification/provider/export`, requestOptions).then(
    (res) => {
      res.text().then((text) => FileDownload(text, "ReleaseRequests.csv"));
    }
  );
}
// --------------------------Certifications----------------------------------

function getCertificates(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/all`, requestOptions).then(
    handleResponse
  );
}

function _exportHistory() {
  const FileDownload = require("js-file-download");
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${apiUrl}/certification/history/export`, requestOptions).then(
    (res) => {
      res.text().then((text) => FileDownload(text, "CertificatesHistory.csv"));
    }
  );
}

function editCertificates(body) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/`, requestOptions).then(handleResponse);
}

function addCertificate(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/`, requestOptions).then(handleResponse);
}

function deleteCertificate(body) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/`, requestOptions).then(handleResponse);
}

function certificateHistory(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/history`, requestOptions).then(
    handleResponse
  );
}

function getCertificateByProv(body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}/certification/allByProvider`, requestOptions).then(
    handleResponse
  );
}
