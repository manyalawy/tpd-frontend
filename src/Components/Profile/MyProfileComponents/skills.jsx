import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { darken, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../Profile.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function Skills() {
  const [open, setOpen] = React.useState(false);
  const [skillName, setSkillName] = React.useState("");
  const [experience, setExperience] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const expLevel = {
    options: expLevelOptions,
    getOptionLabel: (option) => option,
  };
  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleCloseModal = () => {
    if (skillName != null && experience != null && selectedDate != null)
      setOpen(false);
  };

  return (
    <div className="mySkills">
      <h1>Skills</h1>

      <div class="text-right mb-3">
        <button
          type="button"
          class="btn btn-dark addMySkill"
          onClick={handleClickOpenModal}
        >
          Add skill
        </button>
      </div>

      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col"> Skill Name</th>
            <th scope="col">Experience Level</th>
            <th scope="col">Last Used</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Java</th>
            <td>Beginner</td>
            <td>Last used</td>
            <td>
              <button
                type="button"
                class="btn btn-link"
                onClick={handleClickOpenModal}
              >
                Edit
              </button>
              |
              <button type="button" class="btn btn-link">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <form action="submit">
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="addMySkillForm">{"My Skills Form"}</DialogTitle>
          <DialogContent>
            <div style={{ width: 300 }}>
              <Autocomplete
                {...defaultProps}
                id="skillName"
                debug
                onChange={(event, value) => setSkillName(value.title)}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Skill Name"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div style={{ width: 300 }}>
              <Autocomplete
                onChange={(event, value) => setExperience(value)}
                {...expLevel}
                id="experienceLevel"
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Experience Level"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    fullWidth
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              type="submit"
              onClick={handleCloseModal}
              color="primary"
            >
              Add
            </Button>
            <Button onClick={() => setOpen(false)} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </form>
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
];

const expLevelOptions = ["Beginner", "Intermediate", "Expert"];
