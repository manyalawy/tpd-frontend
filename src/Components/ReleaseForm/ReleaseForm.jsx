import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./ReleaseForm.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  releaseRequestService,
  managerService,
  employeeService,
} from "#Services";

import { accountProperties } from "../../_helpers";

import { useSnackbar } from "notistack";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ReleaseForm(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();

  const [action, setAction] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  //Handle Filters(DropDownlists)
  const [managerFilterList, setManagerFilterList] = useState([]);
  const [selectedManager, setSelectedManager] = useState();

  const [selectedManagerOption, setSelectedManagerOption] = useState({});
  const [employeeFilterList, setEmployeeFilterList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const [selectedTitle, setSelectedTitle] = useState();
  const [selectedFunction, setSelectedFunction] = useState();
  const [selectedId, setSelectedId] = useState();

  //Handle Inputs
  const [reasonInput, setReasonInput] = useState();
  const [propabilityInput, setPropabilityInput] = useState();
  const [percentageInput, setPercentageInput] = useState();
  const [dateInput, setDateInput] = useState();
  const [leavingInput, setLeavingInput] = useState(false);
  const [statusSelected, setStatusSelected] = useState("Open");

  const [statusSelectedOption, setStatusSelectedOption] = useState(
    statusOptions[0]
  );

  //Once for all Filter Lists
  useEffect(() => {
    if (accountProperties().roles?.includes("Manager")) {
      employeeService.getMyDetails().then((res) => {
        setSelectedManager(res.Employee.name);
        setSelectedManagerOption({ name: res.Employee.name });
      });
    }
    managerService.getAll().then((res) => {
      setManagerFilterList(res.managers);
    });
    employeeService.getAllNames().then((res) => {
      setEmployeeFilterList(res.Names);
    });
    if (props.location?.state?.editing) {
      releaseRequestService
        .getById({
          ReleaseRequest: {
            reference_number: props.location.state.reference_number,
          },
        })
        .then((res) => {
          setSelectedEmployee(res.ReleaseRequest.employee_name);
          setSelectedManager(res.ReleaseRequest.manager_name);
          setSelectedTitle(res.ReleaseRequest.title);
          setSelectedFunction(res.ReleaseRequest.function);
          setSelectedId(res.ReleaseRequest.employee_id);

          setStatusSelected(res.ReleaseRequest.request_status);
          setReasonInput(res.ReleaseRequest.release_reason);
          setPropabilityInput(res.ReleaseRequest.propability);
          setPercentageInput(res.ReleaseRequest.release_percentage);
          setLeavingInput(res.ReleaseRequest.leaving);
          setDateInput(res.ReleaseRequest.release_date);
        });
    }
  }, []);

  //when employee name is changed
  useEffect(() => {
    if (selectedEmployee)
      employeeService
        .getAll({
          Filters: { name: selectedEmployee },
        })
        .then((res) => {
          setSelectedId(res.Employees[0]?.id);
          setSelectedTitle(res.Employees[0]?.title);
          setSelectedFunction(res.Employees[0]?.function);
        });
  }, [selectedEmployee]);

  const status = {
    options: statusOptions,
    getOptionLabel: (option) => option.status,
  };
  const actions = {
    options: actionOptions,
    getOptionLabel: (option) => option.action,
  };
  function handleCheck(event) {
    if (event.target.checked) {
      setAction({ action: "Added to leaving list" });
      setSelectedAction("Added to leaving list");
      setChecked(true);
      setLeavingInput(true);
      setStatusSelected("Leaving");
      setStatusSelectedOption({ status: "Leaving" });
    } else {
      setChecked(false);
      setLeavingInput(false);
    }
  }
  function handleActionChange(value) {
    setAction(value);
    setSelectedAction(value.action);
    if (value.action == "Added to leaving list") {
      setStatusSelected("Leaving");
      setStatusSelectedOption({ status: "Leaving" });
    }
    if (value.action == "Added to moving list") {
      setStatusSelected("Moved");
      setStatusSelectedOption({ status: "Moved" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const ReleaseRequest = {
      manager_name: selectedManager,
      employee_name: selectedEmployee,
      employee_title: selectedTitle,
      employee_id: selectedId,
      function: selectedFunction,
      title: selectedTitle,
      release_date: dateInput,
      propability: propabilityInput,
      release_reason: reasonInput,
      release_percentage: percentageInput,
      leaving: leavingInput ? "y" : "n",
      request_status: statusSelected,
    };
    if (props.location?.state?.editing) {
      const reference_number = props.location?.state?.reference_number;
      releaseRequestService
        .update({ ...ReleaseRequest, reference_number })
        .then((res) => {
          if (res.error) {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
          } else {
            if (accountProperties().roles?.includes("TPD Team")) {
              releaseRequestService
                .addAction({
                  ReleaseRequestAction: {
                    request_reference_number: reference_number,
                    action: selectedAction,
                  },
                })
                .then((res2) => {
                  if (res2.error) {
                    enqueueSnackbar(res2.error, {
                      variant: "error",
                    });
                  } else {
                    enqueueSnackbar("Request Successfully Updated", {
                      variant: "success",
                    });
                    history.push("/release-requests");
                  }
                });
            } else {
              if (!res.error) {
                enqueueSnackbar("Request Successfully Updated", {
                  variant: "success",
                });
                history.push("/release-requests");
              }
            }
          }
        });
    } else {
      releaseRequestService.create(ReleaseRequest).then((res) => {
        if (res.error) {
          enqueueSnackbar(res.error, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Request Successfully created", {
            variant: "success",
          });
          history.push("/release-requests");
        }
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className="title">
          {props.location?.state?.editing ? "Edit" : "Add"} Release Request
          {props.location?.state?.editing
            ? ":" + props.location?.state?.reference_number
            : ""}
        </h1>
      </div>
      <div className="form-width mx-auto">
        <form>
          <div class="form-row">
            <div class="form-group col-md-3">
              {accountProperties().roles?.includes("Manager") ? (
                <Autocomplete
                  id="selectManager"
                  autoComplete
                  disabled={true}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Select Manager"
                      margin="normal"
                    />
                  )}
                  value={selectedManagerOption}
                  options={managerFilterList}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setSelectedManager(value.name);
                  }}
                />
              ) : (
                <Autocomplete
                  id="selectManager"
                  autoComplete
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Select Manager"
                      margin="normal"
                    />
                  )}
                  value={selectedManager}
                  options={managerFilterList}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setSelectedManager(value.name);
                  }}
                />
              )}
            </div>
            <div class="form-group col-md-3">
              <Autocomplete
                id="selectResourcaName"
                autoComplete
                disabled={
                  accountProperties().roles?.includes("Manager") &&
                  statusSelected != "Open"
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    freeSolo={false}
                    label="Select Resource Name"
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

            <div class="form-group col-md-4">
              <fieldset>
                <label for="employeeID">Employee ID</label>
                <input
                  disabled
                  type="text"
                  class="form-control"
                  id="employeeID"
                  placeholder="Enter resource name first"
                  value={selectedId}
                  onChange={(event) => {
                    setSelectedId(event.target.value);
                  }}
                ></input>
              </fieldset>
            </div>
          </div>
          <br></br>

          <div class="form-row">
            <div class="form-group col-md-4">
              <fieldset disabled>
                <label for="employeeTitle">Employee Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="employeeTitle"
                  placeholder="Enter resource name first"
                  value={selectedTitle}
                  onChange={(event) => {
                    setSelectedTitle(event.target.value);
                  }}
                ></input>
              </fieldset>
            </div>
            <div class="form-group col-md-4">
              <fieldset disabled>
                <label for="function">Function</label>
                <input
                  type="text"
                  class="form-control"
                  id="function"
                  placeholder="Enter resource name first"
                  value={selectedFunction}
                  onChange={(event) => {
                    setSelectedFunction(event.target.value);
                  }}
                ></input>
              </fieldset>
            </div>
            <div class="form-group col-md-4">
              <div class="form-group">
                <label for="releaseReason">Release Reason</label>
                <textarea
                  class="form-control"
                  id="releaseReason"
                  rows="5"
                  disabled={
                    accountProperties().roles?.includes("Manager") &&
                    statusSelected != "Open"
                  }
                  value={reasonInput}
                  onChange={(event) => {
                    setReasonInput(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="probability">Probability</label>
              <div class="input-group">
                <input
                  required
                  type="number"
                  class="form-control"
                  min="10"
                  max="100"
                  id="probability"
                  disabled={
                    accountProperties().roles?.includes("Manager") &&
                    statusSelected != "Open"
                  }
                  value={propabilityInput}
                  onChange={(event) => {
                    setPropabilityInput(event.target.value);
                  }}
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text" id="percentage">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-2">
              <label for="releasePercentage">Release percentage</label>
              <div class="input-group">
                <input
                  required
                  type="number"
                  class="form-control"
                  min="10"
                  max="100"
                  id="releasePercentage"
                  disabled={
                    accountProperties().roles?.includes("Manager") &&
                    statusSelected != "Open"
                  }
                  value={percentageInput}
                  onChange={(event) => {
                    setPercentageInput(event.target.value);
                  }}
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text" id="percentage">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group col-md-3">
              <label for="releaseDate">Release Date</label>
              <input
                required
                value={dateInput}
                min={date}
                type="date"
                class="form-control"
                id="releaseDate"
                disabled={
                  accountProperties().roles?.includes("Manager") &&
                  statusSelected != "Open"
                }
                onChange={(event) => {
                  setDateInput(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <br></br>
          <br />
          <div class="form-row">
            {props.location?.state?.editing ? (
              <div class="form-group col-md-3">
                <label for="actualReleaseDate">Actual Release Date</label>
                <input
                  disabled={
                    props.location?.state?.editing &&
                    accountProperties().roles?.includes("TPD Team")
                      ? false
                      : true
                  }
                  value={props.location?.state?.editing ? date : null}
                  min={date}
                  disabled={
                    accountProperties().roles?.includes("Manager") &&
                    statusSelected != "Open"
                  }
                  type="date"
                  class="form-control"
                  id="actualReleaseDate"
                ></input>
              </div>
            ) : (
              ""
            )}

            <div class="form-group col-md-3">
              <Autocomplete
                {...status}
                value={statusSelectedOption}
                id="selectStatus"
                disabled={
                  checked == false &&
                  props.location?.state?.editing &&
                  accountProperties().roles?.includes("TPD Team")
                    ? false
                    : true
                }
                onChange={(event, value) => setStatusSelected(value.status)}
                autoComplete
                disabled={accountProperties().roles?.includes("Manager")}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Select Status"
                    margin="normal"
                  />
                )}
              />
            </div>
            {props.location?.state?.editing ? (
              <div class="form-group col-md-3">
                <Autocomplete
                  {...actions}
                  id="selectActionTaken"
                  value={action}
                  disabled={
                    checked == false &&
                    accountProperties().roles?.includes("TPD Team") &&
                    props.location?.state?.editing
                      ? false
                      : true
                  }
                  onChange={(event, value) => handleActionChange(value)}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Select Action"
                      margin="normal"
                    />
                  )}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div class="form-check">
            <input
              onClick={(event) => handleCheck(event)}
              class="form-check-input"
              type="checkbox"
              id="Leaving"
            ></input>
            <label class="form-check-label" for="leaving">
              Leaving
            </label>
          </div>
          <button
            class="btn btnBlue btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            {props.location?.state?.editing
              ? "Edit Release Request"
              : "Add Release Request"}
          </button>
          <button
            class="btn btnRed btn-primary"
            type="reset"
            onClick={() => history.push("/release-requests")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const statusOptions = [
  { status: "Open" },
  { status: "Cancelled" },
  { status: "Moved" },
  { status: "Left" },
  { status: "Booked" },
];

const actionOptions = [
  { action: "Added to moving list" },
  { action: "Added to leaving list" },
  { action: "Added to outsourcing list" },
  { action: "Assigned as over allocation" },
];
