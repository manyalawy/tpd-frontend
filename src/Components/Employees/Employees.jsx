import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { employeeService } from "#Services";

import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import IconButton from "@material-ui/core/IconButton";

import { useSnackbar } from "notistack";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "hiringDate", label: "Hiring Date", minWidth: 100 },
  { id: "function", label: "Function", minWidth: 100 },
  { id: "directManager", label: "Direct Manager", minWidth: 100 },
  { id: "workgroup", label: "Workgroup", minWidth: 100 },
  { id: "employmentType", label: "Employment Type", minWidth: 100 },
  { id: "allocationPercentage", label: "Allocation Percentage", minWidth: 100 },
  { id: "lastUpdated", label: "Skills Last Updated", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

function createData(
  name,
  tit,
  date,
  func,
  man,
  work,
  emp,
  allo,
  skills,
  actions
) {
  return { name, tit, date, func, man, work, emp, allo, skills, actions };
}

const rows = [
  createData(
    "India",
    "IN",
    "xjwn",
    "wnxewn",
    "wnenxj",
    "nskwn",
    "wnxw",
    "jnwexn",
    "nskjjkn",
    "njdkn"
  ),
];

const useStyles = makeStyles({
  root: {
    width: "90%",
    marginTop: "5rem",
    marginBottom: "100px",
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
  filtterButton: {
    backgroundColor: "white",
    color: "black",
    marginLeft: "90%",
  },
  select: {
    width: "20px",
  },
});

export default function StickyHeadTable() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employees, setEmployees] = React.useState([]);
  // Filter options
  const [names, setNames] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [functions, setFunctions] = React.useState([]);
  const [wokrgroups, setWorkgroups] = React.useState([]);

  //filter values
  const [selectedName, setselectedName] = React.useState(null);
  const [selectedTitle, setselectedTitle] = React.useState(null);
  const [selectedFunction, setselectedFunction] = React.useState(null);
  const [selectedWorkgroup, setselectedWorkgroup] = React.useState(null);
  let history = useHistory();

  const nameOptions = {
    options: names,
    getOptionLabel: (option) => option,
  };
  const titleOptions = {
    options: titles,
    getOptionLabel: (option) => option,
  };
  const functionOptions = {
    options: functions,
    getOptionLabel: (option) => option,
  };
  const workgroupOptions = {
    options: wokrgroups,
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
    document.getElementById("selectWorkGroup").value = "";
    document.getElementById("selectName").value = "";
    document.getElementById("selectTitle").value = "";
    document.getElementById("selectFunction").value = "";
    setselectedName("");
    setselectedTitle("");
    setselectedFunction("");
    setselectedWorkgroup("");
    employeeService.getAll({ Filters: {} }).then((res) => {
      setEmployees(res.Employees);
    });
    setOpen(false);
  };

  const handleFilter = () => {
    var filterName = selectedName ? { name: selectedName } : "";
    var filterTitle = selectedTitle ? { title: selectedTitle } : "";
    var filterFunction = selectedFunction ? { function: selectedFunction } : "";
    var filterWorkgroup = selectedWorkgroup
      ? { workgroup: selectedWorkgroup }
      : "";
    const Filters = {
      ...filterName,
      ...filterTitle,
      ...filterFunction,
      ...filterWorkgroup,
    };
    employeeService.getAll({ Filters }).then((res) => {
      setEmployees(res.Employees);
    });
    setOpen(false);
  };

  const expo = () => {
    var filterName = selectedName ? { name: selectedName } : "";
    var filterTitle = selectedTitle ? { title: selectedTitle } : "";
    var filterFunction = selectedFunction ? { function: selectedFunction } : "";
    var filterWorkgroup = selectedWorkgroup
      ? { workgroup: selectedWorkgroup }
      : "";
    const Filters = {
      ...filterName,
      ...filterTitle,
      ...filterFunction,
      ...filterWorkgroup,
    };
    employeeService.exportAll({ Filters }).then(() => {
      enqueueSnackbar("Exported Succesfully", {
        variant: "success",
      });
    });
  };

  React.useEffect(() => {
    employeeService.getAllNames().then((res) => {
      setNames(res.Names);
    });
    employeeService.getAllFunctions().then((res) => {
      setFunctions(res.Functions);
    });
    employeeService.getAllTitles().then((res) => {
      setTitles(res.Titles);
    });
    employeeService.getAllWorkgroups().then((res) => {
      setWorkgroups(res.Workgroups);
    });

    employeeService.getAll({ Filters: {} }).then((res) => {
      setEmployees(res.Employees);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>Empolyees</h1>
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
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() =>
                              history.push({
                                pathname: "/employee-profile",
                                state: { id: row.id, editing: false },
                              })
                            }
                          >
                            {row.name}
                          </Button>
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.hiring_date?.split("T")[0]}</TableCell>
                        <TableCell>{row.function}</TableCell>
                        <TableCell>{row.Manager?.name}</TableCell>
                        <TableCell>{row.workgroup}</TableCell>
                        <TableCell>{row.employment_type}</TableCell>
                        <TableCell>{row.allocation_percentage}</TableCell>
                        <TableCell>
                          {row.skills_last_update_date?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() =>
                              history.push({
                                pathname: "/employee-profile",
                                state: { id: row.id, editing: true },
                              })
                            }
                          >
                            Edit
                          </Button>
                        </TableCell>
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
          Employee List Filter
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            onChange={(event, value) => setselectedName(value)}
            {...nameOptions}
            id="selectName"
            clearOnEscape
            value={selectedName}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Name"
                margin="normal"
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => setselectedTitle(value)}
            {...titleOptions}
            id="selectTitle"
            clearOnEscape
            value={selectedTitle}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Title"
                margin="normal"
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => setselectedWorkgroup(value)}
            {...workgroupOptions}
            id="selectWorkGroup"
            clearOnEscape
            value={selectedWorkgroup}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Workgroup"
                margin="normal"
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => setselectedFunction(value)}
            {...functionOptions}
            id="selectFunction"
            clearOnEscape
            value={selectedFunction}
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Function"
                margin="normal"
              />
            )}
          />
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
