import React from "react";
import "../Profile.css";

export default function SkillsAndCer() {
  return (
    <div className="skillsAndCer">
      <div>
        <h1>Skills</h1>

        <div class="text-right mb-3">
          <button
            type="button"
            class="btn btn-dark addMySkill"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add skill
          </button>
        </div>

        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col"> Skill Name</th>
              <th scope="col">Experience Level</th>
              <th scope="col">Last Used</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Java</th>
              <td>Beginner</td>
              <td>Last used</td>
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

      <div className="certifications">
        <h1>Certifications</h1>
        <div className="visible">
          <div class="text-right mb-3">
            <button
              display="none"
              type="button"
              class="btn btn-dark mr-auto addMyCertification"
            >
              Add Certification
            </button>
          </div>
        </div>
        <div className="table-responsive-md">
          <table class="table table-striped">
            <thead class="certificationsTableHead">
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
    </div>
  );
}
