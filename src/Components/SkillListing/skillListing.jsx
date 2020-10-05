import React, { useState } from "react";
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
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import skillService from "../../_services/skill.service";

import IconButton from "@material-ui/core/IconButton";
import ExportIcon from "../assets/file-export-solid.svg";

import DeleteIcon from "@material-ui/icons/Delete";
import { parse } from "date-fns";

const columns = [
  { id: "skillName", label: "Skill Name", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];

function createData(skill, id) {
  return { skill, id };
}

var rows = [];

const useStyles = makeStyles({
  root: {
    width: "40%",
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  searchBar: {
    backgroundColor: "white",
    marginLeft: "70%",
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
    marginLeft: "1%",
  },
  select: {
    width: "20px",
  },
});
var unchanged = [];

export default function SkillListing() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [skillsTable, setSkillsTable] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedID, setselectedID] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setEditMode(false);
    }, 400);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (skill, id) => {
    setEditMode(true);
    setOpen(true);
    setSelectedSkill(skill);
    setselectedID(id);
  };

  const handleClose = () => {
    setEditMode(false);
    setOpen(false);
  };
  const handleAdd = () => {
    if (selectedSkill != null && selectedSkill !== "") {
      if (editMode == true) {
        skillService
          .editSkill({
            Skill: {
              skill_id: parseInt(selectedID),
              skill_name: selectedSkill,
            },
          })
          .then((res) => {
            refresh();
          });
      } else {
        skillService
          .addSkill({
            Skill: {
              skill_name: selectedSkill,
            },
          })
          .then((res) => {
            refresh();
          });
      }
      setOpen(false);
      setEditMode(false);
    }
  };

  const handleDelete = (id) => {
    skillService.deleteSkill({ skill_id: parseInt(id) }).then((res) => {
      refresh();
    });
  };
  const handleSearch = (value) => {
    value = value.toLowerCase();
    var newSkills = [];
    for (let index = 0; index < unchanged.length; index++) {
      if (unchanged[index].skill.toLowerCase().includes(value)) {
        var x = { skill: unchanged[index].skill, id: unchanged[index].id };
        newSkills.push(x);
      }
    }
    setSkillsTable(newSkills);
  };

  const exportSkills = () => {
    skillService.exportAllSkills({});
  };

  React.useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    skillService.getAllSkills().then((res) => {
      const allSkill = res.Skills;
      rows = [];
      for (let index = 0; index < allSkill.length; index++) {
        rows.push(
          createData(allSkill[index].skill_name, allSkill[index].skill_id)
        );
      }
      setSkillsTable(rows);
      unchanged = rows;
    });
  }

  return (
    <div>
      <h1 className={classes.title}>Skills list</h1>
      {/* <Box component="div" display="inline"> */}
      <div style={{ display: "inline" }}>
        <OutlinedInput
          onChange={(event) => handleSearch(event.target.value)}
          className={classes.searchBar}
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          labelWidth={0}
        />
        <Fab
          className={classes.filtterButton}
          aria-label="filter"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          style={{
            backgroundColor: "#084791",
            margin: "10px",
            color: "#ffffff",
          }}
          onClick={() => exportSkills()}
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
      {/* </Box> */}
      <Grid container alignItems="center" justify="center">
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
                {skillsTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.skill}</TableCell>

                        <TableCell>
                          <Button
                            href="#text-buttons"
                            color="primary"
                            onClick={(event) => handleEdit(row.skill, row.id)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            href="#text-buttons"
                            color="primary"
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon />
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
        <DialogTitle id="responsive-dialog-title">Skills form</DialogTitle>
        <DialogContent>
          <TextField
            value={selectedSkill}
            onChange={(event) => setSelectedSkill(event.target.value)}
            required
            id="skillName"
            label="Skill name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color="primary">
            {editMode == true ? "Edit" : "Add"}
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
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
];
