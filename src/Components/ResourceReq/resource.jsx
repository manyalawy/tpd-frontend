import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./resource.css";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import IconButton from "@material-ui/core/IconButton";
import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import HistoryIcon from "@material-ui/icons/History";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { accountProperties } from "../../_helpers";

import {
  resourceRequestService,
  managerService,
  employeeService,
  skillService,
} from "#Services";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Resource() {
  const classes = useStyles();

  let history = useHistory();
  //Handle Delete
  const [idToDelete, setIdToDelete] = useState();
  const [deleted, setDeleted] = useState(false);
  //Handle Filters
  const [filtered, setFiltered] = useState(false);
  const [managerFilterList, setManagerFilterList] = useState([]);
  const [selectedManager, setSelectedManager] = useState();

  const [titleFilterList, setTitleFilterList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState();

  const [functionFilterList, setFunctionFilterList] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();

  const [categoryFilterList, setCategoryFilterList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [subcategoryFilterList, setSubcategoryFilterList] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState();

  const [selectedStatus, setSelectedStatus] = useState();

  const [resourceRequests, setResourceRequests] = useState([]);

  const [selectedPage, setSelectedPage] = useState(1);

  const [idActions, setIdActions] = useState();

  const [requestActions, setRequestActions] = useState([]);

  //Once for all Filter Lists
  useEffect(() => {
    managerService.getAll().then((res) => {
      setManagerFilterList(res.managers);
    });
    employeeService.getAllTitles().then((res) => {
      setTitleFilterList(res.Titles);
    });
    employeeService.getAllFunctions().then((res) => {
      setFunctionFilterList(res.Functions);
    });
    skillService.getAllCategories().then((res) => {
      setCategoryFilterList(res.Categories);
    });
    skillService.getAllSubcategories().then((res) => {
      setSubcategoryFilterList(res.Subcategories);
    });
  }, []);

  //used for actions of a specific request
  useEffect(() => {
    resourceRequestService
      .getById({ reference_number: idActions })
      .then((res) => {
        setRequestActions(
          res.ResourceRequest?.resource_requests_actions
            ? res.ResourceRequest.resource_requests_actions
            : []
        );
      });
  }, [idActions]);

  //with every category select subcategories change accordingly
  useEffect(() => {
    skillService.getAllSubcategories({ selectedCategory }).then((res) => {
      setSubcategoryFilterList(res.Subcategories);
    });
  }, [selectedCategory]);

  //With every Update to re-render Table with filtration or after deletion
  useEffect(() => {
    let managerFilterProperty = "";
    if (accountProperties().roles?.includes("TPD Team")) {
      managerFilterProperty = selectedManager
        ? { manager_name: selectedManager }
        : "";
    }
    const titleFilterProperty = selectedTitle
      ? { employee_title: selectedTitle }
      : "";
    const functionFilterProperty = selectedFunction
      ? { function: selectedFunction }
      : "";

    const statusFilterProperty = selectedStatus
      ? { request_status: selectedStatus }
      : "";
    //TODO property name
    const categoryFilterProperty = selectedCategory
      ? { request_status: selectedCategory }
      : "";
    //TODO property name
    const subcategoryFilterProperty = selectedSubcategory
      ? { request_status: selectedSubcategory }
      : "";

    const Filters = {
      ...managerFilterProperty,
      ...titleFilterProperty,
      ...functionFilterProperty,
      ...statusFilterProperty,
      ...categoryFilterProperty,
      ...subcategoryFilterProperty,
    };
    if (accountProperties().roles?.includes("TPD Team")) {
      resourceRequestService
        .getAll({
          Page: selectedPage - 1,
          Limit: 10,
          Filters,
        })
        .then((res) => {
          console.log(res.ResourceRequests);

          setResourceRequests(res.ResourceRequests);
        });
    } else {
      resourceRequestService
        .getAllByManager({
          Page: selectedPage - 1,
          Limit: 10,
          Filters,
        })
        .then((res) => {
          setResourceRequests(res.ResourceRequests);
        });
    }
  }, [deleted, filtered, selectedPage]);

  function resetFilter() {
    if (accountProperties().roles?.includes("TPD Team")) {
      document.getElementById("filterManager").value = "";
    }
    document.getElementById("filterTitle").value = "";
    document.getElementById("filterFunction").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterCategory").value = "";
    document.getElementById("filterSubCategory").value = "";
    setSelectedCategory();
    setSelectedFunction();
    setSelectedManager();
    setSelectedStatus();
    setSelectedSubcategory();
    setSelectedTitle();
  }

  const deleteRequest = () => {
    resourceRequestService.delete(idToDelete).then(() => {
      setDeleted(!deleted);
    });
  };

  const editRequest = (reference_number) => {
    history.push({
      pathname: "/resource-requests/edit",
      state: { reference_number, editing: true },
    });
  };

  const exportRequests = () => {
    let managerFilterProperty = "";
    if (accountProperties().roles?.includes("TPD Team")) {
      managerFilterProperty = selectedManager
        ? { manager_name: selectedManager }
        : "";
    }

    const titleFilterProperty = selectedTitle
      ? { employee_title: selectedTitle }
      : "";
    const functionFilterProperty = selectedFunction
      ? { function: selectedFunction }
      : "";

    const statusFilterProperty = selectedStatus
      ? { request_status: selectedStatus }
      : "";
    //TODO property name
    const categoryFilterProperty = selectedCategory
      ? { request_status: selectedCategory }
      : "";
    //TODO property name
    const subcategoryFilterProperty = selectedSubcategory
      ? { request_status: selectedSubcategory }
      : "";

    const Filters = {
      ...managerFilterProperty,
      ...titleFilterProperty,
      ...functionFilterProperty,
      ...statusFilterProperty,
      ...categoryFilterProperty,
      ...subcategoryFilterProperty,
    };
    if (accountProperties().roles?.includes("TPD Team")) {
      resourceRequestService.export({
        Filters,
      });
    } else {
      resourceRequestService.exportAllByManager({
        Filters,
      });
    }
  };

  return (
    <div>
      <h1 className="resourceTitle">Resource Requests</h1>
      <div className="float-right" style={{ width: "21%" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => history.push("/resource-requests/add")}
          edge="start"
          style={{
            backgroundColor: "#ffffff",
            margin: "10px",
            color: "#000000",
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          style={{
            backgroundColor: "#F6EC5A",
            margin: "10px",
            color: "#000000",
          }}
          data-toggle="modal"
          data-target="#resourceFilterModal"
        >
          <img style={{ width: "100%", height: "auto" }} src={FilterIcon}></img>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          style={{
            backgroundColor: "#084791",
            margin: "10px",
            color: "#ffffff",
          }}
          onClick={() => exportRequests()}
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
      <div className="table-responsive-xl">
        <table class="table resourceTable mx-auto table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Ref No.</th>
              {accountProperties().roles?.includes("TPD Team") ? (
                <th scope="col">Manager</th>
              ) : (
                ""
              )}

              <th scope="col">Function</th>
              <th scope="col">Title</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Probability</th>
              <th scope="col">Percentage</th>
              <th scope="col">Status</th>
              <th scope="col">Action Taken</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourceRequests.map((resourceRequest) => (
              <tr>
                <th scope="row">{resourceRequest.reference_number}</th>
                {accountProperties().roles?.includes("TPD Team") ? (
                  <td>{resourceRequest.manager_name}</td>
                ) : (
                  ""
                )}
                <td>{resourceRequest.function}</td>
                <td>{resourceRequest.title}</td>
                <td>{resourceRequest.start_date?.split("T")[0]}</td>
                <td>{resourceRequest.end_date?.split("T")[0]}</td>
                <td>{resourceRequest.propability}</td>
                <td>{resourceRequest.percentage}</td>
                <td>{resourceRequest.status}</td>
                <td>{resourceRequest.resource_requests_actions[0]?.action}</td>
                <td className="btn-group">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    style={{
                      backgroundColor: "#ffffff",
                      margin: "10px",
                      color: "#000000",
                    }}
                    onClick={() =>
                      editRequest(resourceRequest.reference_number)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    style={{
                      backgroundColor: "#ffffff",
                      margin: "10px",
                      color: "#000000",
                    }}
                    onClick={() =>
                      // setIdToDelete(resourceRequest.reference_number)
                      setIdActions(resourceRequest.reference_number)
                    }
                    data-toggle="modal"
                    data-target="#deleteResource"
                  >
                    <HistoryIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={100}
            color="primary"
            onChange={(event, value) => {
              setSelectedPage(value);
            }}
          />
        </div>
      </div>
      <div>
        <div
          class="modal fade"
          id="resourceFilterModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="resourceTableFilter"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg rtm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="resourceTableFilter">
                  Filter
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body row ">
                {accountProperties().roles?.includes("TPD Team") ? (
                  <div className="filterElement" style={{ width: 200 }}>
                    <Autocomplete
                      id="filterManager"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Manager"
                          margin="normal"
                        />
                      )}
                      value={selectedManager}
                      options={managerFilterList}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        setSelectedManager(value.name);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterTitle"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Title" margin="normal" />
                    )}
                    value={selectedTitle}
                    options={titleFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedTitle(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterFunction"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Function" margin="normal" />
                    )}
                    value={selectedFunction}
                    options={functionFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedFunction(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    options={status}
                    getOptionLabel={(option) => option.status}
                    value={selectedStatus}
                    id="filterStatus"
                    renderInput={(params) => (
                      <TextField {...params} label="Status" margin="normal" />
                    )}
                    onChange={(event, value) => {
                      setSelectedStatus(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterCategory"
                    debug
                    renderInput={(params) => (
                      <TextField {...params} label="Category" margin="normal" />
                    )}
                    value={selectedCategory}
                    options={categoryFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      setSelectedCategory(value);
                    }}
                  />
                </div>
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterSubCategory"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub-Category"
                        margin="normal"
                      />
                    )}
                    value={selectedSubcategory}
                    options={subcategoryFilterList}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      selectedSubcategory(value);
                    }}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary filter"
                  data-dismiss="modal"
                  onClick={() => setFiltered(!filtered)}
                >
                  Filter
                </button>
                <button
                  onClick={() => resetFilter()}
                  type="button"
                  class="btn btn-primary reset"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade deleteModal"
        id="deleteResource"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          role="document"
          style={{ maxWidth: "1000px" }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Resource Request : {idActions} Actions History
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Action Date</TableCell>
                      <TableCell align="right">Action Owner</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestActions.map((action) => (
                      <TableRow key={"test"}>
                        <TableCell component="th" scope="row">
                          {action.createdAt.split("T")[0]}
                        </TableCell>
                        <TableCell align="right">Rafiq TPD</TableCell>
                        <TableCell align="right">{action.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              {/* <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  deleteRequest();
                }}
                data-dismiss="modal"
              >
                Yes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const status = [
  { status: "Open" },
  { status: "Cancelled" },
  { status: "On Hold" },
  { status: "Moved" },
  { status: "Pending Hiring Request" },
  { status: "Hired" },
  { status: "Pending Outsourcing Request" },
  { status: "Outsourced" },
  { status: "Over allocated" },
];
