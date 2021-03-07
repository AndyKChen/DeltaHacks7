import { AppBar, Button } from '@material-ui/core';
import { BrowserRouter, Link } from 'react-router-dom';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import useStyles from './Navigation.jss';

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
                <Button color="primary" href="/" className={classes.linkButton}>
                  Home
                  <HomeIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" href="/train" className={classes.linkButton}>
                  Train
                  <AllInclusiveIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  color="primary"
                  href="https://www.handspeak.com/word/search/index.php?id=2857"
                  target="_blank"
                  className={classes.linkButton}
                >
                  Documentation
                  <CreateIcon />
                </Button>
              </Grid>
            </Grid>
          </div>
        </section>
      </AppBar>
    </BrowserRouter>
  );
};
export default Navigation;
