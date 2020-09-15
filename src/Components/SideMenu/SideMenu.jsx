import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PeopleIcon from "@material-ui/icons/People";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import InsightsIcon from "./assets/insightssvg.svg";
import PsychologyIcon from "./assets/psychology-white-24dp.svg";

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
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000000",
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SideMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openTalent, setOpenTalent] = React.useState(false);
  const [openSkills, setOpenSkills] = React.useState(false);

  const handleTalentClick = () => {
    setOpenTalent(!openTalent);
  };

  const handleSkillsClick = () => {
    setOpenSkills(!openSkills);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
        <List>
          <ListItem button onClick={handleTalentClick} key={"Talent Requests"}>
            <ListItemIcon className={clsx(classes.navBarIcons)}>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Talent Requests"}
              className={clsx(classes.navBarIcons)}
            />
            {openTalent ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTalent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Resource Request"
                  className={clsx(classes.navBarIcons)}
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Release Request"
                  className={clsx(classes.navBarIcons)}
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={handleSkillsClick}
            key={"Skills & Certifications"}
          >
            <ListItemIcon className={clsx(classes.navBarIcons)}>
              <img src={PsychologyIcon}></img>
            </ListItemIcon>
            <ListItemText
              primary={"Skills & Certifications"}
              className={clsx(classes.navBarIcons)}
            />
            {openSkills ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSkills} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Skills"
                  className={clsx(classes.navBarIcons)}
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Certifications"
                  className={clsx(classes.navBarIcons)}
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Trainings"
                  className={clsx(classes.navBarIcons)}
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key={"Employees"}>
            <ListItemIcon className={clsx(classes.navBarIcons)}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Employees"}
              className={clsx(classes.navBarIcons)}
            />
          </ListItem>
          <ListItem button key={"Insights & Analytics"}>
            <ListItemIcon className={clsx(classes.navBarIcons)}>
              <img src={InsightsIcon}></img>
            </ListItemIcon>
            <ListItemText
              primary={"Insights & Analytics"}
              className={clsx(classes.navBarIcons)}
            />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
    </div>
  );
}
