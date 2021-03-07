import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "#FBFBFB"
    },
    title: {
      flexGrow: 1,
      color: "#FBFBFB"
    },
    navBar: {
      "background-color": "#232323"
    },
    buttonText: {
      color: "#FBFBFB",
    },
    button:{
      border: "1px solid #FBFBFB",
      marginRight: 10
    },
      padding: {
        padding: theme.spacing(3),
      },
      demo1: {
        backgroundColor: theme.palette.background.paper,
      },
      demo2: {
        backgroundColor: '#232323',
      },
      ctr: {
        margin: 'auto',
      },
  }));

export default useStyles; 