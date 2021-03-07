import React from 'react';
import Navigation from '../Components/Navigation/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Image from 'material-ui-image';



class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      score: 0,
      questionNumber: 1,
      question: "",
      answer: ""
    }
  }

  componentDidMount(){
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    axios.get(BACKEND_URL + '/random-question').then((res) => {
      console.log(res);
      this.setState({question: res.data['picture'], answer: res.data['translation']});
    });
  }

  getItems = () => {
    const random = Math.floor(Math.random() * 4);
    let res = [];
    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * 25);
      let val = String.fromCharCode('a'.charCodeAt(0)+randomNum);
      while(val === this.state.answer){
        randomNum = Math.floor(Math.random() * 25);
        val = String.fromCharCode('a'.charCodeAt(0)+randomNum);
      }
      if(i === random){
          res.push(this.state.answer);
      }else{
        res.push(val);
      } 
    }
    return res;
  }

  handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			this.setState((state) => { return {score: state.score + 1}; });
		}
    this.setState((state) => { return {questionNumber: state.questionNumber + 1}; });
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    axios.get(BACKEND_URL + '/random-question').then((res) => {
      console.log(res);
      this.setState({question: res.data['picture'], answer: res.data['translation']});
    });
	};

  render() {
    return(
      <div>
      { this.state.question !== "" ? 
    <div>
      <Navigation />
      <Container>
      <div>
      <Image src={this.state.question} imageStyle={{maxHeight: 100, maxWidth: 100, display: 'flex', justifyText: 'center'}} />
      </div>
      <List>

        {this.getItems().map((item) => 
        <ListItem button onClick={()=>this.handleAnswerOptionClick(item===this.state.answer)}>
          {item}
        </ListItem>)}
      </List>
      </Container>
    </div>
          : <div> </div>

    
    }
    </div>
    );
  };

};

// const Quiz = () => {
// 	//const [showScore, setShowScore] = useState(false);
// 	const [score, setScore] = React.useState(0);
//   const [questionNumber, setQuestionNumber] = React.useState(0);
//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//   React.useEffect( ()=> {
//     setQuestionNumber(questionNumber+1);
//   });

//   React.useEffect( ()=> {

//   }, [questionNumber]);


//   function getItems() {
//     const random = Math.floor(Math.random() * 4);
//     let res = [];
//     for (let i = 0; i < 4; i++) {
//       let randomNum = Math.floor(Math.random() * 25);
//       let val = String.fromCharCode('a'.charCodeAt(0)+randomNum);
//       while(val === answer){
//         randomNum = Math.floor(Math.random() * 25);
//         val = String.fromCharCode('a'.charCodeAt(0)+randomNum);
//       }
//       if(i === random){
//           res.push(answer);
//       }else{
//         res.push(val);
//       } 
//     }
//     return res;
//   }

//   const handleAnswerOptionClick = (isCorrect) => {
// 		if (isCorrect) {
// 			this.state.score++;
// 		}
//     this.state.questionNumber++;
// 	};

//   const items = getItems();
//   render (
//     <div>
//       <Navigation />
//       <div>
//       <img src={question} />
//       </div>

//       <List>

//         {items.map((item) => 
//         <ListItem button onClick={()=>handleAnswerOptionClick(item===answer)}>
//           {item}
//         </ListItem>)}
//       </List>


      
//     </div>
//   );
// };

export default Quiz;
