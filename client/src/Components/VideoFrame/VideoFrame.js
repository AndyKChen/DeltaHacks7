import Fab from '@material-ui/core/Fab';
import React from 'react';
import useStyles from './VideoFrame-jss';

const VideoFrame = ({ video, id }) => {
  const classes = useStyles();
  let videoElem = <video autoPlay playsInline muted id="webcam" className={classes.video}></video>;
  if (video) {
    videoElem = video;
  }
  return (
    <div className={classes.videoFrame}>
      {videoElem}
      <div className={classes.nameContainer}>
        <Fab
          disableRipple
          disableFocusRipple
          variant="extended"
          aria-label="add"
          className={classes.fab}
        >
          <div>
            <div className={classes.name}>James Cahyadi</div>
            <div className={classes.prediction}>
              Prediction (<span id="confidence"></span>%): <span id={id}></span>
              <button hidden id="change-prediction"></button>
            </div>
          </div>
        </Fab>
      </div>
    </div>
  );
};

export default VideoFrame;
