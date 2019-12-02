import React from 'react';
import "./InfoCard.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';


export const InfoCard = class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.likeRestaurant = this.likeRestaurant.bind(this);
  }

  likeRestaurant(event) {
    console.log(event);
  }

  render() {
      return (
        <div className="card mb-3 bg-light text-dark restaurant-card">
          <img src={this.props.imageSrc}></img>
          <div className="card-body">
            <a href={this.props.titleLink} target="_blank" className="card-link" >
              <h5 className="card-title text-dark">{this.props.title}</h5>
            </a>
            <div className="card-text">{this.props.text}</div>
          </div>
          <div onClick={ this.likeRestaurant }>
            <IconButton aria-label="add to favorites" className="float-right inline">
              <FavoriteIcon />
            </IconButton>
          </div>
          
        </div>

        
      );
    }
}


  
