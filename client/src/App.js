import "rodal/lib/rodal.css";

import { Route, Switch } from "react-router-dom";

import Landing from "./Pages/Landing";
import Quiz from "./Pages/Quiz";
import React from "react";
import Train from "./Pages/Train";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/train">
          <Train />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
      </Switch>
    </>
  );
}

export default App;
