import React from "react";
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";
import "./App.css";

class InfoBar extends React.Component {
  render() {
    var cards = [];

    if (this.props.page === "home page") {
      
      this.props.recommendList.forEach(((restaurant, index) => {
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
            unique={k}
            refreshFavorites={this.props.refreshFavorites}
            refreshRatings={this.props.refreshRatings}
          ></InfoCard>
        );
      }));
      
    } else if (this.props.page === "like page") {
      this.props.favRestaurants.forEach(((restaurant, index) => {
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
            unique={k}
            refreshFavorites={this.props.refreshFavorites}
            refreshRatings={this.props.refreshRatings}
          ></InfoCard>
        );
      }));
        
    }
    

    return (
      <div className="container text-center">
        {/* <h3 className="pt-4 mb-4 text-white">{this.props.title}</h3> */}
        <div className="d-flex flex-row flex-wrap align-items-center">{cards}</div>
      </div>
    );
  }
}

export default InfoBar;
