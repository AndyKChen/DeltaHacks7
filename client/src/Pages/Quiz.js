import Button from '@material-ui/core/Button';
import React from 'react';
import Navigation from '../Components/Navigation/Navigation';

const Quiz = () => {
  return (
    <div>
      <Navigation />
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </div>
  );
};

export default Quiz;
