import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  videoBackground: {
    background: 'black',
    padding: '20px',
    boxSizing: 'border-box',
  },
  videoContainer: {
    position: 'relative',
    flexGrow: '5',
    background: theme.palette.secondary.main,
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
  },
  twoVideos: {
    display: 'flex',
    gap: '100px',
  },
  video: {
    border: '3px solid grey',
    borderRadius: '20px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallBtn: {
    background: '#ef5a5c',
    color: '#ffffff',
    marginTop: '15px',
    '&:hover': {
      backgroundColor: '#f28d8e',
    },
  },
}));
export default useStyles;
