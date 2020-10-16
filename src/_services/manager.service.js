import { API } from "#Helpers";

const managerService = {
  getAll,
};

function getAll() {
  return API.post(`manager/all`);
}

export default managerService;
