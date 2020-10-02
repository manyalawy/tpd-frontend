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
import certificationService from "../../_services/certification.service";

const columns = [
  { id: "employeeName", label: "Employee Name", minWidth: 100 },
  { id: "cerName", label: "Certification Name", minWidth: 100 },
  { id: "provider", label: "Certification Provider", minWidth: 100 },

  { id: "expDate", label: "Expiration Date", minWidth: 100 },
];

var Filters = {};

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

export default function CerHistory() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [CerHistory, setCerHistory] = useState([]);

  // Filte options
  const [employeesNames, setEmployeeNames] = useState([]);
  const [providers, setproviders] = useState([]);
  const [certifications, setCertifications] = useState([]);

  //filter values
  const [selectedName, setselectedName] = useState(null);
  const [selectedProvider, setselectedProvider] = useState(null);
  const [selectedCertification, setselectedCertification] = useState(null);

  const namesOptions = {
    options: employeesNames,
    getOptionLabel: (option) => option,
  };
  const providersOptions = {
    options: providers,
    getOptionLabel: (option) => option.certification_provider_name,
  };

  const certficatesOptions = {
    options: certifications,
    getOptionLabel: (option) => option.certification_name,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = () => {
    console.log(selectedName);
    var filterName = selectedName ? { name: selectedName } : "";
    var filterProvider = selectedProvider
      ? {
          certification_provider_id: parseInt(
            selectedProvider.certification_provider_id
          ),
        }
      : "";
    var filterCer = selectedCertification
      ? { certification_id: parseInt(selectedCertification.certification_id) }
      : "";
    Filters = {
      ...filterName,
      ...filterProvider,
      ...filterCer,
    };

    certificationService.certificateHistory({ Filters }).then((res) => {
      console.log(res.Certifications);
      setCerHistory(res.Certifications);
    });

    setOpen(false);
  };

  const handleProviderSelection = (value) => {
    if (value != null) {
      setselectedProvider(value);
      certificationService
        .getCertificateByProv({
          certification_provider_id: parseInt(value.certification_provider_id),
        })
        .then((res) => {
          console.log(res.Certifications);
          setCertifications(res.Certifications);
        });
    } else {
      setselectedProvider(null);
    }
  };

  const expo = () => {
    certificationService.exportHistory({ Filters });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setselectedProvider(null);
    setselectedName(null);
    setselectedCertification(null);
    certificationService.certificateHistory().then((res) => {
      setCerHistory(res.Certifications);
    });
    setOpen(false);
  };

  useEffect(() => {
    employeeService.getAllNames().then((res) => {
      setEmployeeNames(res.Names);
    });

    certificationService.getAllProviders().then((res) => {
      console.log(res.CertificateProviders);
      setproviders(res.CertificateProviders);
    });

    certificationService.certificateHistory().then((res) => {
      console.log(res.Certifications);
      setCerHistory(res.Certifications);
    });
  }, []);

  return (
    <div>
      <h1 className={classes.title}>Employee Certificates History</h1>
      <div className={classes.buttons}>
        <Fab aria-label="filter" onClick={() => setOpen(true)}>
          <FilterListIcon />
        </Fab>
        <Fab
          onClick={expo}
          aria-label="export"
          className={classes.exportButton}
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
                {CerHistory.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>{row.employee_name}</TableCell>
                      <TableCell>{row.certification_name}</TableCell>
                      <TableCell>{row.certification_provider_name}</TableCell>
                      <TableCell>{row.expiration_date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={CerHistory.length}
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
            value={selectedName}
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
            onChange={(event, value) => handleProviderSelection(value)}
            {...providersOptions}
            value={selectedProvider}
            id="selectProvider"
            clearOnEscape
            renderInput={(params) => (
              <TextField
                style={{ width: 200 }}
                className={classes.select}
                {...params}
                label="Providers"
                margin="normal"
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => setselectedCertification(value)}
            {...certficatesOptions}
            value={selectedCertification}
            id="selectCertificate"
            disabled={selectedProvider ? false : true}
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
