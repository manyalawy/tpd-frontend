import "date-fns";
import React from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      //   width: theme.spacing(140),
      width: "87.5%",
      height: "70%",
      position: "fixed",
      top: "55%",
      left: "50%",
      /* bring your own prefixes */
      transform: "translate(-50%, -50%)",
      //   borderRadius: "2%",
    },
  },
  textField: {
    marginBottom: theme.spacing(3),
    borderRadius: "0px",
    boxShadow:
      "0 0px 8px 0 rgba(0, 0, 0, 0.1), 0 0px 20px 0 rgba(0, 0, 0, 0.1)",
  },
  button: {
    borderRadius: "30px",
    backgroundColor: "#02438E",
    fontWeight: "bold",
    borderColor: "#ffffff",
    border: "9px solid white",
    color: "#ffffff",
    width: "20%",
    height: "61px",
    left: "39%",
    position: "fixed",
  },
  exitButton: {
    // margin: theme.spacing(1),
    borderRadius: "50%",
    backgroundColor: "#AC2225",
    fontWeight: "bold",
    borderColor: "#ffffff",
    border: "9px solid white",
    color: "#ffffff",
    // width: "20%",
    height: "55px",
    fontSize: "30px",
    fontStyle: "bold",
    position: "fixed",
    left: "90%",
    marginTop: "-2.5%",
  },
  title: {
    color: "#ffffff",
    fontSize: "28px",
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(10),
  },
  box: {
    height: theme.spacing(41),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  datePicker: {
    width: theme.spacing(20),
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(3),
  },
  propabilityField: {
    width: theme.spacing(17),
  },
  reasonField: {
    width: theme.spacing(40),
  },
  listBox: { position: "relative", width: "12rem", marginTop: "8vh" },
  valueList: {
    listStyle: "none",
    marginTop: "4rem",
    boxShadow: "0px 5px 8px 0px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    maxHeight: "0",
    transition: "0.3s ease-in-out",
  },
  open: {
    maxHeight: "320px",
    overflow: "auto",
  },

  li: {
    position: "relative",
    height: "4rem",
    backgroundColor: "#fafcfd",
    padding: "1rem",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    opacity: "1",
    backgroundColor: "#dcdcdc",

    hover: {
      backgroundColor: "#ff908b",
    },
  },
}));

export default function ReleaseForm() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2012-07-15")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Typography variant="h2" className={clsx(classes.title)}>
        Adding A Release Request
      </Typography>

      <div className={classes.root}>
        <Paper elevation={3}>
          <button className={classes.exitButton}>X</button>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Box className={clsx(classes.box)}>
              <InputLabel htmlFor="select-multiple-native">Manager:</InputLabel>
              <br />
              <Select
                native
                value={"Youssef El Manyalwy"}
                // onChange={handleChangeMultiple}
                inputProps={{
                  id: "select-multiple-native",
                }}
                className={classes.select}
              >
                {[
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                ].map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
              <br /> <br />
              <br />
              <br />
              <br />
              <br />
              <FormControlLabel
                value="start"
                control={<Checkbox color="primary" />}
                label="Leaving"
                labelPlacement="start"
              />
            </Box>
            <Box className={clsx(classes.box)}>
              <InputLabel htmlFor="select-multiple-native">
                Employee Name:
              </InputLabel>
              <br />
              <Select
                native
                value={"Youssef El Manyalwy"}
                // onChange={handleChangeMultiple}
                inputProps={{
                  id: "select-multiple-native",
                }}
                className={classes.select}
              >
                {[
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                  "Youssef El Manyalwy",
                ].map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box className={clsx(classes.box)}>
              <TextField
                label="Employee ID"
                id="filled-size-small"
                defaultValue="Small"
                variant="filled"
                size="small"
                disabled
              />
              <br></br> <br />
              <br />
              <br />
              <br />
              <TextField
                label="Employee Title"
                id="filled-size-small"
                defaultValue="Small"
                variant="filled"
                size="small"
                disabled
              />
              <br></br> <br />
              <br />
              <br />
              <br />
              <TextField
                label="Function"
                id="filled-size-small"
                defaultValue="Small"
                variant="filled"
                size="small"
                disabled
              />
            </Box>
            <Box className={clsx(classes.box)}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Release Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  className={clsx(classes.datePicker)}
                />
              </MuiPickersUtilsProvider>
              <TextField
                id="standard"
                label="Release Percentage"
                defaultValue="10%"
                className={clsx(classes.propabilityField)}
              />
              <br />
              <br /> <br />
              <TextField
                id="standard"
                label="Propability"
                defaultValue="10%"
                className={clsx(classes.propabilityField)}
              />
              <br /> <br /> <br />
              <br />
              <TextField
                id="outlined-multiline-static"
                label="Release Reason"
                multiline
                rows={3}
                defaultValue="Default Value"
                variant="outlined"
                className={clsx(classes.reasonField)}
              />
            </Box>
          </Grid>
          <button className={classes.button}>Submit</button>
        </Paper>
      </div>
    </div>
  );
}
