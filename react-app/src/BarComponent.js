import React from "react";
import { InfoCard } from "./CardComponent";
import Rating from "./Rating";
import "./App.css";

var topPicks = require("./data/topPicks.json");

class InfoBar extends React.Component {
  render() {
    var cards = [];
    for (let index in topPicks) {
      var restaurant = topPicks[index];
      cards.push(
        <InfoCard
          key={index}
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

export default InfoBar;
