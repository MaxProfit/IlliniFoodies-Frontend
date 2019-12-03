import React from "react";
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";
import "./App.css";

var topPicks = require("./data/topPicks.json");

class InfoBar extends React.Component {
  render() {
    var cards = [];

    if (this.props.page === "home page") {
      console.log(this.props.recommendList);
      // for (let index in topPicks) {
      //   // console.log(topPicks);
      //   var restaurant = topPicks[index];
      //   // console.log(restaurant);
      //   var k = "recommend-" + index;
      //   cards.push(
      //     <InfoCard
      //       key={k}
      //       imageSrc={restaurant.image_url}
      //       title={restaurant.name}
      //       titleLink={restaurant.url}
      //       text={<Rating rating={restaurant.rating}></Rating>}
      //       like={false}
      //       restaurantId={restaurant.RestaurantId}
      //       tags={restaurant.keywords}
      //       user={this.props.user}
      //     ></InfoCard>
           
      //   );
      // }
      this.props.recommendList.forEach(((restaurant, index) => {
        // console.log(restaurant.RestaurantId);
        var k = "like-" + index;
        cards.push(
          <InfoCard
            key={k}
            imageSrc={restaurant.PictureURL}
            title={restaurant.RestaurantName}
            titleLink={restaurant.WebsiteURL}
            text={<Rating rating={restaurant.AvgRating}></Rating>}
            like={false}
            restaurantId={restaurant.RestaurantId}
            tags={restaurant.Tags}
            user={this.props.user}
          ></InfoCard>
        );
      }));
      
    } else if (this.props.page === "like page") {
      // console.log(this.props.favRestaurants);
      this.props.favRestaurants.forEach(((restaurant, index) => {
        // console.log(restaurant.RestaurantId);
        var k = "like-" + index;
        cards.push(
          <InfoCard
            key={k}
            imageSrc={restaurant.PictureURL}
            title={restaurant.RestaurantName}
            titleLink={restaurant.WebsiteURL}
            text={<Rating rating={restaurant.AvgRating}></Rating>}
            like={true}
            restaurantId={restaurant.RestaurantId}
            tags={restaurant.Tags}
            user={this.props.user}
          ></InfoCard>
        );
      }));
        
    }
    

    return (
      <div className="container text-center">
        <h3 className="pt-4 mb-4 text-white">{this.props.title}</h3>
        <div className="d-flex flex-row flex-wrap align-items-center">{cards}</div>
      </div>
    );
  }
}

export default InfoBar;
