import React from "react";

//service
import employeeService from "../../../_services/employee.service";

export default function Trainings() {
  const [trainings, setTrainings] = React.useState([]);

  //fetch User trainings
  React.useEffect(() => {
    employeeService.getMyTrainings().then((res) => {
      setTrainings(res.Employee?.employee_trainings);
      console.log(res.Employee);
    });
  }, []);

  return (
    <div className="trainings">
      <h1 className="myTrainingsTitle">Trainings</h1>

      <div className="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col"> Training Activity Name</th>
              <th scope="col">Training Event Name</th>
              <th scope="col">Event From Date</th>
              <th scope="col">Event To Date</th>
              <th scope="col">Training Total Hours</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr>
                <th scope="row">{training.training_activity_name}</th>
                <td>{training.training_event_name}</td>
                <td>{training.event_from_date}</td>
                <td>{training.event_to_date}</td>
                <td>{training.total_training_hours}</td>

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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
