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
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { employeeService, skillService } from "#Services";

import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import IconButton from "@material-ui/core/IconButton";

import { useSnackbar } from "notistack";

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

var Filters = {};

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
  const [skillsHistory, setskillsHistory] = useState([]);

  // Filte options
  const [employeesNames, setEmployeeNames] = useState([]);
  const [skills, setSkills] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [titles, settitles] = useState([]);

  //filter values
  const [selectedName, setselectedName] = useState(null);
  const [selectedSkill, setselectedSkill] = useState(null);
  const [selectedFunction, setselectedFunction] = useState(null);
  const [selectedTitile, setselectedTitile] = useState(null);

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

  const handleFilter = () => {
    var filterName = selectedName ? { name: selectedName } : "";
    var filterskill = selectedSkill
      ? { skill_id: parseInt(selectedSkill.skill_id) }
      : "";
    var filterFunction = selectedFunction ? { function: selectedFunction } : "";
    var filterTitle = selectedTitile ? { function: selectedTitile } : "";
    Filters = {
      ...filterName,
      ...filterskill,
      ...filterFunction,
      ...filterTitle,
    };
    skillService.getSkillHistory({ Filters }).then((res) => {
      setskillsHistory(res.Skills);
    });
    setOpen(false);
  };

  const expo = () => {
    skillService.export({ Filters }).then(() => {
      enqueueSnackbar("Exported Succesfully", {
        variant: "success",
      });
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    document.getElementById("selectName").value = null;
    document.getElementById("selectSkills").value = null;
    document.getElementById("selectFunction").value = null;
    document.getElementById("selectTitle").value = null;
    skillService.getSkillHistory({ Filters: {} }).then((res) => {
      setskillsHistory(res.Skills);
    });
    setOpen(false);
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

    skillService.getAllSkills().then((res) => {
      setSkills(res.Skills);
    });

    skillService.getSkillHistory({ Filters: {} }).then((res) => {
      setskillsHistory(res.Skills);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>Employee Skills History</h1>
      <div className={classes.buttons}>
        <IconButton
          color="inherit"
          aria-label="filter"
          onClick={() => setOpen(true)}
          edge="start"
          style={{
            backgroundColor: "#F6EC5A",
            margin: "10px",
            color: "#000000",
          }}
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
                {skillsHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell>{row.employee_profile.name}</TableCell>
                        <TableCell>{row.skill.skill_name}</TableCell>
                        <TableCell>
                          {row.employee_skill?.experience_level}
                        </TableCell>
                        <TableCell>
                          {row.last_used_date?.split("T")[0]}
                        </TableCell>

                        <TableCell>{row.manager_name}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.function}</TableCell>
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
        disableBackdropClick={true}
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
            onChange={(event, value) => setselectedSkill(value)}
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
            onChange={(event, value) => setselectedFunction(value)}
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
            onChange={(event, value) => setselectedTitile(value)}
            {...titlesOptions}
            id="selectTitle"
            onChange={(event, value) => console.log(value)}
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];
