import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ReleaseReq.css";

export default function ReleaseReq() {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const statusFilter = {
    options: status,
    getOptionLabel: (option) => option.status,
  };
  function resetFilter() {
    document.getElementById("filterManager").value = "";
    document.getElementById("filterEmployeeTitle").value = "";
    document.getElementById("filterFunction").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterEmployeeName").value = "";
  }
  return (
    <div>
      <h1 className="resourceTitle">Release requests</h1>

      <div className="float-right">
        <button class="btn btn-primary buttons addButton" type="submit">
          Add
        </button>
        <button
          class="btn btn-primary buttons filterButton"
          type="button"
          data-toggle="modal"
          data-target="#releaseFilterModal"
        >
          Filter
        </button>
        <button class="btn btn-primary buttons" type="submit">
          Export
        </button>
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
            <tr>
              <th scope="row">Hi</th>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td>HIII</td>
              <td className="btn-group">
                <button type="button" class="btn btn-link">
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-link"
                  data-toggle="modal"
                  data-target="#deleteRelease"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
                    id="filterEmployeeTitle"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Title"
                        margin="normal"
                      />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterFunction"
                    renderInput={(params) => (
                      <TextField {...params} label="Function" margin="normal" />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...defaultProps}
                    id="filterEmployeeName"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        margin="normal"
                      />
                    )}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    {...statusFilter}
                    id="filterStatus"
                    renderInput={(params) => (
                      <TextField {...params} label="Status" margin="normal" />
                    )}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Filter
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={resetFilter}
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
              number:
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary">
                Yes
              </button>
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
  { status: "Moved" },
  { status: "Left" },
  { status: "Booked" },
];
