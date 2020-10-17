import { API } from "#Helpers";

const trainingService = {
    getAllEmployeeTrainings,
    exportEmployeeTrainings
};

function getAllEmployeeTrainings(body) {
    return API.post(`training/employeesTrainings`, body);
}

function exportEmployeeTrainings(body) {
    const FileDownload = require("js-file-download");

    return API.post(`training/employeesTrainings/export`, body).then((res) => {
        FileDownload(res, "EmployeeTrainings.csv");
    });
}

export default trainingService;
