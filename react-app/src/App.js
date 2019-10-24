import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
// import bootstrap js code
import "typeface-roboto";
import "font-awesome/css/font-awesome.min.css";

var user = {
  name: "Roshini",
  loggedIn: false
};

var developers = {
  "Roshini": {
    "name": "Roshini Saravanakumar",
    "role": "Frontend, UI/UX, Data Visualization, Databases",
    "tools": "React.js, Bootstrap, Pandas, AWS, SQL, Node.js, APIs",
    "github": "https://github.com/roshinis78",
    "website": "https://roshinis78.github.io/my-website",
    "picture": "./images/bt21_white_bg.png"
  },
  "Eunice": {
    "name": "Eunice Zhou",
    "role": "fill this in",
    "tools": "fill this in",
    "github": "#",
    "website": "#",
    "picture": "./images/missing.png"
  },
  "Matthew": {
    "name": "Matthew Williams",
    "role": "fill this in",
    "tools": "fill this in",
    "github": "#",
    "website": "#",
    "picture": "./images/missing.png"
  },
  "Sam": {
    "name": "Samuel Dovgin",
    "role": "fill this in",
    "tools": "fill this in",
    "github": "#",
    "website": "#",
    "picture": "./images/missing.png"
  },
}

var topPicks = require("./data/topPicks.json");

function App() {
  return (
    <div className="App">
      <AboutPage></AboutPage>
    </div>
  );
}

class InfoCard extends React.Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.imageSrc}></img>
        <div className="card-body">
          <a href={this.props.titleLink}>
            <h5 className="card-title">{this.props.title}</h5>
          </a>
          <p className="card-text">{this.props.text}</p>
        </div>
      </div>
    );
  }
}

class InfoBar extends React.Component {
  render() {
    var cards = [];
    for (let index in topPicks) {
      var restaurant = topPicks[index];
      cards.push(
        <InfoCard
          imageSrc={restaurant.image_url}
          title={restaurant.name}
          titleLink={restaurant.url}
          text={<Rating rating={restaurant.rating}></Rating>}
        ></InfoCard>
      );
    }
    if (!this.props.user.loggedIn) {
      return (
        <div className="container">
          <div className="row">
            <h1 className="text-left m-3">{this.props.title}</h1>
            <div className="row flex-wrap justify-content-around m-1">{cards}</div>
          </div>
        </div>
      );
    }
  }
}

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top pt-3">
          <a className="navbar-brand mr-auto" href="#">
            <img className="logo mr-3" src={require("./images/logo.png")}></img>
            Illini Foodies
          </a>
          <button class='navbar-toggler' data-toggle='collapse' data-target="#nav-links">
            <span class='navbar-toggler-icon'></span>
          </button>
          <ul className="navbar-nav collapse navbar-collapse justify-content-sm-end" id="nav-links">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Developers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Log In
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary ml-2" href="#">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>

        <header className="jumbotron foodie-header m-0">
          <h1 className="header-catch">hungry?</h1>
          <form className="form-inline justify-content-center align-items-end">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Find food near"
              ></input>
              <input
                type="text"
                className="form-control"
                placeholder="tags (price, cuisine, i'm broke and hangry, etc.)"
              ></input>
            </div>
          </form>
        </header>

        <InfoBar user={user} title="Top Picks"></InfoBar>
      </div>
    );
  }
}

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <header className="jumbotron bg-dark text-white">
          <h1>Meet the Developers!</h1>
        </header>
        <div className="row flex-wrap justify-content-center">
          <DeveloperCard dev={developers["Roshini"]}></DeveloperCard>
          <DeveloperCard dev={developers["Eunice"]}></DeveloperCard>
          <DeveloperCard dev={developers["Matthew"]}></DeveloperCard>
          <DeveloperCard dev={developers["Sam"]}></DeveloperCard>
        </div>
      </div>
    );
  }
}

class DeveloperCard extends React.Component {
  render() {
    return (
      <div className="col-11 col-md-6 developer-card media">
        <img src={require("./images/missing.png")} className="img-fluid thumbnail mr-3"></img>
        <div className="media-body">
          <h3>
            {this.props.dev.name} 
            <button className="btn btn-github"><a className="fa fa-github fa-lg text-white ml-1" href={this.props.dev.github}></a></button>
            <button className="btn btn-twitter"><a className="fa fa-globe fa-lg text-white ml-1" href={this.props.dev.website}></a></button>
          </h3>
          <p>
            <i>{this.props.dev.role}</i>
            <p>{"Tools: " + this.props.dev.tools}</p>
            <p>{this.props.dev.description}</p>
          </p>
        </div>
      </div>
    );
  }
}

class Rating extends React.Component {
  render() {
    var stars = [];
    var rating = this.props.rating;
    while (rating-- > 0) {
      stars.push("⭐");
    }
    return <p>{stars}</p>;
  }
}

class PlaceMap extends React.Component {
  render() {
    return (
      <iframe
        width="600"
        height="450"
        frameborder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJv8lkCT_XDIgR7SK4MGhE3pQ&key=AIzaSyD13ilSA6TDU12vCSzzS3a1JY_PEpsgfqE"
        allowfullscreen
      ></iframe>
    );
  }
}

class PositionMap extends React.Component {
  render() {
    return (
      <iframe
        width="600"
        height="450"
        frameborder="0"
        style={{ border: 0 }}
        src={
          "https://www.google.com/maps/embed/v1/view?zoom=8&center=" +
          this.props.latitude +
          "%2C" +
          this.props.longitude +
          "&key=AIzaSyD13ilSA6TDU12vCSzzS3a1JY_PEpsgfqE"
        }
        allowfullscreen
      ></iframe>
    );
  }
}

export default App;
