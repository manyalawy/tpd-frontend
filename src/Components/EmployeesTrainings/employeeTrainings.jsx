import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import trainingService from "../../_services/training.service";
import employeeService from "../../_services/employee.service";

import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import IconButton from "@material-ui/core/IconButton";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const columns = [
  { id: "employeeName", label: "Employee Name", minWidth: 100 },
  { id: "activityName", label: "Training Activity Name", minWidth: 100 },
  { id: "eventName", label: "Training Event Name", minWidth: 100 },
  { id: "fromDate", label: "Event From Date", minWidth: 100 },
  { id: "toDate", label: "Event To Date", minWidth: 100 },
  { id: "totalHours", label: "Training Total Hours", minWidth: 100 },
];

function createData(empName, tit, manName, last) {
  return { empName, tit, manName, last };
}

const rows = [createData("India", "IN", "xjwn", "wnxewn")];

const useStyles = makeStyles({
  root: {
    width: "90%",
    marginTop: "5rem",
  },
  container: {
    maxHeight: 440,
  },
  title: {
    color: "white",
    marginTop: "5rem",
    marginLeft: "5rem",
    fontSize: " 60px",
  },
  buttons: {
    color: "black",
    marginLeft: "85%",
  },
  select: {
    width: "20px",
  },
  exportButton: {
    color: "black",
    marginLeft: "6px",
  },
});

export default function StickyHeadTable() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [trainings, setTrainings] = React.useState([]);
  // Filte options
  const [employeesNames, setEmployeeNames] = React.useState([]);
  const [activityNames, setActivityNames] = React.useState([]);
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());

  //filter values
  const [selectedName, setselectedName] = React.useState(null);
  const [selectedActivty, setselectedActivty] = React.useState(null);
  const [selectedFromDate, setselectedFromDate] = React.useState(null);
  const [selectedToDate, setselectedToDate] = React.useState(null);

  const namesOptions = {
    options: employeesNames,
    getOptionLabel: (option) => option,
  };
  const activityOptions = {
    options: activityNames,
    getOptionLabel: (option) => option,
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    document.getElementById("selectName").value = "";
    document.getElementById("selectActivity").value = "";
    setselectedName("");
    setselectedActivty("");
    setselectedFromDate("");
    setselectedToDate("");

    trainingService.getAllEmployeeTrainings({ Filters: {} }).then((res) => {
      setTrainings(res.Trainings);
    });
  };

  const handleFilter = () => {
    var filterName = selectedName ? { employee_name: selectedName } : "";
    var filterActivty = selectedActivty
      ? { training_activity_name: selectedActivty }
      : "";
    var filterFromDate = selectedFromDate
      ? { event_from_date: selectedFromDate }
      : "";
    var filterToDate = selectedToDate ? { event_to_date: selectedToDate } : "";

    const Filters = {
      ...filterName,
      ...filterActivty,
      ...filterFromDate,
      ...filterToDate,
    };
    trainingService.getAllEmployeeTrainings({ Filters }).then((res) => {
      setTrainings(res.Trainings);
    });
    setOpen(false);
  };

  const expo = () => {
    var filterName = selectedName ? { employee_name: selectedName } : "";
    var filterActivty = selectedActivty
      ? { training_activity_name: selectedActivty }
      : "";
    var filterFromDate = selectedFromDate
      ? { event_from_date: selectedFromDate }
      : "";
    var filterToDate = selectedToDate ? { event_to_date: selectedToDate } : "";

    const Filters = {
      ...filterName,
      ...filterActivty,
      ...filterFromDate,
      ...filterToDate,
    };
    trainingService.exportEmployeeTrainings({ Filters });
  };

  React.useEffect(() => {
    employeeService.getAllNames().then((res) => {
      setEmployeeNames(res.Names);
    });

    trainingService.getAllEmployeeTrainings({ Filters: {} }).then((res) => {
      setTrainings(res.Trainings);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>Employee Trainings </h1>
      <div className={classes.buttons}>
        <IconButton
          color="inherit"
          aria-label="filter"
          edge="start"
          style={{
            backgroundColor: "#F6EC5A",
            margin: "10px",
            color: "#000000",
          }}
          onClick={() => setOpen(true)}
        >
          <img style={{ width: "100%", height: "auto" }} src={FilterIcon}></img>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="export"
          edge="start"
          style={{
            backgroundColor: "#084791",
            margin: "10px",
            color: "#ffffff",
          }}
          onClick={expo}
        >
          <img
            style={{
              width: "24px",
              margin: "auto",
            }}
            src={ExportIcon}
          ></img>
        </IconButton>
      </div>
      <Grid container justify="center" alignItems="center">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {trainings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell>{row.employee_profile.name}</TableCell>
                        <TableCell>{row.training_activity_name}</TableCell>
                        <TableCell>{row.training_event_name}</TableCell>

                        <TableCell>
                          {row.event_from_date?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {row.event_to_date?.split("T")[0]}
                        </TableCell>
                        <TableCell>{row.total_training_hours}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Employee Trainings Filter
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            onChange={(event, value) => setselectedName(value)}
            {...namesOptions}
            id="selectName"
            clearOnEscape
            value={selectedName}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Employee Name"
                margin="normal"
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => setselectedActivty(value)}
            {...activityOptions}
            id="selectActivity"
            clearOnEscape
            value={selectedActivty}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Activity Name"
                margin="normal"
              />
            )}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="selectFrom"
              label="From Date"
              value={selectedFromDate}
              onChange={(date) => setFromDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="selectTo"
              label="To Date"
              value={selectedToDate}
              onChange={(date) => setToDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilter} color="primary">
            Filter
          </Button>
          <Button onClick={handleReset} color="primary" autoFocus>
            Reset Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const statusOptions = ["Last Updated", "Non-registered"];
