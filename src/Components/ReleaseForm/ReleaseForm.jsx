import React from "react";
import ReactDOM from "react-dom";
import "./ReleaseForm.css";
var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ReleaseForm(props) {
  return (
    <div>
      <div>
        <h1 className="title">Add release request</h1>
      </div>
      <div className="form-width mx-auto">
        <form>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="managerName">Manager</label>
              <select class="form-control" required>
                <option value="" disabled selected>
                  Select Manager
                </option>
                <option value="2">Volkswagen Passat</option>
                <option value="3">Manyal</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="ResourceName">Resource Name</label>
              <select className="form-control" data-live-search="true" required>
                <option value="disabled" disabled selected>
                  Select Resource Name
                </option>
                <option value="Volkswagen Passat">Volkswagen Passat</option>
                <option value="Manyal">Manyal</option>
              </select>
            </div>

            <div class="form-group col-md-4">
              <fieldset disabled>
                <label for="employeeID">Employee ID</label>
                <input
                  disabled={(props.editing = "true" ? "true" : "false")}
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
                placeholder="Enter resource name first"
              ></input>
            </div>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="Leaving"
            ></input>
            <label class="form-check-label" for="leaving">
              Leaving
            </label>
          </div>
          <button class="btn btnBlue btn-primary" type="submit">
            Add release request
          </button>
          <button class="btn btnRed btn-primary" type="reset">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
