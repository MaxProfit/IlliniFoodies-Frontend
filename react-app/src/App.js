import React from "react";
import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import DemoPage from "./DemoPage";
import SignUp from "./SignUp";

const axios = require("axios").default;

// generic axios request
function axiosRequest(request) {
  console.log(request);
  axios[request.type](request.url, request.data)
    .then(function(response) {
      console.log(response);
      if (response.status === 200) {
        request.onSuccess(response);
      }
    })
    .catch(error => console.log(error));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      links: ["Home", "About", "Demo"]
    };
  }

  render() {
    var user = axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/" + document.cookie.split("=")[1],
      data: {},
      onSuccess: (function(response) {console.log(response)})
    })

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
        <li key="user" className="nav-item nav-link">
          <Dropdown>
            <Dropdown.Toggle variant="light">
              <img
                className="navbar-image rounded-circle thumbnail mr-1"
                src={require("./images/missing2.png")}
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Item>{this.state.user.nickname}</Dropdown.Item>
              <Dropdown.Item><i className="fa fa-sign-out"></i> Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          <Navbar bg="light" expand="sm" className="bg-light fixed-top pt-3">
            <Navbar.Brand className="mr-auto">
              <Link to="/" className="btn-link">
                <div className="d-flex flex-row">
                  <img
                    className="navbar-image mr-3 ml-2 mt-1"
                    src={require("./images/logo.png")}
                  ></img>
                  <h2 className="text-dark">Illini Foodies</h2>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="foodie-navbar" />

            <Navbar.Collapse id="foodie-navbar">
              <Nav className="ml-auto">
                {navLinks}
                {userLink}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

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
