import React from "react";
import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import SignUp from "./SignUp";

import { axiosRequest, setCookie, getCookie } from "./Util";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null, // the current user's info
      following: [], // contains user objects for the users that the current user is following, not just ids
      links: ["Home", "About"], // non user-specific navbar links
      showFriendsModal: false,
      showFavoritesModal: false,
      showSettingsModal: false,
      userSearch: "", // relevant to user search in the friends modal
      userSearchResults: [],
      showFollows: true, // relevant to whether we should show follows or search results in the friends modal
      favRestaurants: [],
      recommendList: [],
      ratingList: []
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
    this.createUserNavItem = this.createUserNavItem.bind(this);

    this.handleSearchUserInputChange = this.handleSearchUserInputChange.bind(
      this
    );
    this.refreshFollowing = this.refreshFollowing.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.follow = this.follow.bind(this);
    this.getFavRestaurant = this.getFavRestaurant.bind(this);
    this.getRecommendation = this.getRecommendation.bind(this);
    this.getRatings = this.getRatings.bind(this);
  }

  getFavRestaurant(userId) {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/" + userId + "/favorites",
      data: {},
      onSuccess: response => {
        if (response.data !== undefined) {
          // console.log(response.data);
          this.setState({favRestaurants : response.data });
        }
      }
    });
  }

  getRecommendation(userId) {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/restaurants/recommendations",
      data: {},
      onSuccess: response => {
        if (response.data !== undefined) {
          // console.log(response);
          this.setState({recommendList : response.data });
        }
      }
    });
  }

  getRatings(userId) {
    var url = "https://api.illinifoodies.xyz/ratings";
    if (url !== null) {
      url += ("/loggedin/" + userId);
    }
    axiosRequest({
      type: "get",
      url: url,
      data: {},
      onSuccess: response => {
        if (response.data !== undefined) {
          // console.log(response);
          this.setState({ratingList : response.data });
        }
      }
    });
  }

  signIn(userId) {
    console.log("in signin")
    console.log(userId);
    // set the user state variable (this function is called through the signup page)
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/" + userId,
      data: {},
      onSuccess: response => {
        if (response.data.Item !== undefined) {
          this.setState({ user: response.data.Item });
          window.location = "/home";
        }
      }
    });
  }

  signOut() {
    // clear internal user state
    this.setState({ user: null, following: null });

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
                alt="Your profile"
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

  // search for users whose nicknames begin with the text entered
  // switch the display to show search results
  searchUsers() {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/user/search/" + this.state.userSearch,
      data: {},
      onSuccess: response => {
        if (response.data.Items === undefined) {
          this.setState({ showFollows: false, userSearchResults: [] });
        } else {
          this.setState({
            showFollows: false,
            userSearchResults: response.data.Items
          });
        }
      }
    });
  }

  // update the users friend list
  follow(anotherUserID, userBlurbCallback) {
    // create a copy of the following array since we don't want to
    // update the state unless the server update goes through
    let followingCopy = this.state.user.Following.slice(
      0,
      this.state.user.Following.length
    );
    followingCopy.push(anotherUserID);

    // updated user data
    let updatedUser = {
      Id: this.state.user.Id,
      PriceMin: this.state.user.PriceMin,
      PriceMax: this.state.user.PriceMax,
      Nickname: this.state.user.Nickname,
      Picture: this.state.user.Picture,
      Following: followingCopy // only this has changed
    };

    axiosRequest({
      type: "put",
      url: "https://api.illinifoodies.xyz/user/" + this.state.user.Id,
      data: updatedUser,
      onSuccess: response => {
        this.setState({ user: updatedUser });

        // callback to update user blurb UI
        userBlurbCallback();

        // update the array of users that the current user is following
        this.refreshFollowing();
      }
    });
  }

  // refresh the following array everytime we follow a new user
  // note: the following array contains user objects, not userids
  refreshFollowing() {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/users/" + this.state.user.Id + "/following",
      data: {},
      onSuccess: response => {
        this.setState({
          following: response.data.Responses.IlliniFoodiesUserTable
        });
      }
    });
  }

  handleSearchUserInputChange(event) {
    this.setState({ userSearch: event.target.value });
  }

  componentDidMount() {
    let userid = getCookie("userid");
    if (userid !== "") {
      axiosRequest({
        type: "get",
        url: "https://api.illinifoodies.xyz/user/" + userid,
        data: {},
        onSuccess: response => {
          if (response.data.Item !== undefined) {
            this.setState({ user: response.data.Item });
            this.refreshFollowing();
            this.getFavRestaurant(userid);
            this.getRecommendation(userid);
            this.getRatings(userid);
          }
        }
      });
    }

    if (this.state.user === null) {
      this.getRecommendation(null);
      this.getRatings(null);
    } else {

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

    // begin user-specific UI updates
    if (this.state.user !== null) {
      // display user settings
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

      // display users that the current user is following
      if (this.state.showFollows) {
        // remind the user that they are lonely QAQ
        if (this.state.user.Following.length === 0) {
          var followModalContents = (
            <div className="mt-3 text-center text-help">
              <p>You are not following anyone.</p>
              <p>
                Use the search bar above to cure your loneliness. (ﾉ´ヮ`)ﾉ*: ･ﾟ
              </p>
            </div>
          );
        }
        // otherwise, map each user we are following to a UI component
        else {
          followModalContents = this.state.following.map(function(anotherUser, index) {
            if(index === 0) {
              var header = <h6 className="mt-3 mb-3">You are following</h6>
            }
            else {
              header = <hr/>
            }

            return (
              <div key={"following" + anotherUser.Id}>
                {header}
                <UserBlurb user={anotherUser} followable={false}></UserBlurb>
              </div>
            );
          });
        }
      }

      // otherwise display user search results
      else {
        let onlyYouWereFound =
          this.state.userSearchResults.length === 1 &&
          this.state.userSearchResults[0].Id === this.state.user.Id;

        // no users were found by the search
        if (this.state.userSearchResults.length === 0 || onlyYouWereFound) {
          followModalContents = (
            <div className="d-flex flex-column">
              <hr />
              <p className="text-center text-help">
                No users found ┐(￣ヘ￣;)┌
              </p>
              <a
                className="ml-auto"
                href="#"
                onClick={() => this.setState({ showFollows: true })}
              >
                back
              </a>
            </div>
          );
        }
        // otherwise map each search result object to userblurb ui components
        else {
          followModalContents = this.state.userSearchResults.map(user => {
            // you cannot search for yourself
            if (user.Id !== this.state.user.Id) {
              return (
                <div className="d-flex flex-column" key={"follow-" + user.Id}>
                  <hr />
                  <UserBlurb
                    user={user}
                    follow={this.follow}
                    followable={true}
                    following={this.state.user.Following.includes(user.Id)}
                  ></UserBlurb>
                  <a
                    className="ml-auto"
                    href="#"
                    onClick={() => this.setState({ showFollows: true })}
                  >
                    back
                  </a>
                </div>
              );
            }
            return <div></div>; // otherwise return empty div
          });
        }
      }
    } // end of user-specific UI updates

    return (
      <div className="App">
        <Router>
          <div className="fixed-top">
            <Navbar bg="dark" expand="sm" className="bg-dark fixed-top pt-3">
              <Navbar.Brand className="mr-auto">
                <Link to="/" className="btn-link homepage-link">
                  <div className="d-flex flex-row">
                    <img
                      className="navbar-image mr-3 ml-2 mt-1"
                      src={require("./images/logo.png")}
                      alt="Illini Foodies Logo"
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
              className="navbar-sunkist mt-5 pt-5 navbar-yellow"
              style={{ height: "5px" }}
            ></div>
          </div>

          <Route exact path="/" component={() => <HomePage 
                                                    favRestaurants={this.state.favRestaurants} 
                                                    user={this.state.user} 
                                                    recommendList={this.state.recommendList}
                                                    ratingList={this.state.ratingList}
                                                  />} />
          <Route path="/home" component={() => <HomePage 
                                                    favRestaurants={this.state.favRestaurants} 
                                                    user={this.state.user} 
                                                    recommendList={this.state.recommendList}
                                                    ratingList={this.state.ratingList}
                                                />} />
          <Route path="/about" component={AboutPage} />
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

            {followModalContents}
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
    this.props.follow(this.props.user.Id, () => this.setState({ added: true }));
  }

  render() {
    if (this.props.followable) {
      if (this.state.added || this.props.following) {
        var followButton = (
          <button className="btn" disabled>
            <i className="fa fa-check fa-lg"></i>
          </button>
        );
      } else {
        followButton = (
          <button
            className="btn btn-success"
            onClick={this.follow}
            type="button"
          >
            <i className="fa fa-plus fa-lg"></i>
          </button>
        );
      }
    } else {
      followButton = <div></div>; // empty (basically show nothing)
    }

    return (
      <div className="d-flex align-items-center">
        <img
          className="mr-3"
          style={{ maxWidth: "40px" }}
          src={this.props.user.Picture}
          alt="Profile"
        />
        <h5>{this.props.user.Nickname}</h5>

        <div className="ml-auto">{followButton}</div>
      </div>
    );
  }
}

export default App;
