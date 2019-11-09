import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import DemoPage from "./DemoPage";
import SignUp from "./SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "typeface-roboto";
import "font-awesome/css/font-awesome.min.css";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/signup" component={SignUp} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
