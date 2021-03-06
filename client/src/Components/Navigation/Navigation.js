//import "../Navigation/Navigation.css";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {BrowserRouter, Link} from 'react-router-dom';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

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
    marginRight: 10
  },
    padding: {
      padding: theme.spacing(3),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#232323',
    },
    ctr: {
      margin: 'auto',
    },
}));

const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
        <AppBar position="static" className={classes.navBar}>
          

      <section className={classes.ctr}>
      <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Learn" to="/learn" component={Link}/>
          <StyledTab label="Train" to="/train" component={Link}/>
          <StyledTab label="Talk" to="/talk" component={Link}/>
        </StyledTabs>
      </section>
      
      {/* <Button className={classes.button}>
        <Typography className={classes.buttonText}>
          Login
        </Typography>
      </Button> */}
  </AppBar>
    </BrowserRouter>

  );
};
export default Navigation;