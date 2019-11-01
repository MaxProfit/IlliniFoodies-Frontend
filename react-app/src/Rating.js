import React from 'react';

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
  
  export default Rating;