import React from "react";
import Login from "./views/Login";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
