import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Pagination from "@material-ui/lab/Pagination";

import "./ReleaseReq.css";

//Services
import releaseRequestService from "../../_services/release-request.service";
import managerService from "../../_services/manager.service";
import employeeService from "../../_services/employee.service";

export default function ReleaseReq() {
  let history = useHistory();
  //Handle Table
  const [releaseRequests, setReleaseRequests] = useState([]);
  //Handle Delete
  const [idToDelete, setIdToDelete] = useState();
  const [deleted, setDeleted] = useState(false);
  //Handle Filters
  const [filtered, setFiltered] = useState(false);
  const [managerFilterList, setManagerFilterList] = useState([]);
  const [selectedManager, setSelectedManager] = useState();

  const [titleFilterList, setTitleFilterList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState();

  const [functionFilterList, setFunctionFilterList] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();

  const [employeeFilterList, setEmployeeFilterList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const [selectedStatus, setSelectedStatus] = useState();

  const [selectedPage, setSelectedPage] = useState(1);

  const [exportData, setExportData] = useState("");

  //Once for all Filter Lists
  useEffect(() => {
    managerService.getAll().then((res) => {
      setManagerFilterList(res.managers);
    });
    employeeService.getAllNames().then((res) => {
      setEmployeeFilterList(res.Names);
    });
    employeeService.getAllTitles().then((res) => {
      setTitleFilterList(res.Titles);
    });
    employeeService.getAllFunctions().then((res) => {
      setFunctionFilterList(res.Functions);
    });
  }, []);

  //With every Update to re-render Table with filtration or after deletion
  useEffect(() => {
    const managerFilterProperty = selectedManager
      ? { manager_name: selectedManager }
      : "";
    const titleFilterProperty = selectedTitle
      ? { employee_title: selectedTitle }
      : "";
    const functionFilterProperty = selectedFunction
      ? { function: selectedFunction }
      : "";
    const employeeFilterProperty = selectedEmployee
      ? { employee_name: selectedEmployee }
      : "";

    const statusFilterProperty = selectedStatus
      ? { request_status: selectedStatus }
      : "";
    const Filters = {
      ...managerFilterProperty,
      ...titleFilterProperty,
      ...functionFilterProperty,
      ...employeeFilterProperty,
      ...statusFilterProperty,
    };
    releaseRequestService
      .getAll({
        Page: selectedPage - 1,
        Limit: 10,
        Filters,
      })
      .then((res) => {
        setReleaseRequests(res.ReleaseRequests);
      });
  }, [deleted, filtered, selectedPage]);

  function resetFilter() {
    document.getElementById("filterManager").value = "";
    document.getElementById("filterEmployeeTitle").value = "";
    document.getElementById("filterFunction").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterEmployeeName").value = "";
    setSelectedManager("");
    setSelectedTitle("");
    setSelectedFunction("");
    setSelectedEmployee("");
    setSelectedStatus("");
  }

  const deleteRequest = () => {
    releaseRequestService.delete(idToDelete).then(() => {
      setDeleted(!deleted);
    });
  };

  const exportRequests = () => {
    const managerFilterProperty = selectedManager
      ? { manager_name: selectedManager }
      : "";
    const titleFilterProperty = selectedTitle
      ? { employee_title: selectedTitle }
      : "";
    const functionFilterProperty = selectedFunction
      ? { function: selectedFunction }
      : "";
    const employeeFilterProperty = selectedEmployee
      ? { employee_name: selectedEmployee }
      : "";

    const statusFilterProperty = selectedStatus
      ? { request_status: selectedStatus }
      : "";
    const Filters = {
      ...managerFilterProperty,
      ...titleFilterProperty,
      ...functionFilterProperty,
      ...employeeFilterProperty,
      ...statusFilterProperty,
    };
    releaseRequestService.export({
      Filters,
    });
  };

  const editRequest = (reference_number) => {
    history.push({
      pathname: "/release-requests/edit",
      state: { reference_number, editing: true },
    });
  };

  return (
    <div>
      <h1 className="resourceTitle">Release Requests</h1>

      <div className="float-right">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => history.push("/release-requests/add")}
          edge="start"
          style={{
            backgroundColor: "#ffffff",
            margin: "10px",
            color: "#000000",
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          style={{
            backgroundColor: "#F6EC5A",
            margin: "10px",
            color: "#000000",
          }}
          data-toggle="modal"
          data-target="#releaseFilterModal"
        >
          <img style={{ width: "100%", height: "auto" }} src={FilterIcon}></img>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          style={{
            backgroundColor: "#084791",
            margin: "10px",
            color: "#ffffff",
          }}
          onClick={() => exportRequests()}
        >
          <img
            style={{
              width: "24px",
              margin: "auto",
            }}
            src={ExportIcon}
          ></img>
        </IconButton>
      </div>

      <div className="table-responsive-lg">
        <table class="table resourceTable mx-auto table-striped table-condensed">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Ref No.</th>
              <th scope="col">Manager</th>
              <th scope="col">Resource Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Title</th>
              <th scope="col">Function</th>
              <th scope="col">Release Date</th>
              <th scope="col">Release Percentage</th>
              <th scope="col">Release Reason</th>
              <th scope="col">Leaving</th>
              <th scope="col">Status</th>
              <th scope="col">Action Taken</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {releaseRequests.map((releaseRequest) => (
              <tr>
                <th scope="row">{releaseRequest.reference_number}</th>
                <td>{releaseRequest.manager_name}</td>
                <td>{releaseRequest.employee_name}</td>
                <td>{releaseRequest.employee_id}</td>
                <td>{releaseRequest.title}</td>
                <td>{releaseRequest.function}</td>

                <td>{releaseRequest.release_date}</td>
                <td>{releaseRequest.release_percentage}</td>
                <td>{releaseRequest.release_reason}</td>
                <td>{releaseRequest.leaving}</td>
                <td>{releaseRequest.request_status}</td>
                <td>{releaseRequest.release_requests_actions[0]?.action}</td>

                <td className="btn-group">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    style={{
                      backgroundColor: "#ffffff",
                      margin: "10px",
                      color: "#000000",
                    }}
                    onClick={() => editRequest(releaseRequest.reference_number)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    style={{
                      backgroundColor: "#ffffff",
                      margin: "10px",
                      color: "#000000",
                    }}
                    onClick={() =>
                      setIdToDelete(releaseRequest.reference_number)
                    }
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={100}
            color="primary"
            onChange={(event, value) => {
              console.log(value);
              setSelectedPage(value);
            }}
          />
        </div>
      </div>

      <div
        class="modal fade releaseFilter"
        id="releaseFilterModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-lg " role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Filter
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterManager"
                    renderInput={(params) => (
                      <TextField {...params} label="Manager" margin="normal" />
                    )}
                    value={selectedManager}
                    options={managerFilterList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      setSelectedManager(value.name);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterEmployeeTitle"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Title"
                        margin="normal"
                      />
                    )}
                    value={selectedTitle}
                    options={titleFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedTitle(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterFunction"
                    renderInput={(params) => (
                      <TextField {...params} label="Function" margin="normal" />
                    )}
                    value={selectedFunction}
                    options={functionFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedFunction(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterEmployeeName"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        margin="normal"
                      />
                    )}
                    value={selectedEmployee}
                    options={employeeFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedEmployee(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    options={status}
                    getOptionLabel={(option) => option}
                    id="filterStatus"
                    renderInput={(params) => (
                      <TextField {...params} label="Status" margin="normal" />
                    )}
                    onChange={(event, value) => {
                      setSelectedStatus(value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setFiltered(!filtered)}
              >
                Filter
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => resetFilter()}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade deleteModal"
        id="deleteRelease"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete release request
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete release request with reference
              number: {idToDelete}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  deleteRequest();
                }}
                data-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const status = ["Open", "Cancelled", "Moved", "Left", "Booked"];
