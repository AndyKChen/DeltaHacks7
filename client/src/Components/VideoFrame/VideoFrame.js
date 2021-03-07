import Fab from '@material-ui/core/Fab';
import React from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import useStyles from './VideoFrame-jss';

const VideoFrame = ({ video, id, prediction, name }) => {
  const classes = useStyles();
  let videoElem = <video autoPlay playsInline muted id="webcam" className={classes.video}></video>;
  if (video) {
    videoElem = video;
  }
  const idx = name.indexOf('@');
  name = name.slice(0, idx);
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
            <div className={classes.name}>{name}</div>
            <div className={classes.prediction}>
              Prediction (<span id="confidence"></span>%): <span id={id}>{prediction}</span>
            </div>
          </div>
        </Fab>
      </div>
    </div>
  );
};

export default VideoFrame;
