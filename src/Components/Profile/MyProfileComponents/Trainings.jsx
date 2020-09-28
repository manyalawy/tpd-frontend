import React from "react";

export default function Trainings() {
  return (
    <div className="trainings">
      <h1 className="myTrainingsTitle">Trainings</h1>

      <div className="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col"> Certification provider</th>
              <th scope="col">Certification Name</th>
              <th scope="col">Expiration Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Udemy</th>
              <td>Web development</td>
              <td>11/1/2020</td>
              <td>
                <button type="button" class="btn btn-link">
                  Edit
                </button>
                |
                <button type="button" class="btn btn-link">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
