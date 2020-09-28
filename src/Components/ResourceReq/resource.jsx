import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./resource.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import resourceService from "../../_services/resource-request.service";

import IconButton from "@material-ui/core/IconButton";
import FilterIcon from "../assets/filter_alt-24px.svg";
import ExportIcon from "../assets/file-export-solid.svg";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//Services
import resourceRequestService from "../../_services/resource-request.service";
import managerService from "../../_services/manager.service";
import employeeService from "../../_services/employee.service";
import skillService from "../../_services/skill.service";

export default function Resource() {
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

  //with every category select subcategories change accordingly
  useEffect(() => {
    skillService.getAllSubcategories({ selectedCategory }).then((res) => {
      setSubcategoryFilterList(res.Subcategories);
    });
  }, [selectedCategory]);

  //With every Update to re-render Table with filtration or after deletion
  useEffect(() => {
    const managerFilterProperty = selectedManager
      ? { manager_name: selectedManager }
      : "";
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

    resourceRequestService
      .getAll({
        Page: 0,
        Limit: 10,
        Filters,
      })
      .then((res) => {
        setResourceRequests(res.ResourceRequests);
      });
  }, [deleted, filtered]);

  function resetFilter() {
    document.getElementById("filterManager").value = "";
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

  return (
    <div>
      <h1 className="resourceTitle">Resource Requests</h1>
      <div className="float-right">
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
              <th scope="col">Manager</th>
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
                <td>{resourceRequest.manager_name}</td>
                <td>{resourceRequest.function}</td>
                <td>{resourceRequest.title}</td>
                <td>{resourceRequest.start_date}</td>
                <td>{resourceRequest.end_date}</td>
                <td>{resourceRequest.propability}</td>
                <td>{resourceRequest.percentage}</td>
                <td>{resourceRequest.status}</td>
                <td>TODO Actions Taken</td>
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
                      setIdToDelete(resourceRequest.reference_number)
                    }
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <div className="filterElement" style={{ width: 200 }}>
                  <Autocomplete
                    id="filterManager"
                    renderInput={(params) => (
                      <TextField {...params} label="Manager" margin="normal" />
                    )}
                    value={selectedManager}
                    options={managerFilterList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      setSelectedManager(value.name);
                    }}
                  />
                </div>

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
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete resource request
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
              Are you sure you want to delete release request with reference
              number: {idToDelete}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  deleteRequest();
                }}
              >
                Yes
              </button>
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
