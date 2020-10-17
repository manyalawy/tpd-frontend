import React from "react";
import ReactDOM from "react-dom";
import { PrivateRoute, history } from "#Helpers";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { LoginContainer, DefaultContainer } from "./Components/Containers";

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
