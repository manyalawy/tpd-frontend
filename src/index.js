import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, history } from "./_helpers";
import PrivateRoute from "../src/_helpers/PrivateRoute.jsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import SideMenu from "./Components/SideMenu/SideMenu.jsx";
import Resource from "./Components/ResourceReq/resource.jsx";
import LoginPage from "./Components/Login/Login.jsx";
import { Router, Switch, Route } from "react-router-dom";

import ReleaseForm from "./Components/ReleaseForm/ReleaseForm.jsx";
import ResourceForm from "./Components/ResourceForm/ResourceForm.jsx";
import Release from "./Components/ReleaseReq/ReleaseReq.jsx";

import Profile from "./Components/Profile/Profile.jsx";
import Employees from "./Components/Employees";

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
    <Route exact path="/" component={Profile} />
  </>
);

ReactDOM.render(
  //<Provider store={store}>
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <Switch>
        {/* <Route exact path="/login" component={LoginContainer} /> */}
        {/* <PrivateRoute component={DefaultContainer} /> */}
        <Employees />
      </Switch>
    </ThemeProvider>
  </Router>,
  // </Provider>
  document.getElementById("root")
);
