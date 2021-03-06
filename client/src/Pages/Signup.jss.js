import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '90%', // Fix IE 11 issue.
      maxWidth: '600px',
      marginTop: theme.spacing(1),
      marginBottom: '100px',
      alignItems: 'center',
    },
    checkBox: {
        width: '100%',
        margin: 'auto',
    },
    textField: {
        maxWidth: '500px',
    },
    submit: {
      width: '50%',
      margin: '10px 25% 25px',
    },
    links: {
        textAlign: 'center',
        margin: 'auto'
    }
  }));
  export default useStyles;