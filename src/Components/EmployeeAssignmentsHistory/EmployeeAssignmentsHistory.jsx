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
import ExportIcon from "../assets/file-export-solid.svg";

import employeeService from "../../_services/employee.service";
import Assignments from "../Profile/MyProfileComponents/Assigments";

const columns = [
  { id: "workgroup", label: "Workgroup", minWidth: 100 },
  { id: "costCenter", label: "Cost Center", minWidth: 100 },
  { id: "managerName", label: "SDM Reporting Manager", minWidth: 100 },

  { id: "percentage", label: "Allocation Percentage", minWidth: 100 },
  { id: "startDate", label: "Start Date", minWidth: 100 },
  { id: "releaseDate", label: "Release Date", minWidth: 100 },
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
  const [assignments, setAssignments] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    employeeService.getMyAssignments().then((res) => {
      setAssignments(res.Employee?.assignments);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>My Assignments History</h1>

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
                {assignments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell>{row.workgroup}</TableCell>
                        <TableCell>{row.cost_center}</TableCell>
                        <TableCell>{row.sdm_reporting_manager}</TableCell>
                        <TableCell>{row.allocation_percentage}</TableCell>

                        <TableCell>{row.start_date?.split("T")[0]}</TableCell>
                        <TableCell>{row.release_date?.split("T")[0]}</TableCell>
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
    </div>
  );
}
