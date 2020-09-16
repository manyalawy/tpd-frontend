import React from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./assets/ITWorx Flat Logo.png";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(55),
      height: theme.spacing(55),
      position: "fixed",
      top: "50%",
      left: "50%",
      /* bring your own prefixes */
      transform: "translate(-50%, -50%)",
      borderRadius: "7%",
    },
  },
  textField: {
    marginBottom: theme.spacing(3),
    borderRadius: "0px",
    boxShadow:
      "0 0px 8px 0 rgba(0, 0, 0, 0.1), 0 0px 20px 0 rgba(0, 0, 0, 0.1)",
  },
  logo: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(7),
  },
  tpd: {
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(5),
    right: "70px",
    top: "115px",
    position: "absolute",
    fontSize: "40px",
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "30px",
    backgroundColor: "#AC2225",
    fontWeight: "bold",
  },
}));

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

export default function Login() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid container direction="column" justify="center" alignItems="center">
          <img src={Logo} className={clsx(classes.logo)} width="90%" />
          <Typography variant="h3" gutterBottom className={clsx(classes.tpd)}>
            TPD
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={clsx(classes.textField)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className={clsx(classes.textField)}
          />
          <Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={login}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}
