import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "typeface-roboto";
import "font-awesome/css/font-awesome.min.css";

var developers = {
  Roshini: {
    name: "Roshini Saravanakumar",
    role: "Frontend, UI/UX, Data Visualization, Databases",
    tools: "React.js, Bootstrap, Pandas, AWS, SQL, Node.js, APIs",
    github: "https://github.com/roshinis78",
    website: "https://roshinis78.github.io/my-website",
    picture: "./images/roshini-profile.jpg"
  },
  Eunice: {
    name: "Eunice Zhou",
    role: "fill this in",
    tools: "fill this in",
    github: "#",
    website: "#",
    picture: "./images/eunice-profile.jpg"
  },
  Matthew: {
    name: "Matthew Williams",
    role: "fill this in",
    tools: "fill this in",
    github: "#",
    website: "#",
    picture: "./images/matthew-profile.jpg"
  },
  Sam: {
    name: "Samuel Dovgin",
    role: "fill this in",
    tools: "fill this in",
    github: "#",
    website: "#",
    picture: "./images/sam-profile.jpg"
  }
};

var topPicks = require("./data/topPicks.json");

function App() {
  return (
    <div className="App">
      <DemoPage></DemoPage>

      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
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

    return (
      <div className="container">
        <div className="row">
          <h1 className="text-left m-3">{this.props.title}</h1>
          <div className="row flex-wrap justify-content-around m-1">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar active={[" active", "", "", "", "", "", ""]}></Navbar>

        <header className="custom-jumbotron foodie-header m-0">
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

        <InfoBar title="Top Picks"></InfoBar>
      </div>
    );
  }
}

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar active={["", " active", "", "", "", "", ""]}></Navbar>

        <header className="custom-jumbotron bg-dark">
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

class DemoPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar active={["", "", "", "", "", " active", ""]}></Navbar>

        <DemoForm></DemoForm>
      </div>
    );
  }
}

class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      rating: null,
      comment: null,
      date: null,
      user: null
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleSubmit() {
    console.log(this.state)
  }

  handleRestaurantChange(event) {
    this.setState({ restaurant: event.target.value , date: new Date()});
  }
  handleRatingChange(event) {
    this.setState({ rating: event.target.value ,date: new Date()});
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value ,date: new Date()});
  }

  render() {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <form className="form-group mr-0 col-5">
            <input
              className="form-control"
              placeholder="Restaurant"
              onChange={this.handleRestaurantChange}
            ></input>
            <input
              className="form-control"
              placeholder="Rating"
              onChange={this.handleRatingChange}
            ></input>
            <input
              className="form-control"
              placeholder="Comment"
              onChange={this.handleCommentChange}
            ></input>
            <DemoButton
              color="btn-outline-warning"
              id="insert"
              onClick={this.handleSubmit}
            ></DemoButton>
          </form>

          <form className="form-group col-offset-2 col-5">
            <input className="form-control" placeholder="Restaurant"></input>
            <DemoButton color="btn-outline-success" id="search"></DemoButton>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>User</th>
            </tr>
          </thead>

          <tbody id="demo-table-body"></tbody>
        </table>
      </div>
    );
  }
}

class DemoButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={"btn form-control " + this.props.color}
        id={this.props.id + "-button"}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.id.charAt(0).toUpperCase() + this.props.id.slice(1)}
      </button>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top pt-3">
        <a className="navbar-brand mr-auto" href="#">
          <img className="logo mr-3" src={require("./images/logo.png")}></img>
          Illini Foodies
        </a>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#nav-links"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul
          className="navbar-nav collapse navbar-collapse justify-content-sm-end"
          id="nav-links"
        >
          <li className={"nav-item" + this.props.active[0]}>
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className={"nav-item" + this.props.active[1]}>
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className={"nav-item" + this.props.active[2]}>
            <a className="nav-link" href="#">
              Developers
            </a>
          </li>
          <li className={"nav-item" + this.props.active[3]}>
            <a className="nav-link" href="#">
              Log In
            </a>
          </li>
          <li className={"nav-item" + this.props.active[4]}>
            <a className="nav-link" href="#">
              Demo
            </a>
          </li>
          <li className={"nav-item" + this.props.active[5]}>
            <button className="btn btn-facebook ml-2" href="#">
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

class DeveloperCard extends React.Component {
  render() {
    return (
      <div className="col-11 col-md-6 developer-card media">
        <img
          src={require("" + this.props.dev.picture)}
          className="img-fluid thumbnail mr-3"
        ></img>
        <div className="media-body">
          <h3>
            {this.props.dev.name}
            <a
              className="btn btn-github btn-social-icon m-1"
              href={this.props.dev.github}
            >
              <span className="fa fa-github fa-lg fa-inverse"></span>
            </a>
            <a
              className="btn btn-twitter btn-social-icon m-1"
              href={this.props.dev.website}
            >
              <span className="fa fa-globe fa-lg fa-inverse"></span>
            </a>
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

export default App;
