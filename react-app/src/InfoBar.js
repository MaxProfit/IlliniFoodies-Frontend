import React from "react";
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";
import "./App.css";

var topPicks = require("./data/topPicks.json");

class InfoBar extends React.Component {
  render() {
    var cards = [];

    if (this.props.page === "home page") {
      for (let index in topPicks) {
        // console.log(topPicks);
        var restaurant = topPicks[index];
        // console.log(restaurant);
        cards.push(
          <InfoCard
            key={index}
            imageSrc={restaurant.image_url}
            title={restaurant.name}
            titleLink={restaurant.url}
            text={<Rating rating={restaurant.rating}></Rating>}
            like={false}
            restaurantId={restaurant.RestaurantId}
          ></InfoCard>
           
        );
      }
    } else if (this.props.page === "like page") {
      this.props.favRestaurants.forEach(((restaurant, index) => {
        // console.log(restaurant.RestaurantId);
        cards.push(
          <InfoCard
            key={index}
            imageSrc={restaurant.PictureURL}
            title={restaurant.RestaurantName}
            titleLink={restaurant.WebsiteURL}
            text={<Rating rating={restaurant.AvgRating}></Rating>}
            like={true}
            restaurantId={restaurant.RestaurantId}
          ></InfoCard>
        );
      }));
        
    }
    

    return (
      <div className="d-flex flex-column text-center align-items-center p-2 m-2">
        <h3 className="rounded w-50 mt-3 text-dark">{this.props.title}</h3>
        <div className="d-flex flex-row flex-wrap justify-content-start m-4">{cards}</div>
      </div>
    );
  }
}

export default InfoBar;
