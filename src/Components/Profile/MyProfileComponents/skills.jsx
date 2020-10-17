import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../Profile.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { employeeService, skillService } from "#Services";

import { useSnackbar } from "notistack";

export default function Skills() {
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const [skillName, setSkillName] = React.useState();
    const [experience, setExperience] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [skillsList, setSkillsList] = React.useState([]);

    const [skills, setSkills] = React.useState([]);
    const [selectedSkill, setSelectedSkill] = React.useState({});

    const [refresh, setRefresh] = React.useState(false);
    const [idToDelete, setIdToDelete] = React.useState("");
    const [idToEdit, setIdToEdit] = React.useState("");

    const [editMode, setEditMode] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const defaultProps = {
        options: skillsList,
        getOptionLabel: (option) => option.skill_name
    };
    const expLevel = {
        options: expLevelOptions,
        getOptionLabel: (option) => option
    };
    const handleClickOpenModal = (edit, skill) => {
        setEditMode(edit);
        setOpen(true);
        if (edit) {
            setIdToEdit(skill.id);
            setSelectedSkill(skill.skill);
            setSelectedDate(skill.last_used_date);
            setExperience(skill.experience_level);
            setSkillName(skill.skill.skill_id);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleCloseModal = () => {
        if (skillName != null && experience != null && selectedDate != null) setOpen(false);
    };

    //fetch User Skils
    useEffect(() => {
        employeeService.getMySkills().then((res) => {
            setSkills(res.Employee?.employee_skills);
        });
        skillService.getAllSkills().then((res) => {
            setSkillsList(res.Skills);
        });
    }, [refresh]);

    const handleSubmit = () => {
        handleCloseModal();
        if (!editMode) {
            skillService
                .addEmployeeSkill({
                    skill_id: skillName,
                    experience_level: experience,
                    last_used_date: selectedDate
                })
                .then((res) => {
                    if (res.error) {
                        enqueueSnackbar(res.error, {
                            variant: "error"
                        });
                    } else {
                        enqueueSnackbar("Skill Successfully Added", {
                            variant: "success"
                        });
                        setRefresh(!refresh);
                    }
                });
        } else {
            skillService
                .editEmployeeSkill({
                    id: idToEdit,
                    skill_id: skillName,
                    experience_level: experience,
                    last_used_date: selectedDate
                })
                .then((res) => {
                    if (res.error) {
                        enqueueSnackbar(res.error, {
                            variant: "error"
                        });
                    } else {
                        enqueueSnackbar("Skill Successfully Edited", {
                            variant: "success"
                        });
                        setRefresh(!refresh);
                    }
                });
        }
    };
    const handleDelete = (id) => {
        skillService
            .deleteEmployeeSkill({
                id: id
            })
            .then((res) => {
                if (res.error) {
                    enqueueSnackbar(res.error, {
                        variant: "error"
                    });
                } else {
                    enqueueSnackbar("Skill Successfully Deleted", {
                        variant: "success"
                    });
                    setRefresh(!refresh);
                }
            });
    };

    return (
        <div className="mySkills">
            <h1>Skills</h1>

            <div class="text-right mb-3">
                <button
                    type="button"
                    class="btn btn-dark addMySkill"
                    onClick={() => handleClickOpenModal(false)}>
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
                <tbody style={{ backgroundColor: "white" }}>
                    {skills.map((skill) => (
                        <tr>
                            <th scope="row">{skill.skill.skill_name}</th>
                            <td>{skill.experience_level}</td>
                            <td>{skill.last_used_date?.split("T")[0]}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-link"
                                    onClick={() => handleClickOpenModal(true, skill)}>
                                    Edit
                                </button>
                                |
                                <button
                                    type="button"
                                    class="btn btn-link"
                                    onClick={() => handleDelete(skill.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form action="submit">
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="addMySkillForm">
                        {editMode ? "Edit Skill" : "Add Skill Used"}
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ width: 300 }}>
                            <Autocomplete
                                {...defaultProps}
                                id="skillName"
                                debug
                                value={selectedSkill}
                                onChange={(event, value) => {
                                    setSkillName(value.skill_id);
                                }}
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
                                value={experience}
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
                                        label="Last used"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date"
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit" onClick={handleSubmit} color="primary">
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
    { title: "The Lord of the Rings: The Two Towers", year: 2002 }
];

const expLevelOptions = ["Beginner", "Intermediate", "Expert"];
