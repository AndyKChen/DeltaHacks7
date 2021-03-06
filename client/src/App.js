import { Route, Switch, Redirect } from "react-router-dom"; 

import Landing from './Pages/Landing';
import Quiz from './Pages/Quiz';
import React from 'react';
import Train from './Pages/Train';
import Signup from './Pages/Signup'; 
import Login from './Pages/Login'; 
import { AuthProvider } from './Contexts/AuthContext';
import { useAuth } from './Contexts/AuthContext';
import PrivateRoute from './Pages/PrivateRoute'; 

function App() {
  return (
    <div>
      <AuthProvider>
        <Switch>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/" component={Landing}/>
          <Route exact path="/train" component={Train}/>
          <Route exact path="/quiz" component={Quiz}/>
        </Switch>
      </AuthProvider>
    </div>    
  );
}

export default App;
