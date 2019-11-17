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

import { axiosRequest, setCookie, getCookie } from "./Util";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      links: ["Home", "About", "Demo"]
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.createUserNavItem = this.createUserNavItem.bind(this);
  }

  signOut() {
    // clear internal user state
    this.setState({ user: null });

    // clear the cookie
    setCookie("userid", "");
  }

  signIn(user) {
    this.setState({ user: user });
  }

  createUserNavItem() {
    // if the user is not signed in, display a login button
    if (this.state.user === null) {
      return (
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
    }

    // otherwise display the user menu
    else {
      return (
        <li key="user" className="nav-item nav-link">
          <Dropdown>
            <Dropdown.Toggle variant="light">
              <img
                className="navbar-image rounded-circle thumbnail mr-1"
                src={require("./images/missing2.png")}
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Header>{this.state.user.nickname}</Dropdown.Header>
              <Dropdown.Item>
                <i className="fa fa-heart text-danger mr-3"></i>Favorites
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fa fa-users text-primary mr-3"></i>Friends
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fa fa-cog text-dark mr-3"></i>Settings
              </Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item onClick={this.signOut}>
                <i className="fa fa-sign-out text-dark mr-2"></i> Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );
    }
  }

  componentDidMount() {
    console.log("IN COMPONENT DID MOUNT");
    let userid = getCookie("userid");
    console.log(userid);
    if (userid != "") {
      axiosRequest({
        type: "get",
        url: "https://api.illinifoodies.xyz/user/" + userid,
        data: {},
        onSuccess: response => {
          if (response.data.Item !== undefined) {
            this.setState({ user: response.data.Item });
          }
        }
      });
    }
  }

  render() {
    // map the navbar links to link components for rendering
    var navLinks = this.state.links.map(function(name) {
      return (
        <Link
          key={name + "-link"}
          to={"/" + name}
          className="nav-item nav-link mt-2"
        >
          {name}
        </Link>
      );
    });

    return (
      <div className="App">
        <Router>
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
                {this.createUserNavItem()}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/demo" component={DemoPage} />
          <Route
            path="/signin"
            component={() => <SignUp signIn={this.signIn}></SignUp>}
          />
        </Router>
      </div>
    );
  }
}

export default App;
