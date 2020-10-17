import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useSnackbar } from "notistack";

import { employeeService, assignmentService } from "#Services";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";

const useStyles = makeStyles({
    root: {
        width: "300px",
        marginTop: "3rem",
        marginBottom: "3rem",
        backgroundColor: "#f8f8ff"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    content: {
        fontSize: "15px",
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    addButton: {
        marginTop: "2rem",
        marginBottom: "2rem"
    },
    form: {
        marginLeft: "2rem",
        marginTop: "2rem"
    },
    date: {
        marginLeft: "2rem",
        marginTop: "2rem",
        width: "170px"
    }
});
export default function Assignments(props) {
    let history = useHistory();
    const [name, setName] = React.useState("");

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [assignments, setAssignments] = React.useState([]);

    //add assignment
    const [workgroup, setWorkgroup] = useState("");
    const [costcenter, setCostCenter] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const [sdmManager, setSDMManager] = useState("");

    const [percentage, setPercentage] = useState("");

    const [startDate, setStartDate] = useState(new Date());

    const [releaseDate, setReleaseDate] = useState(new Date());

    const [editingAss, setEditingAss] = React.useState(false);
    const [editingAssId, setEditingAssId] = React.useState("");

    const [refresh, setRefresh] = React.useState(false);

    //fetch User Assignments
    React.useEffect(() => {
        employeeService.getEmployeeAssignments({ employee_id: props?.id }).then((res) => {
            setAssignments(res.Employee?.assignments);
            setName(res.Employee?.name);
        });
    }, [refresh]);

    const handleAdd = () => {
        setOpen(false);
        assignmentService
            .addEmployeeAssignment({
                Assignment: {
                    workgroup: workgroup,
                    cost_center: costcenter,
                    sdm_reporting_manager: sdmManager,
                    allocation_percentage: percentage,
                    start_date: startDate,
                    release_date: releaseDate,
                    employee_id: props?.id
                }
            })
            .then((res) => {
                enqueueSnackbar("Assignment Added Successfully", {
                    variant: "success"
                });
                setRefresh(!refresh);
            });
    };
    const handleEdit = () => {
        setOpen(false);
        assignmentService
            .editEmployeeAssignment({
                Assignment: {
                    assignment_id: editingAssId,
                    workgroup: workgroup,
                    cost_center: costcenter,
                    sdm_reporting_manager: sdmManager,
                    allocation_percentage: percentage,
                    start_date: startDate,
                    release_date: releaseDate,
                    employee_id: props?.id
                }
            })
            .then(() => {
                enqueueSnackbar("Assignment Edited Successfully", {
                    variant: "success"
                });
                setRefresh(!refresh);
            });
    };

    const handleDelete = (id) => {
        assignmentService
            .deleteEmployeeAssignment({
                Assignment: {
                    assignment_id: id
                }
            })
            .then((res) => {
                enqueueSnackbar("Assignment Deleted Successfully", {
                    variant: "success"
                });
                setRefresh(!refresh);
            });
    };

    return (
        <div>
            {props?.editing ? (
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Button
                        className={classes.addButton}
                        variant="contained"
                        onClick={() => setOpen(true)}>
                        Add assigment
                    </Button>
                </Grid>
            ) : (
                ""
            )}
            <div className="row" style={{ dispaly: "flex", justifyContent: "space-evenly" }}>
                {assignments.map((assignment, i) => (
                    <div className="col-md-3">
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom>
                                    Assigment {i + 1}
                                </Typography>

                                <Typography className={classes.content}>
                                    Workgroup:{"     "}
                                    {assignment.workgroup}
                                </Typography>
                                <Typography className={classes.content}>
                                    Cost Center:{"     "}
                                    {assignment.cost_center}
                                </Typography>
                                <Typography className={classes.content}>
                                    SDM Manager:{"     "}
                                    {assignment.sdm_reporting_manager}
                                </Typography>
                                <Typography className={classes.content}>
                                    Allocation Percentage:{"     "}
                                    {assignment.allocation_percentage}
                                </Typography>
                                <Typography className={classes.content}>
                                    Start Date:{"     "}
                                    {assignment.start_date?.split("T")[0]}
                                </Typography>
                                <Typography className={classes.content}>
                                    Release Date:{"     "}
                                    {assignment.release_date?.split("T")[0]}
                                </Typography>
                            </CardContent>
                            {props?.editing ? (
                                <CardActions>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            setEditingAss(true);
                                            setEditingAssId(assignment.assignment_id);
                                            setWorkgroup(assignment.workgroup);
                                            setCostCenter(assignment.cost_center);
                                            setSDMManager(assignment.sdm_reporting_manager);
                                            setPercentage(assignment.allocation_percentage);
                                            setStartDate(assignment.start_date);
                                            setReleaseDate(assignment.release_date);
                                            setOpen(true);
                                        }}>
                                        Edit
                                    </Button>{" "}
                                    |{" "}
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            handleDelete(assignment.assignment_id);
                                        }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            ) : (
                                ""
                            )}
                        </Card>
                    </div>
                ))}
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {editingAss ? "Edit Assingment" : "Add Assingment"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            required
                            value={workgroup}
                            onChange={(e, value) => setWorkgroup(e.target.value)}
                            className={classes.form}
                            display="inline"
                            id="workGroup"
                            label="Workgroup"
                        />
                        <TextField
                            required
                            value={costcenter}
                            onChange={(e, value) => setCostCenter(e.target.value)}
                            className={classes.form}
                            display="inline"
                            id="costCenter"
                            label="Cost Center"
                        />
                        <TextField
                            required
                            value={sdmManager}
                            onChange={(e, value) => setSDMManager(e.target.value)}
                            className={classes.form}
                            display="inline"
                            id="sdmManager"
                            label="SDM Manager"
                        />
                        <TextField
                            required
                            value={percentage}
                            onChange={(e, value) => setPercentage(e.target.value)}
                            type="number"
                            min="1"
                            className={classes.form}
                            display="inline"
                            id="costCenter"
                            label="Allocation Percentage"
                            InputProps={{
                                startAdornment: <InputAdornment position="end">%</InputAdornment>
                            }}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.date}
                                disableToolbar
                                value={startDate}
                                onChange={(value) => setStartDate(value)}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />{" "}
                            <KeyboardDatePicker
                                className={classes.date}
                                disableToolbar
                                value={releaseDate}
                                onChange={(value) => setReleaseDate(value)}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inlin"
                                label="Date picker inline"
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editingAss ? handleEdit : handleAdd} color="primary">
                        {editingAss ? "Save" : "Add"}
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <Button
                    className={classes.addButton}
                    variant="contained"
                    onClick={() =>
                        history.push({
                            pathname: "/employee-profile/assignments-history",
                            state: { id: props?.id, name }
                        })
                    }>
                    View History
                </Button>
            </Grid>
        </div>
    );
}
