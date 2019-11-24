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
import Modal from "react-bootstrap/Modal";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      links: ["Home", "About", "Demo"],
      showFriendsModal: false,
      showFavoritesModal: false,
      showSettingsModal: false
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
    this.createUserNavItem = this.createUserNavItem.bind(this);
  }

  signIn(user) {
    // set the user state variable (this function is called through the signup page)
    this.setState({ user: user });
  }

  signOut() {
    // clear internal user state
    this.setState({ user: null });

    // clear the cookie
    setCookie("userid", "");
  }

  // handlers to toggle the show/hide state variable for various user specific info modals
  toggleFavorites(show) {
    this.setState({ showFavoritesModal: show });
  }

  toggleFriends(show) {
    this.setState({ showFriendsModal: show });
  }

  toggleSettings(show) {
    this.setState({ showSettingsModal: show });
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
            <Dropdown.Toggle variant="dark">
              <img
                className="navbar-image rounded-circle thumbnail mr-1"
                src={this.state.user.picture}
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Header>{this.state.user.nickname}</Dropdown.Header>
              <Dropdown.Item onClick={this.toggleFavorites.bind(this, true)}>
                <i className="fa fa-heart text-danger mr-3"></i>Favorites
              </Dropdown.Item>
              <Dropdown.Item onClick={this.toggleFriends.bind(this, true)}>
                <i className="fa fa-users text-primary mr-3"></i>Friends
              </Dropdown.Item>
              <Dropdown.Item onClick={this.toggleSettings.bind(this, true)}>
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
    let userid = getCookie("userid");
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
          className="nav-item nav-link text-white mt-2"
        >
          {name}
        </Link>
      );
    });

    if (this.state.user != null) {
      var settingsList = (
        <dl>
          <dt>Nickname</dt> <dd>{this.state.user.nickname}</dd>
          <dt>Profile Picture URL</dt> <dd>{this.state.user.picture}</dd>
          <dt>Preferred Price Range</dt>{" "}
          <dd>
            {"($" +
              this.state.user.priceMin +
              ", $" +
              this.state.user.priceMax +
              ")"}
          </dd>
        </dl>
      );
    }

    return (
      <div className="App">
        <Router>
          <div className="fixed-top">
            <Navbar
              bg="dark"
              expand="sm"
              className="bg-dark fixed-top pt-3"
            >
              <Navbar.Brand className="mr-auto">
                <Link to="/" className="btn-link">
                  <div className="d-flex flex-row">
                    <img
                      className="navbar-image mr-3 ml-2 mt-1"
                      src={require("./images/logo.png")}
                    ></img>
                    <h2 className="text-white">Illini Foodies</h2>
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
            <div className="navbar-sunkist mt-5 pt-5" style={{"height": "5px"}}></div>
          </div>

          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/demo" component={DemoPage} />
          <Route
            path="/signin"
            component={() => <SignUp signIn={this.signIn}></SignUp>}
          />
        </Router>

        <Modal
          show={this.state.showFavoritesModal}
          onHide={this.toggleFavorites.bind(this, false)}
        >
          <Modal.Header closeButton>
            <Modal.Title> <i className="fa fa-heart text-danger mr-3"></i>Favorites</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have no favorites saved.</p>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showFriendsModal}
          onHide={this.toggleFriends.bind(this, false)}
        >
          <Modal.Header closeButton>
            <Modal.Title> <i className="fa fa-users text-primary mr-3"></i>Friends</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have no friends. <strong>QAQ</strong></p>
          </Modal.Body>
        </Modal>
        
        <Modal
          show={this.state.showSettingsModal}
          onHide={this.toggleSettings.bind(this, false)}
        >
          <Modal.Header closeButton>
            <Modal.Title> <i className="fa fa-cog text-dark mr-3"></i>Settings</Modal.Title>
          </Modal.Header>

          <Modal.Body>{settingsList}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;
