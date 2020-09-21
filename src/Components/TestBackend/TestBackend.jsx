import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL + "/release-request/all";

const TestBackend = () => {
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(apiUrl);
      });
  }, []);
  return <div></div>;
};

export default TestBackend;
