import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, PrivateRoute, history } from "./_helpers";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import SideMenu from "./Components/SideMenu/SideMenu.jsx";
import LoginPage from "./Components/Login/Login.jsx";
import ResourceForm from "./Components/ResourceForm/ResourceForm.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/">
            <ResourceForm />
          </Route>
          <Route path="/public">
            <LoginPage />
          </Route>
          <PrivateRoute path="/home">
            <SideMenu />
          </PrivateRoute>
        </Switch>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
