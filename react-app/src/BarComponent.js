import React from "react";
import { InfoCard } from "./CardComponent";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import "./App.css";

var topPicks = require("./data/topPicks.json");

export const InfoBar = class InfoBar extends React.Component {
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
};

export const Navbar = class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top pt-3">
        <Link to="/" className="btn-link">
          <div className="d-flex flex-row">
            <img className="logo mr-3" src={require("./images/logo.png")}></img>
            <h2 className="text-dark tex">Illini Foodies</h2>
          </div>
        </Link>

        <ul
          className="navbar-nav collapse navbar-collapse justify-content-sm-end"
          id="nav-links"
        >
          <Link to="/about">
            <li className={"nav-item nav-link" + this.props.active[1]}>
              About
            </li>
          </Link>

          <Link to="/demo">
            <li className={"nav-item nav-link" + this.props.active[4]}>Demo</li>
          </Link>

          <li className={"nav-item ml-2" + this.props.active[3]}>
            <a
              className="btn btn-info"
              href="https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz"
            >
              Log In
            </a>
          </li>
        </ul>
      </nav>
    );
  }
};
