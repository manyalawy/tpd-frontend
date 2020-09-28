import React, { useState, useEffect } from "react";
import "./ResourceForm.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { set, sub } from "date-fns";

//Services
import managerService from "../../_services/manager.service";
import employeeService from "../../_services/employee.service";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ResourceForm(props) {
  //handling inputs
  const [marked, setMarked] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedReplacment, setSelectedReplacment] = useState("");
  const [numberOfRequests, setNumberOfRequests] = useState(1);

  //handling dropdown lists
  const [managers, setManagers] = useState([]);
  const [replacments, setReplacments] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [titles, setTitiles] = useState([]);

  var skill = { id: "", cat: "", sub: "" };
  var handleChangeCat = (event) => {
    skill.cat = event.target.value;
    console.log(skill.cat);
  };
  var handleChangeSub = (event) => {
    skill.sub = event.target.value;
  };

  //handle add button in form
  function handleAdd(event) {
    if (skill.cat != "" && skill.sub != "") {
      document.getElementById("cat").selectedIndex = 0;
      document.getElementById("sub").selectedIndex = 0;
      skills.push(skill);
      setSkills([...skills]);
      event.preventDefault();
    }
  }
  //handle deleting skill from form
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

  //dropdown arrays
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
  const managersDropDownList = {
    options: managers,
    getOptionLabel: (option) => option.name,
  };
  const replacmentDropDownList = {
    options: replacments,
    getOptionLabel: (option) => option,
  };
  const functionsDropdownList = {
    options: functions,
    getOptionLabel: (option) => option,
  };

  const titleDropDownList = {
    options: titles,
    getOptionLabel: (option) => option,
  };

  var actions = {
    options: actionsTaken,
    getOptionLabel: (option) => option.action,
  };

  //use effects
  useEffect(() => {
    managerService.getAll().then((res) => {
      setManagers(res.managers);
    });
    employeeService.getAllFunctions().then((res) => {
      setFunctions(res.Functions);
    });
    employeeService.getAllTitles().then((res) => {
      setTitiles(res.Titles);
    });
  }, []);
  useEffect(() => {
    if (selectedManager != "") {
      employeeService.getAllNames().then((res) => {
        setReplacments(res.Names);
      });
    }
  }, [selectedManager]);
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
                onChange={(event, value) =>
                  value == null
                    ? setSelectedManager("")
                    : setSelectedManager(value.name)
                }
                {...managersDropDownList}
                id="selectManager"
                clearOnEscape
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
                onChange={(event, value) =>
                  value == null
                    ? setSelectedFunction("")
                    : setSelectedFunction(value)
                }
                {...functionsDropdownList}
                id="selectFunction"
                clearOnEscape
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
                onChange={(event, value) =>
                  value == null ? setSelectedTitle("") : setSelectedTitle(value)
                }
                {...titleDropDownList}
                id="selectTitle"
                clearOnEscape
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
                defaultValue={"hi"}
                onChange={(event, value) =>
                  value == null
                    ? setSelectedReplacment("")
                    : setSelectedReplacment(value)
                }
                {...replacmentDropDownList}
                disabled={
                  marked == true && selectedManager != "" ? false : true
                }
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
                onChange={(event) =>
                  event.target.value == null
                    ? setNumberOfRequests("")
                    : setNumberOfRequests(event.target.value)
                }
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
