import { API } from "#Helpers";

const resourceRequestService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    export: _export,
    getAllByManager,
    exportAllByManager,
    addAction
};

function addAction(body) {
    return API.post(`resource-request/action`, body);
}

function exportAllByManager(body) {
    const FileDownload = require("js-file-download");

    return API.post(`resource-request/manager/exportAll`, body).then((res) => {
        FileDownload(res, "ResourceRequests.csv");
    });
}

function getAllByManager(body) {
    return API.post(`resource-request/manager/getAll`, body);
}

function getAll(body) {
    return API.post(`resource-request/all`, body);
}

function getById(body) {
    return API.post(`resource-request/one`, body);
}

function create(resourceRequest) {
    return API.post(`resource-request`, { ResourceRequest: resourceRequest });
}

function update(resourceRequest) {
    return API.put(`resource-request`, { ResourceRequest: resourceRequest });
}

function _delete(reference_number) {
    return API({
        method: "Delete",
        url: "resource-request",
        data: {
            ResourceRequest: { reference_number: reference_number }
        }
    });
}

function _export(body) {
    const FileDownload = require("js-file-download");
    return API.post(`resource-request/exportAll`, body).then((res) => {
        FileDownload(res, "ResourceRequests.csv");
    });
}

export default resourceRequestService;
