import React, { useEffect } from "react";

import { employeeService } from "#Services";

export default function Skills(props) {
    const [skills, setSkills] = React.useState([]);

    //fetch User Skils
    useEffect(() => {
        employeeService.getEmployeeSkills({ employee_id: props?.id }).then((res) => {
            setSkills(res.Employee?.employee_skills);
        });
    }, []);

    return (
        <div className="mySkills">
            <h1>Skills</h1>

            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"> Skill Name</th>
                        <th scope="col">Experience Level</th>
                        <th scope="col">Last Used</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr>
                            <th scope="row">{skill.skill.skill_name}</th>
                            <td>{skill.experience_level}</td>
                            <td>{skill.last_used_date?.split("T")[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
