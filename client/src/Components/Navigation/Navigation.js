import "../Navigation/Navigation.css";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#FBFBFB"
  },
  title: {
    flexGrow: 1,
    color: "#FBFBFB"
  },
  navBar: {
    "background-color": "#232323"
  },
  buttonText: {
    color: "#FBFBFB",
  },
  button:{
    border: "1px solid #FBFBFB",
  },
}));
const Navigation = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navBar}>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="#FBFBFB" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        News
      </Typography>
      <Button className={classes.button}>
        <Typography className={classes.buttonText}>
        Login
        </Typography>
        </Button>
    </Toolbar>
  </AppBar>
  );
};
export default Navigation;
