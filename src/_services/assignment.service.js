import { API } from "#Helpers";

const assignmentService = {
    addEmployeeAssignment,
    editEmployeeAssignment,
    deleteEmployeeAssignment
};

function deleteEmployeeAssignment(body) {
    return API({
        method: "Delete",
        url: "assignment/",
        data: body
    });
}

function addEmployeeAssignment(body) {
    return API.post(`assignment/`, body);
}

function editEmployeeAssignment(body) {
    return API.put(`assignment/`, body);
}

export default assignmentService;
