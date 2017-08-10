import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./views/app/app";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Router, Route, Link, browserHistory } from "react-router";

import Pomodoro from "./views/pages/Pomodoro/Pomodoro";
import Todo from './views/pages/Todo/Todo';
import Lifehacks from './views/pages/Lifehacks/Lifehacks';
import Routine from './views/pages/Routine/Routine';
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="pomodoro" component={Pomodoro} />
        <Route path="todo" component={Todo} />
        <Route path="routine" component={Routine} />
        <Route path="lifehacks" component={Lifehacks} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
