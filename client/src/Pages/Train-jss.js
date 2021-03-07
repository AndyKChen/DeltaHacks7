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
    marginLeft: '20px',
  },
  downloadBtn: {
    zIndex: '10',
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
  trainingCards: {
    color: 'white',
    fontSize: '24px',
    height: '500px',
    overflowY: 'auto',
    width: '400px',

    '&::-webkit-scrollbar': {
      padding: '5px',
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.secondary.main,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '5px',
      background: theme.palette.primary.main,
    },
  },
  classCard: {
    backgroundColor: '#1a1b20',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    marginTop: '10px',
  },
  classNameLabel: {
    fontSize: '18px',
  },
  imageNameLabel: {
    fontSize: '12px',
  },
  addImage: {
    fontSize: '12px',
    backgroundColor: '#2983fb',
    border: 'none',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inlineBlock',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  inputField: {
    width: '70%',
    border: '0',
    borderBottom: '2px solid gray',
    outline: '0',
    fontSize: '18px',
    color: 'white',
    padding: '7px 0',
    background: 'transparent',
    transition: 'border-color 0.2s',
  },
  addClass: {},
  addButton: {
    padding: '6px',
    marginLeft: '5px',
    color: '#ffffff',
  },
}));

export default useStyles;
