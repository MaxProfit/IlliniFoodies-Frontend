import React from "react";
import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import DemoPage from "./DemoPage";
import SignUp from "./SignUp";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      links: ["Home", "About", "Demo"]
    };
  }

  render() {
    if (this.state.user == null) {
      var userLink = (
        <li key="login" className="nav-item nav-link">
          <a
            className="btn text-white"
            href="https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz/signin"
            style={{
              backgroundImage: "linear-gradient(to top right, #00b4db, #0083b0)"
            }}
          >
            Log In
          </a>
        </li>
      );
    } else {
      var userLink = (
        <li key="user" className="nav-item nav-link mt-2">
          <img className="navbar-image rounded-circle thumbnail ml-1" src={require("./images/missing2.png")}></img>
          {this.state.user.nickname}
        </li>
      );
    }

    var navLinks = this.state.links.map(function(name, self = this) {
      return (
        <Link to={"/" + name} className="nav-item nav-link mt-2">
          {name}
        </Link>
      );
    });

    return (
      <div className="App">
        <Router>
          {/*Navbar*/}
          <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top pt-3">
            <Link to="/" className="btn-link">
              <div className="d-flex flex-row">
                <img
                  className="navbar-image mr-3 ml-2 mt-1"
                  src={require("./images/logo.png")}
                ></img>
                <h2 className="text-dark">Illini Foodies</h2>
              </div>
            </Link>

            <ul className="navbar-nav ml-auto">
              {navLinks}
              {userLink}
            </ul>
          </nav>

          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/demo" component={DemoPage} />
          <Route
            path="/signin"
            component={() => <SignUp app={this}></SignUp>}
          />
        </Router>
      </div>
    );
  }
}

export default App;
