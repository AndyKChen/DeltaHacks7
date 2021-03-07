import Fab from '@material-ui/core/Fab';
import React from 'react';
import useStyles from './VideoFrame-jss';
import { useAuth } from '../../Contexts/AuthContext'

const VideoFrame = () => {
  const classes = useStyles();
  const { currentUser } = useAuth()
  return (
    <div className={classes.videoFrame}>
      <video autoPlay playsInline muted id="webcam" className={classes.video}></video>
      <div className={classes.nameContainer}>
        <Fab
          disableRipple
          disableFocusRipple
          variant="extended"
          aria-label="add"
          className={classes.fab}
        >
          <div>
            <div className={classes.name}>{currentUser ? currentUser.email : "Not signed in"}</div>
            <div className={classes.prediction}>
              Prediction (<span id="confidence"></span>%): <span id="predictions"></span>
              <button hidden id="change-prediction"></button>
            </div>
          </div>
        </Fab>
      </div>
    </div>
  );
};

export default VideoFrame;
