import React, { useEffect, useState } from "react";

const apiUrl = "http://localhost:3001/release-request/all";

const TestBackend = () => {
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return <div></div>;
};

export default TestBackend;
