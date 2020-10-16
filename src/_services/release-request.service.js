import { API } from "#Helpers";

const releaseRequestService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  export: _export,
  getAllByManager,
  exportAllByManager,
  addAction,
};

function addAction(body) {
  return API.post(`release-request/action`, body);
}

function exportAllByManager(body) {
  const FileDownload = require("js-file-download");

  return API.post(`release-request/manager/exportAll`, body).then((res) => {
    FileDownload(res, "ReleaseRequests.csv");
  });
}

function getAllByManager(body) {
  return API.post(`release-request/manager/getAll`, body);
}

function getAll(body) {
  return API.post(`release-request/all`, body);
}

function getById(body) {
  return API.post(`release-request/one`, body);
}

function create(releaseRequest) {
  return API.post(`release-request`, { ReleaseRequest: releaseRequest });
}

function update(releaseRequest) {
  return API.put(`release-request`, { ReleaseRequest: releaseRequest });
}

function _delete(reference_number) {
  return API.delete(`release-request`, {
    ReleaseRequest: { reference_number: reference_number },
  });
}

function _export(body) {
  const FileDownload = require("js-file-download");

  return API.post(`release-request/exportAll`, body).then((res) => {
    FileDownload(res, "ReleaseRequests.csv");
  });
}

export default releaseRequestService;
