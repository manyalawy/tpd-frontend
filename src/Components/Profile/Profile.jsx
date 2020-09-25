import React, { useState } from "react";
import profile from "./Assets/profile.png";
import "./Profile.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BasicInfo from "./BasicInfo.jsx";
import SkillsAndCer from "./SkillsAndCer.jsx";

export default function Profile() {
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangeIndex = (index) => {
    setTab(index);
  };
  return (
    <div>
      <div>
        <img
          className="profilePic mx-auto d-block"
          src={profile}
          alt="profile pic"
        />

        <h3 className="profileName text-center">Youssef El Manyalawy</h3>
        <h6 className="profileTitle text-center">Software Engineer</h6>
      </div>
      <div className="profileBody">
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            centered
          >
            <Tab label="Basic info" {...a11yProps(0)} />
            <Tab label="Skills and Certifications" {...a11yProps(1)} />
            <Tab label="Current Assigemnts" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tab}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={tab} index={0} dir={theme.direction}>
            <BasicInfo />
          </TabPanel>
          <TabPanel value={tab} index={1} dir={theme.direction}>
            <SkillsAndCer />
          </TabPanel>
          <TabPanel value={tab} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
