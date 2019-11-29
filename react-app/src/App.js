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
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      links: ["Home", "About", "Demo"],
      showFriendsModal: false,
      showFavoritesModal: false,
      showSettingsModal: false,
      userSearch: "",
      userSearchResults: null 
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
    this.createUserNavItem = this.createUserNavItem.bind(this);

    this.handleSearchUserInputChange = this.handleSearchUserInputChange.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  signIn(user) {
    // set the user state variable (this function is called through the signup page)
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/" + user.SortKey,
      data: {},
      onSuccess: response => {
        if (response.data.Item !== undefined) {
          console.log("IN SIGN IN");
          console.log(response.data.Item);
          this.setState({ user: response.data.Item });
        }
      }
    });
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
                src={this.state.user.Picture}
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Header>{this.state.user.Nickname}</Dropdown.Header>
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

  searchUsers() {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/search/" + this.state.userSearch,
      data: {},
      onSuccess: response => {
        console.log(response)
        this.setState({userSearchResults: response.data.Items})
      }
    });
  }

  handleSearchUserInputChange(event) {
    this.setState({userSearch: event.target.value});
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
          <dt>Nickname</dt> <dd>{this.state.user.Nickname}</dd>
          <dt>Profile Picture URL</dt> <dd>{this.state.user.Picture}</dd>
          <dt>Preferred Price Range</dt>
          <dd>
            {"($" +
              this.state.user.PriceMin +
              ", $" +
              this.state.user.PriceMax +
              ")"}
          </dd>
        </dl>
      );

      // if (this.state.user.Following.length == 0) {
      //   var followList = (
      //     <p>
      //       You are not following anyone. QAQ Use the search bar above to cure
      //       your loneliness.
      //     </p>
      //   );
      // } else {
      //   var followList = this.state.user.Following.map(function(anotherUser) {
      //     return (
      //       <div>
      //         <hr />
      //         <UserBlurb user={anotherUser}></UserBlurb>
      //       </div>
      //     );
      //   });
      // }

      if (this.state.userSearchResults != null) {
        console.log("HIIIIIII")
        var searchResults = this.state.userSearchResults.map(function(user) {
          return (<div>
            <hr/>
            <UserBlurb user={user}></UserBlurb>
          </div>);
        })
      }
    }

    return (
      <div className="App">
        <Router>
          <div className="fixed-top">
            <Navbar bg="dark" expand="sm" className="bg-dark fixed-top pt-3">
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
            <div
              className="navbar-sunkist mt-5 pt-5"
              style={{ height: "5px" }}
            ></div>
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
            <Modal.Title>
              {" "}
              <i className="fa fa-heart text-danger mr-3"></i>Favorites
            </Modal.Title>
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
            <Modal.Title>
              {" "}
              <i className="fa fa-users text-primary mr-3"></i>Friends
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Search bar for users */} 
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fa fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleSearchUserInputChange}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.searchUsers();
                  }
                }}
              ></FormControl>
            </InputGroup>

            {searchResults}
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showSettingsModal}
          onHide={this.toggleSettings.bind(this, false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <i className="fa fa-cog text-dark mr-3"></i>Settings
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>{settingsList}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

class UserBlurb extends React.Component {
  constructor(props) {
    super(props);

    this.state = { added: false };

    this.follow = this.follow.bind(this);
  }

  follow() {
    // post request to add follow and then set the state to added on success
    this.setState({ added: true });
  }

  render() {
    if (this.state.added) {
      var followButton = (
        <button className="btn" disabled>
          <i className="fa fa-check fa-lg"></i>
        </button>
      );
    } else {
      followButton = (
        <button className="btn btn-success" onClick={this.follow} type>
          <i className="fa fa-plus fa-lg"></i>
        </button>
      );
    }

    return (
      <div className="d-flex align-items-center">
        <img
          className="mr-3"
          style={{ maxWidth: "40px" }}
          src={this.props.user.Picture}
          alt="Profile Picture"
        />
        <h5>{this.props.user.Nickname}</h5>

        <div className="ml-auto">{followButton}</div>
      </div>
    );
  }
}

export default App;
