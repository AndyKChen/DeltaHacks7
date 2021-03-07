import {
  AppBar,
  Button,

} from '@material-ui/core';
import React from "react";
import {BrowserRouter, Link} from 'react-router-dom';
import useStyles from './Navigation.jss'; 
import HomeIcon from '@material-ui/icons/Home';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';

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
          <div value={value} onChange={handleChange} aria-label="styled tabs example">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Button color="primary" href="/" className={classes.linkButton}>Home<HomeIcon/></Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" href="/train" className={classes.linkButton}>Train<AllInclusiveIcon/></Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" href="/quiz" className={classes.linkButton}>Quiz<CreateIcon/></Button>
              </Grid>
            </Grid>
          </div>
        </section>
      </AppBar>
    </BrowserRouter>
    
  );
};
export default Navigation;