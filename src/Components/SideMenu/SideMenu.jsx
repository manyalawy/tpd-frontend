import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PeopleIcon from "@material-ui/icons/People";
import Collapse from "@material-ui/core/Collapse";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import profile from "./assets/profile.png";
import itworx from "./assets/download.png";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { userService } from "#Services";
import { accountProperties } from "../../_helpers";
import { useSnackbar } from "notistack";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBarIcons: {
    color: "#ffffff",
  },
  navBarList: {
    color: "#ffffff",
    marginLeft: "-20px",
    fontSize: "29px",
    "&:hover": {
      color: "#F6EC5A",
    },
  },
  navBarSubList: {
    color: "#ffffff",
    fontSize: "16px",
    marginTop: "-10px",
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(2),
    "&:hover": {
      color: "#F6EC5A",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: " rgba(0, 0, 0, 0.8)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(8),
    borderRadius: "45%",
    backgroundColor: "#AC2225",
  },
}));

export default function SideMenu() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openTalent, setOpenTalent] = React.useState(true);
  const [openSkills, setOpenSkills] = React.useState(false);
  const [openCertifications, setOpenCertifications] = React.useState(false);

  const [openAssignments, setOpenAssignments] = React.useState(true);

  const [
    openEmployeeCertifications,
    setOpenEmployeeCertifications,
  ] = React.useState(true);

  const [accountRoles, setAccountRoles] = React.useState([]);
  const [accountId, setAccountId] = React.useState("");
  const [accountName, setAccountName] = React.useState("");

  let logout = () => {
    userService.logout();
    history.push("/login");
  };

  const handleTalentClick = () => {
    setOpenTalent(!openTalent);
  };

  const handleSkillsClick = () => {
    setOpenSkills(!openSkills);
  };

  const handleCertificationsClick = () => {
    setOpenCertifications(!openCertifications);
  };
  const handleEmployeeCertificationsClick = () => {
    setOpenEmployeeCertifications(!openEmployeeCertifications);
  };
  const handleAssignmentsClick = () => {
    setOpenAssignments(!openAssignments);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAccountId(accountProperties().id);
    setAccountRoles(accountProperties().roles);
    setAccountName(accountProperties().name);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="white"
        position="fixed"
      >
        <Toolbar>
          {/* items on left of navbar*/}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push("/")}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <HomeIcon />
          </IconButton>
          <Box display="flex" ml="auto">
            <img src={itworx} width={100}></img>
            <Typography style={{ marginTop: "auto", fontSize: "small" }}>
              TPD
            </Typography>
          </Box>
          {/* Items on the right side of the navigation bar */}
          <Box display="flex" alignItems="center" ml="auto">
            <Box display="flex" alignItems="center">
              <Link
                color="primary"
                color="inherit"
                href="#"
                onClick={() => history.push("/profile")}
              >
                <Typography display="inline">
                  {accountName}
                  {accountRoles.includes("TPD Team")
                    ? " / TPD Team"
                    : accountRoles.includes("Manager")
                    ? " / Manager"
                    : " / Employee"}
                </Typography>
              </Link>
            </Box>
            <Box display="flex" alignItems="center" pl={2}>
              <Avatar src={profile}></Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className={clsx(classes.navBarIcons)} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {accountRoles.includes("TPD Team") ? (
          <List>
            <ListItem
              button
              onClick={handleTalentClick}
              key={"Talent Requests"}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Talent Requests"}
                className={clsx(classes.navBarList)}
              />
              {openTalent ? (
                <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
              ) : (
                <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
              )}
            </ListItem>
            <Collapse in={openTalent} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/resource-requests");
                  }}
                >
                  Resource Requests
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/release-requests");
                  }}
                >
                  Release Requests
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleSkillsClick} key={"Skills"}>
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                {/* <img src={PsychologyIcon}></img> */}
              </ListItemIcon>
              <ListItemText
                primary={"Skills"}
                className={clsx(classes.navBarList)}
              />
              {openSkills ? (
                <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
              ) : (
                <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
              )}
            </ListItem>
            <Collapse in={openSkills} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/skills-listing");
                  }}
                >
                  Skills List
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/skill-tracking");
                  }}
                >
                  Skills Tracking
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/skills-history");
                  }}
                >
                  Skills History
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={handleCertificationsClick}
              key={"Certifications"}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                {/* <img src={PsychologyIcon}></img> */}
              </ListItemIcon>
              <ListItemText
                primary={"Certifications"}
                className={clsx(classes.navBarList)}
              />
              {openCertifications ? (
                <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
              ) : (
                <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
              )}
            </ListItem>
            <Collapse in={openCertifications} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/certification-providers");
                  }}
                >
                  Certifications Providers List
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/certifications-list");
                  }}
                >
                  Certifications List
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/certifications-history");
                  }}
                >
                  Certifications History
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              key={"EmployeeTrainings"}
              onClick={() => {
                setOpen(false);
                history.push("/employee-trainings");
              }}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Employees Trainings"}
                className={clsx(classes.navBarList)}
              />
            </ListItem>
            <ListItem
              button
              key={"Employees"}
              onClick={() => {
                setOpen(false);
                history.push("/employees");
              }}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Employees"}
                className={clsx(classes.navBarList)}
              />
            </ListItem>
          </List>
        ) : (
          <List>
            {accountRoles.includes("Manager") ? (
              <>
                {" "}
                <ListItem
                  button
                  onClick={handleTalentClick}
                  key={"Talent Requests"}
                >
                  <ListItemIcon className={clsx(classes.navBarIcons)}>
                    <PermContactCalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Talent Requests"}
                    className={clsx(classes.navBarList)}
                  />
                  {openTalent ? (
                    <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
                  ) : (
                    <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
                  )}
                </ListItem>
                <Collapse in={openTalent} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      className={clsx(classes.navBarSubList)}
                      onClick={() => {
                        setOpen(false);
                        history.push("/resource-requests");
                      }}
                    >
                      Resource Requests
                    </ListItem>
                    <ListItem
                      button
                      className={clsx(classes.navBarSubList)}
                      onClick={() => {
                        setOpen(false);
                        history.push("/release-requests");
                      }}
                    >
                      Release Requests
                    </ListItem>
                  </List>
                </Collapse>
              </>
            ) : (
              ""
            )}
            <ListItem
              button
              onClick={handleAssignmentsClick}
              key={"Assignments"}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                {/* <img src={PsychologyIcon}></img> */}
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Assignments"}
                className={clsx(classes.navBarList)}
              />
              {openSkills ? (
                <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
              ) : (
                <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
              )}
            </ListItem>
            <Collapse in={openAssignments} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/profile/assignments");
                  }}
                >
                  Current Assignments
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/profile/assignments/history");
                  }}
                >
                  Assignments History
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={handleEmployeeCertificationsClick}
              key={"Skills and Certifications"}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Skills and Certifications"}
                className={clsx(classes.navBarList)}
              />
              {openCertifications ? (
                <ArrowDropUpIcon className={clsx(classes.navBarIcons)} />
              ) : (
                <ArrowDropDownIcon className={clsx(classes.navBarIcons)} />
              )}
            </ListItem>
            <Collapse
              in={openEmployeeCertifications}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/profile/skills");
                  }}
                >
                  Skills
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/profile/certifications");
                  }}
                >
                  Certifications
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.navBarSubList)}
                  onClick={() => {
                    setOpen(false);
                    history.push("/profile/trainings");
                  }}
                >
                  Trainings
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              key={"Profile"}
              onClick={() => {
                setOpen(false);
                history.push("/profile");
              }}
            >
              <ListItemIcon className={clsx(classes.navBarIcons)}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={"My Profile"}
                className={clsx(classes.navBarList)}
              />
            </ListItem>
          </List>
        )}

        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={logout}
        >
          Logout
        </Button>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* {pages.pages} */}
      </main>
    </div>
  );
}
