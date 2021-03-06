import Button from '@material-ui/core/Button';
import React from 'react';
import Navigation from '../Components/Navigation/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';


const Quiz = () => {
  const [question, setQuestion] = React.useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  React.useEffect( ()=> {
    axios.get(BACKEND_URL + '/random-question').then((res) => {
      console.log(res);
      setQuestion(res.data["picture"]);
    })
  }, []);
  return (
    <div>
      <Navigation />
      
      <List>
        <ListItem button><img src={question} /></ListItem>
      </List>


      
    </div>
  );
};

export default Quiz;
