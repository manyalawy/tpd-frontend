import React from "react";

import { employeeService } from "#Services";

export default function Trainings(props) {
    const [trainings, setTrainings] = React.useState([]);

    //fetch User trainings
    React.useEffect(() => {
        employeeService.getEmployeeTrainings({ employee_id: props?.id }).then((res) => {
            setTrainings(res.Employee?.employee_trainings);
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
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((training) => (
                            <tr>
                                <th scope="row">{training.training_activity_name}</th>
                                <td>{training.training_event_name}</td>
                                <td>{training.event_from_date?.split("T")[0]}</td>
                                <td>{training.event_to_date?.split("T")[0]}</td>
                                <td>{training.total_training_hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
