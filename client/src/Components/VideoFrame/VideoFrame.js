import Fab from '@material-ui/core/Fab';
import React from 'react';
import useStyles from './VideoFrame-jss';

const VideoFrame = () => {
  const classes = useStyles();
  return (
    <div className={classes.videoFrame}>
      <video autoPlay playsInline muted id="webcam" className={classes.video}></video>
      <div class={classes.nameContainer}>
        <Fab
          disableRipple
          disableFocusRipple
          variant="extended"
          aria-label="add"
          className={classes.fab}
        >
          <div>
            <div class={classes.name}>James Cahyadi</div>
            <div class={classes.prediction}>
              Prediction (<span id="confidence"></span>%:) <span id="predictions"></span>
            </div>
          </div>
        </Fab>
      </div>
    </div>
  );
};

export default VideoFrame;
