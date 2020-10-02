import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./ResourceForm.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { set, sub } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//Services
import managerService from "../../_services/manager.service";
import employeeService from "../../_services/employee.service";
import skillService from "../../_services/skill.service";
import resourceRequestService from "../../_services/resource-request.service";

import { useSnackbar } from "notistack";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ResourceForm(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();

  //handling inputs
  const [replacmentCheck, setReplamentCheck] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedReplacment, setSelectedReplacment] = useState(null);
  const [numberOfRequests, setNumberOfRequests] = useState(null);
  const [coreTeam, setCoreTeam] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [selectedPercentage, setSelectedPercentage] = React.useState(null);
  const [selectedProbability, setSelectedProbability] = React.useState(null);
  const [selectedrelatedOpp, setSelectedRelatedOpp] = React.useState(null);
  const [selectedComment, setSelectedComment] = React.useState(null);
  const [
    selectedAssignedResource,
    setSelectedAssignedResource,
  ] = React.useState(null);
  const [selectedAction, setSelectedAction] = React.useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  //handling dropdown lists
  const [managers, setManagers] = useState([]);
  const [replacments, setReplacments] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [titles, setTitiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCat, setSubCat] = useState([]);

  var skill = { id: "", cat: "", sub: "" };

  //handle add button in form
  function handleAddSkill(event) {
    event.preventDefault();
    if (selectedCat != null && selectedSubCat != null) {
      skill.cat = selectedCat;
      skill.sub = selectedSubCat;
      skills.push(skill);
      setSkills([...skills]);
      setSelectedSubCat(null);
      setSelectedCat(null);
    }
  }
  //handle deleting skill from form
  function handleDelete(event, indexDelete) {
    skills.splice(indexDelete, 1);

    setSkills([...skills]);
    event.preventDefault();
  }
  function handleStatusChange(event, value) {
    setSelectedStatus(value.status);
  }

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = () => {
    var rep = replacmentCheck == true ? "y" : "n";

    const ResourceRequest = {
      manager_name: selectedManager,
      function: selectedFunction,
      title: selectedTitle,
      start_date: selectedStartDate,
      replacement_for: " ",
      replacement: rep,
      core_team_member: "y",

      requests_count: parseInt(numberOfRequests),

      comments: selectedComment,

      percentage: parseInt(selectedPercentage),
      propability: parseInt(selectedProbability),

      end_date: selectedEndDate,
      related_Opportunity: selectedrelatedOpp,
    };

    if (props.location?.state?.editing) {
      const reference_number = props.location?.state?.reference_number;
      resourceRequestService
        .update({ ...ResourceRequest, reference_number })
        .then((res) => {
          if (res.error) {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Request Successfully Updated", {
              variant: "success",
            });
            history.push("/resource-requests");
          }
        });
    } else {
      for (let index = 0; index < parseInt(numberOfRequests); index++) {
        resourceRequestService.create(ResourceRequest).then((res) => {
          if (res.error) {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Request Successfully created", {
              variant: "success",
            });
            history.push("/resource-requests");
          }
        });
      }
    }
  };

  const handleCategoryChange = (value) => {
    setSubCat([]);
    setSelectedCat(value);
    skillService.getAllSubcategories({ category: value }).then((res) => {
      setSubCat(res.Subcategories);
    });
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
  const subCatDropDownLst = {
    options: subCat,
    getOptionLabel: (option) => option,
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
  const categoriesDropDownList = {
    options: categories,
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
      console.log(managers);
    });
    employeeService.getAllFunctions().then((res) => {
      setFunctions(res.Functions);
    });
    employeeService.getAllTitles().then((res) => {
      setTitiles(res.Titles);
    });
    skillService.getAllCategories().then((res) => {
      setCategories(res.Categories);
    });

    if (props.location?.state?.editing)
      resourceRequestService
        .getById({
          reference_number: props.location.state.reference_number,
        })
        .then((res) => {
          console.log(res);
          setSelectedFunction(res.ResourceRequest.function);
          setSelectedManager(res.ResourceRequest.manager_name);

          // setSelectedEmployee(res.ResourceRequest.employee_name);
          setSelectedTitle(res.ResourceRequest.title);
          // setSelectedId(res.ResourceRequest.employee_id);

          // setStatusSelected(res.ResourceRequest.request_status);
          // setReasonInput(res.ResourceRequest.release_reason);
          setSelectedProbability(res.ResourceRequest.propability);
          setSelectedPercentage(res.ResourceRequest.percentage);
          setSelectedStartDate(res.ResourceRequest.start_date);
          setSelectedEndDate(res.ResourceRequest.end_date);
          setSelectedComment(res.ResourceRequest.comments);
          setSelectedRelatedOpp(res.ResourceRequest.related_opportunity);
          setReplamentCheck(res.ResourceRequest.replacenement);
          setSelectedStatus(res.ResourceRequest.status);
          setSelectedReplacment(res.ResourceRequest.replacenement_for);
          setCoreTeam(res.ResourceRequest.core_team_member);
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
        <h1 className="title">
          {props.location?.state?.editing ? "Edit" : "Add"} Resource Request
          {props.location?.state?.editing
            ? ": " + props.location?.state?.reference_number
            : ""}
        </h1>
      </div>
      <div className="form-width mx-auto form">
        <form>
          <h1 className="formHeaders">Request details</h1>
          <div class="form-row">
            <div class="form-group col-md-4">
              <Autocomplete
                defaultValue={selectedManager}
                onChange={(event, value) =>
                  value == null
                    ? setSelectedManager(null)
                    : setSelectedManager(value.name)
                }
                {...managersDropDownList}
                id="selectManager"
                clearOnEscape
                value={selectedManager}
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
                defaultValue={selectedFunction}
                onChange={(event, value) =>
                  value == null
                    ? setSelectedFunction(null)
                    : setSelectedFunction(value)
                }
                {...functionsDropdownList}
                id="selectFunction"
                clearOnEscape
                value={selectedFunction}
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
                defaultValue={selectedTitle}
                value={selectedTitle}
                onChange={(event, value) =>
                  value == null
                    ? setSelectedTitle(null)
                    : setSelectedTitle(value)
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
                defaultValue={selectedReplacment}
                value={selectedReplacment}
                onChange={(event, value) =>
                  value == null
                    ? setSelectedReplacment(null)
                    : setSelectedReplacment(value)
                }
                {...replacmentDropDownList}
                disabled={
                  replacmentCheck == true && selectedManager != ""
                    ? false
                    : true
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
                value={numberOfRequests}
                onChange={(event) =>
                  event.target.value == ""
                    ? setNumberOfRequests(null)
                    : setNumberOfRequests(event.target.value)
                }
                required
                min="1"
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
                  defaultChecked={replacmentCheck}
                  value={replacmentCheck}
                  onChange={() => setReplamentCheck(!replacmentCheck)}
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
                  defaultChecked={coreTeam}
                  onChange={(event) => setCoreTeam(event.target.checked)}
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
                  value={selectedProbability}
                  onChange={(event) =>
                    event.target.value == ""
                      ? setSelectedProbability(null)
                      : setSelectedProbability(event.target.value)
                  }
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
                  value={selectedPercentage}
                  onChange={(event) =>
                    event.target.value == ""
                      ? setSelectedPercentage(null)
                      : setSelectedPercentage(event.target.value)
                  }
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Start Date"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div class="form-group col-md-3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="End Date"
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <div class="form-group">
                <label for="relatedOpportunity">Related Opportunity</label>
                <textarea
                  onChange={(event) =>
                    setSelectedRelatedOpp(event.target.value)
                  }
                  value={selectedrelatedOpp}
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
                  onChange={(event) => setSelectedComment(event.target.value)}
                  value={selectedComment}
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
                defaultValue={selectedStatus}
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
                onChange={(event, value) => setSelectedAction(value)}
                defaultValue={selectedAction}
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
                onChange={(event) =>
                  setSelectedAssignedResource(event.target.value)
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
                <Autocomplete
                  clearOnEscape
                  onChange={(event, value) => handleCategoryChange(value)}
                  defaultValue={selectedCat}
                  {...categoriesDropDownList}
                  id="selectCat"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Category"
                      margin="normal"
                    />
                  )}
                />
              </div>
              <div class="form-group col-md-4">
                <Autocomplete
                  clearOnEscape
                  onChange={(event, value) =>
                    value == null
                      ? setSelectedSubCat(null)
                      : setSelectedSubCat(value)
                  }
                  disabled={selectedCat == null ? true : false}
                  defaultValue={selectedSubCat}
                  value={selectedSubCat}
                  {...subCatDropDownLst}
                  onChange={(event, value) => setSelectedSubCat(value)}
                  id="selectSubCat"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select SubCategory"
                      margin="normal"
                    />
                  )}
                />
              </div>
              <div class="form-group col-md-3">
                <button
                  type="submit"
                  class=" add btn btn-primary"
                  onClick={(event) => handleAddSkill(event)}
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
          <button
            class="btn btn-primary sub"
            type="submit"
            onClick={handleSubmit}
          >
            {props.location?.state?.editing
              ? "Edit Resource Request"
              : "Add Resource Request"}
          </button>
          <button type="button" class="btn canc btn-danger">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

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
