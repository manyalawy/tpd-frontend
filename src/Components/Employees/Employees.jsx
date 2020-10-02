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
import employeeService from "../../_services/employee.service";

import ExportIcon from "../assets/file-export-solid.svg";

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
    width: "100%",
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
    employeeService.exportAll({ Filters });
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
        <Fab
          className={classes.filtterButton}
          color="primary"
          aria-label="filter"
          onClick={() => setOpen(true)}
        >
          <FilterListIcon />
        </Fab>
        <Fab
          aria-label="export"
          className={classes.exportButton}
          onClick={expo}
        >
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
                          <Button href="#text-buttons" color="primary">
                            {row.name}
                          </Button>
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.hiring_date}</TableCell>
                        <TableCell>{row.function}</TableCell>
                        <TableCell>{row.Manager?.name}</TableCell>
                        <TableCell>{row.workgroup}</TableCell>
                        <TableCell>{row.employment_type}</TableCell>
                        <TableCell>{row.allocation_percentage}</TableCell>
                        <TableCell>
                          {row.skills_last_update_date?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          <Button href="#text-buttons" color="primary">
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
