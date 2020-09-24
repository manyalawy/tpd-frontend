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
import ResourceForm from "./Components/ResourceForm/ResourceForm.js";
import Release from "./Components/ReleaseReq/ReleaseReq.jsx";
import TestBackend from "./Components/TestBackend/TestBackend.jsx";

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

ReactDOM.render(
  // <Router>
  //   <ThemeProvider theme={theme}>
  //     <SideMenu />
  //     <ResourceForm />
  //     <TestBackend />
  //   </ThemeProvider>
  // </Router>,

  //<Provider store={store}>
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={Resource} />
        <PrivateRoute path="/home" component={SideMenu} />
      </Switch>
    </ThemeProvider>
  </Router>,
  // </Provider>
  document.getElementById("root")
);
