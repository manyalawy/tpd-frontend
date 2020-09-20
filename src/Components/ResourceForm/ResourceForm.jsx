import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ResourceForm.css";
import Row from "./skillRow.jsx";

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0, 10);

export default function ResourceForm() {
  const [marked, setMarked] = useState(false);
  const [skills, setSkills] = useState([]);

  var skill = { id:"", cat: "", sub: "" };
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
  function handleDelete(event,indexDelete){
    document.getElementById("cat").selectedIndex = 0;
    document.getElementById("sub").selectedIndex = 0;
    skills.splice(indexDelete,1)
    
    setSkills([...skills])
    event.preventDefault()
  }

  return (
    <div>
      <div>
        <h1 className="title">Add release request</h1>
      </div>
      <div className="form-width mx-auto form">
        <form>
          <h1 className="formHeaders">Request details</h1>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="managerName">Manager</label>
              <select class="form-control" required>
                <option value="" disabled selected>
                  Select Manager
                </option>
                <option value="Volkswagen Passat">Volkswagen Passat</option>
                <option value="Manyal">Manyal</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="function">Function</label>
              <select class="form-control" required>
                <option value="" disabled selected>
                  Select Function
                </option>
                <option value="knxksandx">Volkswagen Passat</option>
                <option value="xdsnjksdxn">Manyal</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="jobTitle">Job Title</label>
              <select class="form-control" required>
                <option value="" disabled selected>
                  Select Title
                </option>
                <option value="Volkswagen Passat">Volkswagen Passat</option>
                <option value="Manyal">Manyal</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="replacmentFor">Replacment for</label>
              <input
                type="text"
                class="form-control"
                id="replacmentFor"
                disabled={!marked}
              ></input>
            </div>
            <div class="form-group col-md-4">
              <label for="numberOfRequests">Number of requests</label>
              <input
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
          <h1 className="formHeaders">Request details</h1>
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
                  <option  value="" disabled selected>
                    Select Category
                  </option>
                  <option value="app dev">app dev</option>
                  <option value="web">Web</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="function">Sub-category</label>
                <select
                  id = "sub"
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
                    <td><button type="button" class="btn btn-link" onClick={event => handleDelete(event,index)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button class="btn btn-primary sub" type="submit">Submit</button>
          <button type="button" class="btn canc btn-danger">Cancel</button>
        </form>
      </div>
    </div>
  );
}
