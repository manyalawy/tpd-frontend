import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, history } from "./_helpers";
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
    <Route exact path="/release-requests" component={Release} />
    <Route exact path="/release-requests/add" component={ReleaseForm} />
    <Route exact path="/release-requests/edit" component={ReleaseForm} />
    <Route exact path="/resource-requests" component={Resource} />
    <Route exact path="/resource-requests/add" component={ResourceForm} />
    <Route exact path="/resource-requests/edit" component={ResourceForm} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/skill-Tracking" component={SkillsTracking} />
    <Route exact path="/skills-history" component={SkillsHistory} />
  </>
);

ReactDOM.render(
  //<Provider store={store}>
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
  // </Provider>
  document.getElementById("root")
);
