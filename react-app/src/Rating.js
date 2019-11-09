import React from "react";

class Rating extends React.Component {
  render() {
    var checked = []
    for(let i = 0; i < 5; i++) {
      if(i < Math.floor(this.props.rating)){
        checked.push(<span key={i} className="fa fa-star text-warning"></span>);
      }
      else if(i === this.props.rating - 0.5){
        checked.push(<span key={i} className="fa fa-star-half-o text-warning"></span>);
      }
    }

    return (
      <div>
        {checked}
      </div>
    );
  }
}

export default Rating;
