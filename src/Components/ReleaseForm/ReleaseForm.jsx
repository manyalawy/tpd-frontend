import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ReleaseForm.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { set } from "date-fns";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ReleaseForm(props) {
  const [action, setAction] = useState(null);
  const [checked, setChecked] = useState(false);
  const [statusSelected, setStatusSelected] = useState(null);
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const status = {
    options: statusOptions,
    getOptionLabel: (option) => option.status,
  };
  const actions = {
    options: actionOptions,
    getOptionLabel: (option) => option.action,
  };
  function handleCheck(event) {
    if (event.target.checked && props.editing == "yes") {
      setAction({ action: "Added to leaving list" });

      setChecked(true);
      setStatusSelected({ status: "Leaving" });
    } else {
      setChecked(false);
    }
  }
  function handleActionChange(value) {
    console.log(value);
    setAction(value);
    if (value.action == "Added to leaving list") {
      setStatusSelected({ status: "Leaving" });
    }
    if (value.action == "Added to moving list") {
      setStatusSelected({ status: "Moved" });
    }
  }

  return (
    <div>
      <div>
        <h1 className="title">Add release request</h1>
      </div>
      <div className="form-width mx-auto">
        <form>
          <div class="form-row">
            <div class="form-group col-md-3">
              <Autocomplete
                {...defaultProps}
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
              />
            </div>
            <div class="form-group col-md-3">
              <Autocomplete
                {...defaultProps}
                id="selectResourcaName"
                autoComplete
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    freeSolo={false}
                    label="Select Resource Name"
                    margin="normal"
                  />
                )}
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
                value={date}
                min={date}
                type="date"
                class="form-control"
                id="releaseDate"
              ></input>
            </div>
          </div>
          <br></br>
          <br />
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="actualReleaseDate">Actual Release Date</label>
              <input
                disabled={
                  props.editing == "yes" && props.user == "TPD" ? false : true
                }
                value={props.editing == "yes" ? date : null}
                min={date}
                type="date"
                class="form-control"
                id="actualReleaseDate"
              ></input>
            </div>

            <div class="form-group col-md-3">
              <Autocomplete
                {...status}
                value={statusSelected}
                id="selectStatus"
                disabled={
                  checked == false &&
                  props.editing == "yes" &&
                  props.user == "TPD"
                    ? false
                    : true
                }
                onChange={(event, value) => setStatusSelected(value)}
                autoComplete
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
            <div class="form-group col-md-3">
              <Autocomplete
                {...actions}
                id="selectActionTaken"
                value={action}
                disabled={
                  checked == false &&
                  props.user == "TPD" &&
                  props.editing == "yes"
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
          <button class="btn btnBlue btn-primary" type="submit">
            {props.editing == "yes"
              ? "Edit Release Request"
              : "Add Release Request"}
          </button>
          <button class="btn btnRed btn-primary" type="reset">
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
];
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
