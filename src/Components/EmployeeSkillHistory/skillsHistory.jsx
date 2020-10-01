import React, { useState, useEffect } from "react";

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
import ExportIcon from "../assets/file-export-solid.svg";
import skillsService from "../../_services/skill.service";
import employeeService from "../../_services/employee.service";

const columns = [
  { id: "employeeName", label: "Employee Name", minWidth: 100 },
  { id: "skillName", label: "Skill Name", minWidth: 100 },
  { id: "exper", label: "Experience level", minWidth: 100 },

  { id: "lastUsed", label: "Last Used", minWidth: 100 },
  { id: "manName", label: "Manager Name", minWidth: 100 },
  { id: "title", label: "Titile", minWidth: 100 },
  { id: "func", label: "Function", minWidth: 100 },
];

function createData(empName, skillName, exper, last, man, tit, fun) {
  return { empName, tit, man, last, exper, skillName, fun };
}

const rows = [
  createData("India", "IN", "xjwn", "wnxewn", "nddc", "mdsm", "nxndnj"),
];

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
    marginLeft: "90%",
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

  // Filte options
  const [employeesNames, setEmployeeNames] = useState([]);
  const [skills, setSkills] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [titles, settitles] = useState([]);

  const namesOptions = {
    options: employeesNames,
    getOptionLabel: (option) => option,
  };
  const skillsOptions = {
    options: skills,
    getOptionLabel: (option) => option.skill_name,
  };
  const functionsOptions = {
    options: functions,
    getOptionLabel: (option) => option,
  };
  const titlesOptions = {
    options: titles,
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
    document.getElementById("selectSkills").value = "";
    document.getElementById("selectFunction").value = "";
    document.getElementById("selectTitle").value = "";
  };

  useEffect(() => {
    employeeService.getAllNames().then((res) => {
      setEmployeeNames(res.Names);
    });

    employeeService.getAllFunctions().then((res) => {
      setFunctions(res.Functions);
    });

    employeeService.getAllTitles().then((res) => {
      settitles(res.Titles);
    });

    skillsService.getAllSkills().then((res) => {
      setSkills(res.Skills);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>Employee Skills History</h1>
      <div className={classes.buttons}>
        <Fab aria-label="filter" onClick={() => setOpen(true)}>
          <FilterListIcon />
        </Fab>
        <Fab aria-label="export" className={classes.exportButton}>
          <img
            style={{
              width: "24px",
              margin: "auto",
            }}
            src={ExportIcon}
          ></img>
        </Fab>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.empName}
                      >
                        <TableCell>{row.empName}</TableCell>
                        <TableCell>{row.skillName}</TableCell>
                        <TableCell>{row.exper}</TableCell>
                        <TableCell>{row.last}</TableCell>

                        <TableCell>{row.man}</TableCell>
                        <TableCell>{row.tit}</TableCell>
                        <TableCell>{row.fun}</TableCell>
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
            {...namesOptions}
            id="selectName"
            clearOnEscape
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
            {...skillsOptions}
            id="selectSkills"
            clearOnEscape
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Skills Name"
                margin="normal"
              />
            )}
          />
          <Autocomplete
            {...functionsOptions}
            id="selectFunction"
            clearOnEscape
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
          <Autocomplete
            {...titlesOptions}
            id="selectTitle"
            clearOnEscape
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];
