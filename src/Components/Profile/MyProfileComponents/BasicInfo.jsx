import React, { useState, useEffect } from "react";
import { employeeService } from "#Services";

import "../Profile.css";

export default function BasicInfo() {
    const [employeeDetails, setEmployeeDetails] = useState({});

    //fetch User Data
    useEffect(() => {
        employeeService.getMyDetails().then((res) => {
            setEmployeeDetails(res.Employee);
        });
    }, []);

    return (
        <div className="basicInfo">
            <div class="row basicInfoRow">
                <div class="col-lg-4 col-sm-12">
                    Hiring date: {employeeDetails?.hiring_date?.split("T")[0]}
                </div>
                <div class="col-lg-4 col-sm-12">ID: {employeeDetails.id}</div>
                <div class="col-lg-4 col-sm-12">
                    Mobile number: {employeeDetails?.mobile_number}
                </div>
            </div>
            <div class="row basicInfoRow">
                <div class="col-lg-4 col-sm-12">
                    Direct manager: {employeeDetails?.Manager?.name}
                </div>
                <div class="col-lg-4 col-sm-12">Workgroup: {employeeDetails?.workgroup}</div>
                <div class="col-lg-4 col-sm-12">Function: {employeeDetails?.function}</div>
            </div>
            <div class="row basicInfoRow">
                <div class="col-lg-4 col-sm-12">Cost Center: {employeeDetails?.cost_center}</div>
                <div class="col-lg-4 col-sm-12">
                    Employment Type: {employeeDetails?.employment_type}
                </div>
            </div>
        </div>
    );
}
