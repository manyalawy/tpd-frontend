import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import profile from "./assets/profile.png";
import itworx from "./assets/download.png";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";
import { sizing } from "@material-ui/system";

function NavBar() {
  return (
    <AppBar color="white" position="static">
      <Toolbar>
        {/* items on left of navbar*/}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <HomeIcon />
        <Box mr="auto" ml="auto">
          <img src={itworx} width={100}></img>
        </Box>
        {/* Items on the right side of the navigation bar */}
        <Box display="flex" alignItems="center" ml="auto">
          <Box display="flex" alignItems="center">
            <Link color="primary" color="inherit" href="#">
              <Typography display="inline">Youssef El Manyalawy</Typography>
            </Link>
          </Box>
          <Box display="flex" alignItems="center" pl={2}>
            <Avatar src={profile}></Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
