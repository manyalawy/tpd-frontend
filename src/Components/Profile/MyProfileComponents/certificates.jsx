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

//service
import certificationService from "../../../_services/certification.service";
import employeeService from "../../../_services/employee.service";

import { useSnackbar } from "notistack";

export default function Certificates() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [cerId, setCerId] = React.useState("");
  const [cerProvider, setCerProvider] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [cerProviderList, setCerProviderList] = React.useState([]);
  const [cerProviderID, setCerProviderID] = React.useState();

  const [cerByProviderList, setCerByProviderList] = React.useState([]);

  const [certificates, setCertificates] = React.useState([]);
  const [certificate, setCertificate] = React.useState({});

  const [certificateProv, setCertificateProv] = React.useState({});

  const [refresh, setRefresh] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState("");
  const [idToEdit, setIDToEdit] = React.useState("");

  const [editMode, setEditMode] = React.useState(false);

  //fetch User certifactes
  React.useEffect(() => {
    employeeService.getMyCertificates().then((res) => {
      setCertificates(res.Employee?.employee_certifications);
    });
    certificationService.getAllProviders().then((res) => {
      setCerProviderList(res.CertificateProviders);
    });
  }, [refresh]);

  React.useEffect(() => {
    certificationService
      .getAllByProvider({
        certification_provider_id: cerProviderID,
      })
      .then((res) => {
        if (!res.error) setCerByProviderList(res.Certifications);
      });
  }, [cerProviderID]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpenModal = (edit, certificate) => {
    setEditMode(edit);

    setOpen(true);
    if (edit) {
      console.log(certificate);
      setSelectedDate(certificate.expiration_date);
      setCertificate(certificate.certification);
      setCertificateProv(certificate.certification.certification_provider);
      setIDToEdit(certificate.id);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleCloseModal = () => {
    if (cerId != null && cerProvider != null && selectedDate != null)
      setOpen(false);
  };

  const defaultProps = {
    options: cerProviderList,
    getOptionLabel: (option) => option.certification_provider_name,
  };

  const handleDelete = (id) => {
    certificationService
      .deleteEmployeeCertification({
        id: id,
      })
      .then((res) => {
        if (res.error) {
          enqueueSnackbar(res.error, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Certification Successfully Deleted", {
            variant: "success",
          });
          setRefresh(!refresh);
        }
      });
  };

  const handleSubmit = () => {
    handleCloseModal();

    if (!editMode) {
      certificationService
        .addEmployeeCertificate({
          certification_id: cerId,
          expiry_date: selectedDate,
        })
        .then((res) => {
          if (res.error) {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Certification Successfully Added", {
              variant: "success",
            });
            setRefresh(!refresh);
          }
        });
    } else {
      certificationService
        .editEmployeeCertificate({
          certification_id: cerId,
          expiry_date: selectedDate,
          id: idToEdit,
        })
        .then((res) => {
          if (res.error) {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Certification Successfully Edited", {
              variant: "success",
            });
            setRefresh(!refresh);
          }
        });
    }
  };

  return (
    <div className="MyCertifications">
      <h1>Certifications</h1>
      <div className="visible">
        <div class="text-right mb-3">
          <button
            type="button"
            class="btn btn-dark mr-auto addMyCertification"
            onClick={() => handleClickOpenModal(false)}
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
          <tbody style={{ backgroundColor: "white" }}>
            {certificates.map((certificate) => (
              <tr>
                <th scope="row">
                  {
                    certificate.certification?.certification_provider
                      ?.certification_provider_name
                  }
                </th>
                <td>{certificate.certification?.certification_name}</td>
                <td>{certificate.expiration_date?.split("T")[0]}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-link"
                    onClick={() => handleClickOpenModal(true, certificate)}
                  >
                    Edit
                  </button>
                  |
                  <button
                    type="button"
                    class="btn btn-link"
                    onClick={() => handleDelete(certificate.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="addMySkillForm">
          {editMode ? "Edit Certificate" : "Add Certificate Taken"}
        </DialogTitle>
        <DialogContent>
          <div style={{ width: 300 }}>
            <Autocomplete
              clearOnEscape
              {...defaultProps}
              id="certificateProvider"
              debug
              value={certificateProv}
              onChange={(event, value) => {
                console.log(value);
                setCerProviderID(value?.certification_provider_id);
                setCerProvider(value?.certification_provider_name);
              }}
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
              onChange={(event, value) => setCerId(value?.certification_id)}
              options={cerByProviderList}
              getOptionLabel={(option) => option.certification_name}
              id="certificationName"
              debug
              value={certificate}
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
            onClick={() => handleSubmit()}
            color="primary"
          >
            {editMode ? "Edit" : "Add"}
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
