import React, { useEffect, useState } from "react";
import releaseServices from "../../_services/release-request.service";
const apiUrl = process.env.REACT_APP_BACKEND_API_URL + "/release-request/all";

const TestBackend = () => {
  useEffect(() => {
    releaseServices.getAll().then((res) => console.log(res));
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     console.log(apiUrl);
    //   });
  }, []);
  return <div></div>;
};

export default TestBackend;
