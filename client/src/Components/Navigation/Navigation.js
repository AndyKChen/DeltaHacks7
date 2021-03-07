import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,

} from '@material-ui/core';
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {BrowserRouter, Link} from 'react-router-dom';
import useStyles from './Navigation.jss'; 

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
    </AppBar>
    </BrowserRouter>

  );
};
export default Navigation;
