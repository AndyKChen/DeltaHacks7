import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#21242b',
    width: '100vw',
    height: '100vh',
    padding: '80px',
  },
  videoContainer: {
    position: 'relative',
    flexGrow: '5',
    background: theme.palette.secondary.main,
    width: '600px',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
  },
  chatContainer: {
    flexGrow: '1',
  },
  downloadBtn: {
    zIndex: '10',
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
}));

export default useStyles;
