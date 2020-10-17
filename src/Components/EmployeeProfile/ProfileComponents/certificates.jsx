import React from "react";
import "../Profile.css";

import { employeeService } from "#Services";

export default function Certificates(props) {
    const [certificates, setCertificates] = React.useState([]);

    //fetch User certifactes
    React.useEffect(() => {
        employeeService.getEmployeeCertificates({ employee_id: props.id }).then((res) => {
            setCertificates(res.Employee?.employee_certifications);
        });
    }, []);

    return (
        <div className="MyCertifications">
            <h1>Certifications</h1>
            <div className="table-responsive-md">
                <table class="table table-striped">
                    <thead class="certificationsTableHead">
                        <tr>
                            <th scope="col"> Certification provider</th>
                            <th scope="col">Certification Name</th>
                            <th scope="col">Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates.map((certificate) => (
                            <tr>
                                <th scope="row">
                                    {
                                        certificate.certification?.certification_provider
                                            ?.certification_provider_name
                                    }
                                </th>
                                <td>{certificate.certification?.certification_name}</td>
                                <td>{certificate.expiration_date?.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
