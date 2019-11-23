import React from "react";
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";
import "./App.css";

var topPicks = require("./data/topPicks.json");

class InfoBar extends React.Component {
  render() {
    var cards = [];
    for (let index in topPicks) {
      console.log(topPicks);
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
      <div className="d-flex flex-column text-center align-items-center p-2 m-2">
        <h3 className="rounded w-50 mt-2 text-dark">{this.props.title}</h3>
        <div className="row flex-wrap justify-content-around m-4">{cards}</div>
      </div>
    );
  }
}

export default InfoBar;
