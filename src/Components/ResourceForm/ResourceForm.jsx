import React, { useState, useEffect } from "react";
import "./ResourceForm.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Services
import managerService from "../../_services/manager.service";
import employeeService from "../../_services/employee.service";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ResourceForm(props) {
  const [marked, setMarked] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [managerFilterList, setManagerFilterList] = useState([]);
  const [selectedManager, setSelectedManager] = useState();

  const [titleFilterList, setTitleFilterList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState();

  const [functionFilterList, setFunctionFilterList] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();

  // const [employeeFilterList, setEmployeeFilterList] = useState([]);
  // const [selectedEmployee, setSelectedEmployee] = useState();

  // const [selectedId, setSelectedId] = useState();

  //Handle Inputs
  const [reasonInput, setReasonInput] = useState();
  const [propabilityInput, setPropabilityInput] = useState();
  const [percentageInput, setPercentageInput] = useState();
  const [dateInput, setDateInput] = useState();
  const [leavingInput, setLeavingInput] = useState(false);
  const [statusSelected, setStatusSelected] = useState();

  //Once for all Filter Lists
  useEffect(() => {
    managerService.getAll().then((res) => {
      setManagerFilterList(res.managers);
    });

    employeeService.getAllFunctions().then((res) => {
      setFunctionFilterList(res.Names);
    });

    employeeService.getAllTitles().then((res) => {
      setTitleFilterList(res.Names);
    });
    // if (props.location?.state?.editing)
    //   releaseRequestService
    //     .getById({
    //       ReleaseRequest: {
    //         reference_number: props.location.state.reference_number,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setSelectedEmployee(res.ReleaseRequest.employee_name);
    //       setSelectedManager(res.ReleaseRequest.manager_name);
    //       setSelectedTitle(res.ReleaseRequest.title);
    //       setSelectedFunction(res.ReleaseRequest.function);
    //       setSelectedId(res.ReleaseRequest.employee_id);

    //       setStatusSelected(res.ReleaseRequest.request_status);
    //       setReasonInput(res.ReleaseRequest.release_reason);
    //       setPropabilityInput(res.ReleaseRequest.propability);
    //       setPercentageInput(res.ReleaseRequest.release_percentage);
    //       setLeavingInput(res.ReleaseRequest.leaving);
    //       setDateInput(res.ReleaseRequest.release_date);
    //     });
  }, []);

  var skill = { id: "", cat: "", sub: "" };
  var handleChangeCat = (event) => {
    skill.cat = event.target.value;
    console.log(skill.cat);
  };
  var handleChangeSub = (event) => {
    skill.sub = event.target.value;
  };
  function handleAdd(event) {
    document.getElementById("cat").selectedIndex = 0;
    document.getElementById("sub").selectedIndex = 0;

    skills.push(skill);
    setSkills([...skills]);
    event.preventDefault();
  }
  function handleDelete(event, indexDelete) {
    document.getElementById("cat").selectedIndex = 0;
    document.getElementById("sub").selectedIndex = 0;
    skills.splice(indexDelete, 1);

    setSkills([...skills]);
    event.preventDefault();
  }
  function handleStatusChange(event, value) {
    setSelectedStatus(value.status);
  }

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  var status = {};
  if (props.user == "TPD") {
    status = {
      options: tpdOptions,
      getOptionLabel: (option) => option.status,
    };
  } else {
    status = {
      options: managerOptions,
      getOptionLabel: (option) => option.status,
    };
  }

  var actions = {
    options: actionsTaken,
    getOptionLabel: (option) => option.action,
  };

  return (
    <div>
      <div>
        <h1 className="title">Add Resource Request</h1>
      </div>
      <div className="form-width mx-auto form">
        <form>
          <h1 className="formHeaders">Request details</h1>
          <div class="form-row">
            <div class="form-group col-md-4">
              <Autocomplete
                {...defaultProps}
                id="selectManager"
                debug
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Select Manager"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div class="form-group col-md-4">
              <Autocomplete
                {...defaultProps}
                id="selectFunction"
                debug
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Select Function"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div class="form-group col-md-4">
              <Autocomplete
                {...defaultProps}
                id="selectTitle"
                debug
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Select Title"
                    margin="normal"
                  />
                )}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <Autocomplete
                {...defaultProps}
                disabled={!marked}
                id="selectReplacmentFor"
                debug
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Replacment"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div class="form-group col-md-2">
              <label for="numberOfRequests">Number of requests</label>
              <input
                required
                min="1"
                defaultValue="1"
                type="number"
                class="form-control"
                id="numberOfRequests"
              ></input>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <div class="form-check">
                <input
                  defaultChecked={marked}
                  onChange={() => setMarked(!marked)}
                  class="form-check-input"
                  type="checkbox"
                  id="replacment"
                ></input>
                <label class="form-check-label" for="leaving">
                  Replacment
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="Leaving"
                ></input>
                <label class="form-check-label" for="leaving">
                  Core Team Member
                </label>
              </div>
            </div>
          </div>
          <h1 className="formHeaders">Assignement</h1>
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
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text" id="percentage">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group col-md-2">
              <label for="percentage">Percentage</label>
              <div class="input-group">
                <input
                  required
                  type="number"
                  class="form-control"
                  min="10"
                  max="100"
                  id="percentage"
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text" id="percentage">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group col-md-3">
              <label for="startDate">Start Date</label>
              <input
                required
                value={date}
                min={date}
                type="date"
                class="form-control"
                id="releaseDate"
                placeholder="Enter resource name first"
              ></input>
            </div>
            <div class="form-group col-md-3">
              <label for="endDate">End Date</label>
              <input
                required
                value={date}
                min={date}
                type="date"
                class="form-control"
                id="releaseDate"
                placeholder="Enter resource name first"
              ></input>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <div class="form-group">
                <label for="relatedOpportunity">Related Opportunity</label>
                <textarea
                  class="form-control"
                  id="relatedOpportunity"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div class="form-group col-md-4">
              <div class="form-group">
                <label for="comments">Comments</label>
                <textarea
                  class="form-control"
                  id="relatedOpportunity"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <Autocomplete
                disabled={props.editing == "yes" ? false : true}
                onChange={(event, value) => handleStatusChange(event, value)}
                {...status}
                id="selectStatus"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Status"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div class="form-group col-md-3">
              <Autocomplete
                freeSolo
                disabled={
                  props.user == "TPD" && props.editing == "yes" ? false : true
                }
                {...actions}
                id="selectActionTaken"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Action Taken"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div class="form-group col-md-3">
              <TextField
                disabled={
                  props.user == "TPD" && props.editing == "yes" ? false : true
                }
                required={
                  selectedStatus == "Moved" ||
                  selectedStatus == "Outsourced" ||
                  selectedStatus == "Hired" ||
                  selectedStatus == "Over allocated"
                }
                style={{ width: 300 }}
                label="Select Assigned Resource"
                margin="normal"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="actualsStartDate">Actual Start Date</label>
              <input
                disabled={
                  props.user == "TPD" && props.editing == "yes" ? false : true
                }
                value={date}
                min={date}
                type="date"
                class="form-control"
                id="actualStartDate"
              ></input>
            </div>
            <div class="form-group col-md-3">
              <label for="actualsEndDate">Actual End Date</label>
              <input
                disabled={
                  props.user == "TPD" && props.editing == "yes" ? false : true
                }
                value={date}
                min={date}
                type="date"
                class="form-control"
                id="actualEndDate"
              ></input>
            </div>
            <div class="form-group col-md-2">
              <label for="actualPercentage">Actual Percentage</label>
              <div class="input-group">
                <input
                  disabled={
                    props.user == "TPD" && props.editing == "true"
                      ? false
                      : true
                  }
                  type="number"
                  class="form-control"
                  min="10"
                  max="100"
                  id="percentage"
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text" id="actualPercentage">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="formHeaders">Technical skills</h1>
          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="function">Category</label>
                <select
                  class="form-control"
                  required
                  onChange={(event) => handleChangeCat(event)}
                  id="cat"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="app dev">app dev</option>
                  <option value="web">Web</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="function">Sub-category</label>
                <select
                  id="sub"
                  class="form-control"
                  required
                  onChange={(event) => handleChangeSub(event)}
                >
                  <option value="" disabled selected>
                    Select Sub-category
                  </option>
                  <option value="Swift">Swift</option>
                  <option value="Java">Java</option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <button
                  type="submit"
                  class=" add btn btn-primary"
                  onClick={(event) => handleAdd(event)}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Sub-category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s, index) => (
                  <tr key={index}>
                    <td>{s.cat}</td>
                    <td>{s.sub}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link"
                        onClick={(event) => handleDelete(event, index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button class="btn btn-primary sub" type="submit">
            Submit
          </button>
          <button type="button" class="btn canc btn-danger">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

const tpdOptions = [
  { status: "Open" },
  { status: "Cancelled" },
  { status: "On Hold" },
  { status: "Moved" },
  { status: "Pending Hiring Request" },
  { status: "Hired" },
  { status: "Pending Outsourcing Request" },
  { status: "Outsourced" },
  { status: "Over allocated" },
];

const managerOptions = [
  { status: "Open" },
  { status: "Cancelled" },
  { status: "On Hold" },
];

const actionsTaken = [
  { action: "Assigned from release list" },
  { action: "Added to Taleo" },
  { action: "Added to Outsourcing list" },
  { action: "Assigned as Over allocation" },
];
