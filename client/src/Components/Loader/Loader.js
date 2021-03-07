import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import useStyles from './Loader-jss';

const Loader = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.centered} />;
};

export default Loader;
