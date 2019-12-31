import React from "react";
import Login from "./views/Login";
import loadable from "./utils/loadable";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./style/base.scss";
import "./style/App.scss";
import "animate.css";
const DefluatLayout = loadable(() => import("./containers"));

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" render={() => <Redirect to="/index" />} />
          <Route component={DefluatLayout}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
