import React from "react";
import "../Profile.css";
import { state } from "react";
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

export default function Certificates() {
  const [open, setOpen] = React.useState(false);
  const [cerName, setCerName] = React.useState("");
  const [cerProvider, setCerProvider] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpenModal = () => {
    setOpen(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleCloseModal = () => {
    console.log(cerName);
    if (cerName != null && cerProvider != null && selectedDate != null)
      setOpen(false);
  };

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  return (
    <div className="MyCertifications">
      <h1>Certifications</h1>
      <div className="visible">
        <div class="text-right mb-3">
          <button
            type="button"
            class="btn btn-dark mr-auto addMyCertification"
            onClick={handleClickOpenModal}
          >
            Add Certification
          </button>
        </div>
      </div>
      <div className="table-responsive-md">
        <table class="table table-striped">
          <thead class="certificationsTableHead">
            <tr>
              <th scope="col"> Certification provider</th>
              <th scope="col">Certification Name</th>
              <th scope="col">Expiration Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Udemy</th>
              <td>Web development</td>
              <td>11/1/2020</td>
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
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="addMySkillForm">{"My Certificates Form"}</DialogTitle>
        <DialogContent>
          <div style={{ width: 300 }}>
            <Autocomplete
              clearOnEscape
              {...defaultProps}
              id="certificateProvider"
              debug
              onChange={(event, value) => setCerProvider(value)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Certificate Provider"
                  margin="normal"
                />
              )}
            />
          </div>
          <div style={{ width: 300 }}>
            <Autocomplete
              onChange={(event, value) => setCerName(value)}
              {...defaultProps}
              id="certificationName"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Certification Name"
                  margin="normal"
                />
              )}
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  clearOnEscape
                  required
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Expiration Date"
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
