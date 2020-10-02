import React from "react";
import ReactDOM from "react-dom";
import { history } from "./_helpers";
import PrivateRoute from "../src/_helpers/PrivateRoute.jsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import SideMenu from "./Components/SideMenu/SideMenu.jsx";
import LoginPage from "./Components/Login/Login.jsx";
import { Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
//Release & Resource Components
import ReleaseForm from "./Components/ReleaseForm/ReleaseForm.jsx";
import Resource from "./Components/ResourceReq/resource.jsx";
import ResourceForm from "./Components/ResourceForm/ResourceForm.jsx";
import Release from "./Components/ReleaseReq/ReleaseReq.jsx";
import Profile from "./Components/Profile/Profile.jsx";

import Employees from "./Components/Employees/Employees";
import SkillListing from "./Components/SkillListing/skillListing";
import SkillsTracking from "./Components/EmployeesSkillsTracking/skillsTracking";
import SkillsHistory from "./Components/EmployeeSkillHistory/skillsHistory";
import Certifications from "./Components/Certifications/certifications";
import TPDGuard from "./Components/Guards/TPDGuard.js";
import CerHistory from "./Components/CertificateHistory/cerHistory";
import EmployeeTrainings from "./Components/EmployeesTrainings/employeeTrainings";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"',
      "-apple-system",
      "BlinkMacSystemFont",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const LoginContainer = () => <Route path="/login" component={LoginPage} />;

const DefaultContainer = () => (
  <>
    <SideMenu />
    <Route exact path="/profile" component={Profile} />
    <TPDGuard>
      <Route exact path="/release-requests" component={Release} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/release-requests/add" component={ReleaseForm} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/release-requests/edit" component={ReleaseForm} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/resource-requests" component={Resource} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/resource-requests/add" component={ResourceForm} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/resource-requests/edit" component={ResourceForm} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/cerHistory" component={CerHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skill-Tracking" component={SkillsTracking} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skills-history" component={SkillsHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/certifications-list" component={Certifications} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skills-listing" component={SkillListing} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employee-trainings" component={EmployeeTrainings} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employees" component={Employees} />
    </TPDGuard>
  </>
);

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute component={DefaultContainer} />
        </Switch>
      </SnackbarProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
