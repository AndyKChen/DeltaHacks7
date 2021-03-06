import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  videoFrame: {
    position: 'relative',
    width: '500px',
    height: '400px',
  },
  video: {
    position: 'relative',
    border: '3px solid grey',
    borderRadius: '20px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  fab: {
    cursor: 'default',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    pointerEvents: 'none',
    width: '200px',
    height: 'auto',
  },
  nameContainer: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  },
  name: {
    fontWeight: '100',
    color: 'white',
    textTransform: 'none',
  },
  prediction: {
    fontSize: '12px',
    fontWeight: '100',
    color: 'white',
    textTransform: 'none',
  },
}));

export default useStyles;
