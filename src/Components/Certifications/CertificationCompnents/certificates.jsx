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
import DeleteIcon from "@material-ui/icons/Delete";
import certificationService from "../../../_services/certification.service.js";
import Autocomplete from "@material-ui/lab/Autocomplete";

import IconButton from "@material-ui/core/IconButton";
import ExportIcon from "../../assets/file-export-solid.svg";

const columns = [
  { id: "cerName", label: "Certification Name", minWidth: 170 },
  { id: "cerProvider", label: "Certification Provider", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];

function createData(provider, id) {
  return { provider, id };
}

const rows = [];

const useStyles = makeStyles({
  certificates: {
    marginTop: "6rem",
  },
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

var providers = [];

export default function SkillListing() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [providersTable, setProvidersTable] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [selectedProvider, setSelectedProvider] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [certificatesTable, setcertificatesTable] = useState([]);
  const [selectedCerName, setselectedCerName] = useState("");
  const [row, setrow] = useState(null);

  const cerProvidersOptions = {
    options: providersTable,
    getOptionLabel: (option) => option.certification_provider_name,
  };

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

  const handleEdit = (row) => {
    console.log(row);
    setselectedCerName(row.certification_name);
    setSelectedProvider(row.certification_provider);
    setEditMode(true);
    setOpen(true);
    setrow(row);
  };

  const handleClose = () => {
    setEditMode(false);
    setOpen(false);
    setselectedCerName("");
    setSelectedProvider(null);
    setrow(null);
  };
  const handleAdd = () => {
    if (
      selectedCerName != "" &&
      selectedCerName != null &&
      selectedProvider != null &&
      selectedProvider != ""
    ) {
      if (editMode == false) {
        certificationService
          .addCertificate({
            Certification: {
              certification_provider_id: parseInt(
                selectedProvider.certification_provider_id
              ),
              certification_name: selectedCerName,
            },
          })
          .then((res) => refresh());
      } else {
        certificationService
          .editCertificates({
            Certification: {
              id: parseInt(row.certification_id),
              certification_name: selectedCerName,
              certification_provider_id: parseInt(
                row.certification_provider.certification_provider_id
              ),
            },
          })
          .then((res) => {
            console.log(res);
            refresh();
          });
      }
      setEditMode(false);
      setOpen(false);
      setselectedCerName(null);
      setSelectedProvider(null);
      setrow(null);
    }
  };
  const handleSearch = (value) => {
    value = value.toLowerCase();
    var newProviders = [];
    for (let index = 0; index < unchanged.length; index++) {
      if (
        unchanged[index].certification_provider.certification_provider_name
          .toLowerCase()
          .includes(value)
      ) {
        var x = unchanged[index];
        newProviders.push(x);
      }
    }
    setcertificatesTable(newProviders);
  };

  const handleAddProvider = () => {
    setSelectedProvider(null);
    setOpen(true);
  };

  const handleDelete = (row) => {
    certificationService
      .deleteCertificate({
        Certification: {
          id: parseInt(row.certification_id),
        },
      })
      .then((res) => {
        console.log(res);
        refresh();
      });
  };

  React.useEffect(() => {
    certificationService.getAllProviders().then((res) => {
      setProvidersTable(res.CertificateProviders);
    });

    refresh();
  }, []);

  function refresh() {
    certificationService.getCertificates({ Filters: {} }).then((res) => {
      setcertificatesTable(res.Certifications);
      unchanged = res.Certifications;
    });
  }

  const exportCertificates = () => {
    certificationService.export();
  };

  return (
    <div className={classes.certificates}>
      <h1 className={classes.title}>Certifications List</h1>
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
          onClick={handleAddProvider}
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
          onClick={() => exportCertificates()}
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
                {certificatesTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell>{row.certification_name}</TableCell>
                        <TableCell>
                          {
                            row.certification_provider
                              .certification_provider_name
                          }
                        </TableCell>

                        <TableCell>
                          <Button
                            href="#text-buttons"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            href="#text-buttons"
                            color="primary"
                            onClick={() => handleDelete(row)}
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
        disableBackdropClick={true}
      >
        <DialogTitle id="responsive-dialog-title">Providers form</DialogTitle>
        <DialogContent>
          <TextField
            value={selectedCerName}
            onChange={(event) => setselectedCerName(event.target.value)}
            required
            id="certificateName"
            label="Certificate Name"
          />
          <Autocomplete
            {...cerProvidersOptions}
            value={selectedProvider}
            id="disable-clearable"
            clearOnEscape
            onChange={(event, value) =>
              value == null
                ? setSelectedProvider(null)
                : setSelectedProvider(value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Certificate Provider"
                margin="normal"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color="primary">
            {editMode == true ? "Edit" : "Add"}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
