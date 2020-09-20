import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { sizing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "@material-ui/core/Link";
import GetAppIcon from "@material-ui/icons/GetApp";
import { yellow500 } from "@material-ui/core/colors/yellow";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F6EC5A",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#084791",
    },
  },
});
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#AC2225",
    color: theme.palette.common.white,
  },
}))(TableCell);

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

function createData(
  RefNo,
  Manager,
  Function,
  Title,
  StartDate,
  EndDate,
  Percentage,
  Status,
  ActionsTaken,
  Actions
) {
  return {
    RefNo,
    Manager,
    Function,
    Title,
    StartDate,
    EndDate,
    Percentage,
    Status,
    ActionsTaken,
    Actions,
  };
}
const rows = [
  createData(
    1,
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen yoghurt",
    3453535,
    334534455,
    35,
    "Frozen yoghurt",
    "Frozen yoghurt",
    535
  ),
];
export default function Resource() {
  const classes = useStyles();
  const classes1 = useStyles1();

  return (
    <MuiThemeProvider theme={themeDark}>
      <Box mt={2} height={200} style={{ backgroundColor: "#AC2225" }}>
        <Box pt={15} ml={2}>
          <WhiteTextTypography variant="h3">
            Resource requests
          </WhiteTextTypography>
        </Box>
      </Box>

      <Box mx={145} mt={11}>
        <div className={classes1.root}>
          <ThemeProvider theme={theme}>
            <Link href="#">
              <Fab aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Link href="#">
              <Fab color="secondary" aria-label="edit">
                <GetAppIcon />
              </Fab>
            </Link>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Link href="#">
              <Fab color="primary" aria-label="edit">
                <FilterListIcon />
              </Fab>
            </Link>
          </ThemeProvider>
        </div>
      </Box>

      <Box width="90%" mt={10} mx="auto">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Ref No.</StyledTableCell>
                <StyledTableCell align="center">Manager</StyledTableCell>
                <StyledTableCell align="center">Funtion</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Percentage</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Actions taken</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.RefNo}>
                  <TableCell
                    align="center"
                    style={{ color: "black" }}
                    component="th"
                    scope="row"
                  >
                    {row.RefNo}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Manager}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Function}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Title}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.StartDate}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.EndDate}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Percentage}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Status}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.ActionsTaken}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="center">
                    {row.Actions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MuiThemeProvider>
  );
}
