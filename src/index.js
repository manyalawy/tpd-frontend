import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./Components/NavigationBar/nav-bar.js";
import SideMenu from "./Components/SideMenu/SideMenu.jsx";

ReactDOM.render(
  <>
    <NavBar /> <SideMenu />
  </>,
  document.getElementById("root")
);
