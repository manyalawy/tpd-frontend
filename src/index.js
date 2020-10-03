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
import AssignmentsHisotry from "./Components/AssignmentsHistory/AssignmentHistory";

import Employees from "./Components/Employees/Employees";
import SkillListing from "./Components/SkillListing/skillListing";
import SkillsTracking from "./Components/EmployeesSkillsTracking/skillsTracking";
import SkillsHistory from "./Components/EmployeeSkillHistory/skillsHistory";
import Certifications from "./Components/Certifications/certifications";
import TPDGuard from "./Components/Guards/TPDGuard.js";
import CerHistory from "./Components/CertificateHistory/cerHistory";
import EmployeeTrainings from "./Components/EmployeesTrainings/employeeTrainings";
import EmployeeProfile from "./Components/EmployeeProfile/Profile";
import EmployeeAssignementHistory from "./Components/EmployeeAssignmentsHistory/EmployeeAssignmentsHistory.jsx";
import CertificationProviders from "./Components/Certifications/CertificationCompnents/providers";
import MyTrainings from "./Components/Profile/MyProfileComponents/Trainings";
import MySkills from "./Components/Profile/MyProfileComponents/skills";
import MyCertifications from "./Components/Profile/MyProfileComponents/certificates";
import MyAssignments from "./Components/Profile/MyProfileComponents/Assigments";
import MyAssignmentsHistory from "./Components/AssignmentsHistory/AssignmentHistory";
import ManagerTPDGuard from "./Components/Guards/ManagerTPDGuard";

import { accountProperties } from "./_helpers";

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
    {accountProperties().roles?.includes("TPD Team") ? (
      <ManagerTPDGuard>
        <Route exact path="/" component={Release} />
      </ManagerTPDGuard>
    ) : accountProperties().roles?.includes("Manager") ? (
      <ManagerTPDGuard>
        <Route exact path="/" component={Release} />
      </ManagerTPDGuard>
    ) : (
      <>
        <div style={{ margin: "40px" }}>
          <h1 style={{ color: "White" }}>Current Assignments</h1>
          <Route exact path="/" component={MyAssignments} />
        </div>
      </>
    )}

    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/trainings" component={MyTrainings} />
    <Route exact path="/profile/skills" component={MySkills} />
    <Route exact path="/profile/certifications" component={MyCertifications} />
    <Route exact path="/profile/assignments" component={MyAssignments} />
    <Route
      exact
      path="/profile/assignments/history"
      component={MyAssignmentsHistory}
    />
    <TPDGuard>
      <Route
        exact
        path="/profile/assignments-history"
        component={AssignmentsHisotry}
      />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/employee-profile" component={EmployeeProfile} />
    </TPDGuard>
    <TPDGuard>
      <Route
        exact
        path="/employee-profile/assignments-history"
        component={EmployeeAssignementHistory}
      />
    </TPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests" component={Release} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests/add" component={ReleaseForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/release-requests/edit" component={ReleaseForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests" component={Resource} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests/add" component={ResourceForm} />
    </ManagerTPDGuard>
    <ManagerTPDGuard>
      <Route exact path="/resource-requests/edit" component={ResourceForm} />
    </ManagerTPDGuard>
    <TPDGuard>
      <Route exact path="/certifications-history" component={CerHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skill-tracking" component={SkillsTracking} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/skills-history" component={SkillsHistory} />
    </TPDGuard>
    <TPDGuard>
      <Route exact path="/certifications-list" component={Certifications} />
    </TPDGuard>
    <TPDGuard>
      <Route
        exact
        path="/certification-providers"
        component={CertificationProviders}
      />
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
