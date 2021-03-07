import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    rootRoot: {
      backgroundColor: '#21242b',
      display: 'flex',
      justifyContent: 'center', 
      paddingTop: '10%',
      height: '100vh'
    },
    root: {
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      color: '#FFFFFF',
      backgroundColor: '#4e5361',
      height: '60%'
    },
    title: {
      fontWeight: '600'
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '3%'
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
      color: 'primary', 
      borderColor: 'primary'
    },
    submit: {
      width: '30%',
      margin: '10px 35% 25px',
    },
    links: {
        textAlign: 'center',
        margin: 'auto'
    }
  }));
  export default useStyles;