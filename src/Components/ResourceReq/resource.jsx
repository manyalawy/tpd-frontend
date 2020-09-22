import React, { useState, useEffect } from "react";
import "./resource.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import resourceServices from "../../_services/resource-request.service";

export default function Resource() {
  const [resourceRequests, setResourceRequests] = useState([]);

  useEffect(() => {
    resourceServices
      .getAll({
        Page: 0,
        Limit: 10,
        Filters: {},
      })
      .then((res) => {
        setResourceRequests(res.ResourceRequests);
        // console.log(res);
      });
  }, []);

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const statusFilter = {
    options: status,
    getOptionLabel: (option) => option.status,
  };
  function handleClick() {
    document.getElementById("filterManager").value = "";
    document.getElementById("filterTitle").value = "";
    document.getElementById("filterFunction").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterCategory").value = "";
    document.getElementById("filterSubCategory").value = "";
  }

  return (
    <div>
      <h1 className="resourceTitle">Resource requests</h1>
      <div className="row">
        <div class="col-md-4 offset-md-8">
          <button class="btn btn-primary buttons addButton" type="submit">
            Add
          </button>
          <button
            class="btn btn-primary buttons filterButton"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Filter
          </button>
          <button class="btn btn-primary buttons" type="submit">
            Export
          </button>
        </div>
      </div>
      <div className="table-responsive-lg">
        <table class="table resourceTable mx-auto table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Ref No.</th>
              <th scope="col">Manager</th>
              <th scope="col">Function</th>
              <th scope="col">Title</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Probability</th>
              <th scope="col">Percentage</th>
              <th scope="col">Status</th>
              <th scope="col">Action Taken</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourceRequests.map((resourceRequest) => (
              <tr>
                <th scope="row">{resourceRequest.reference_number}</th>
                <td>{resourceRequest.manager_name}</td>
                <td>{resourceRequest.function}</td>
                <td>{resourceRequest.title}</td>
                <td>{resourceRequest.start_date}</td>
                <td>{resourceRequest.end_date}</td>
                <td>{resourceRequest.propability}</td>
                <td>{resourceRequest.percentage}</td>
                <td>{resourceRequest.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="resourceTableFilter"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg rtm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="resourceTableFilter">
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
              <div class="modal-body row ">
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterManager"
                    renderInput={(params) => (
                      <TextField {...params} label="Manager" margin="normal" />
                    )}
                  />
                </div>

                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterTitle"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Title" margin="normal" />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterFunction"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Function" margin="normal" />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...statusFilter}
                    id="filterStatus"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Status" margin="normal" />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterCategory"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Category" margin="normal" />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterSubCategory"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub-Category"
                        margin="normal"
                      />
                    )}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary filter"
                  data-dismiss="modal"
                >
                  Filter
                </button>
                <button
                  onClick={handleClick}
                  type="button"
                  class="btn btn-primary reset"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        </div>
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
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
];
const status = [
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
