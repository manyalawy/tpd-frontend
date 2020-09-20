import React from "react";
import "./resource.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function Resource() {
  return (
    <div>
      <h1 className="resourceTitle">Resource requests</h1>
      <div className="row">
        <div class="col-md-4 offset-md-8">
          <button class="btn btn-primary buttons" type="submit">
            Add
          </button>
          <button class="btn btn-primary buttons" type="submit">
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
