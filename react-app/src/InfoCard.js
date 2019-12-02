import React from 'react';
import "./InfoCard.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';


export const InfoCard = class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.likeRestaurant = this.likeRestaurant.bind(this);
  }

  likeRestaurant(restaurantId) {
    console.log(restaurantId);
  }

  unlikeRestaurant(restaurantId) {
    console.log(restaurantId);
  }

  render() {
      return (
        <div className="restaurant-card shadow">
          <img src={this.props.imageSrc}></img>
          <div className="card-body">
            <a href={this.props.titleLink} target="_blank" className="card-link" >
              <h5 className="card-title text-dark">{this.props.title}</h5>
            </a>
            <div className="card-text">
              {this.props.text}
            </div>
          </div>
          <div className="mt-auto">
            {this.props.tags.split(",").map(function(tag) {
                return <span className="badge badge-light mr-1">{tag}</span>
              })}
          </div>
          { this.props.like === true && 
            <div onClick={ this.unlikeRestaurant.bind(this, this.props.restaurantId) }>
              <IconButton aria-label="add to favorites" className="align-self-end float-right heart-btn" color="red">
                <FavoriteIcon />
              </IconButton>
            </div>
            
          }
          { this.props.like === false && 
            <div onClick={ this.likeRestaurant.bind(this, this.props.restaurantId) }>
              <IconButton aria-label="add to favorites" className="align-self-end float-right heart-btn">
                <FavoriteIcon />
              </IconButton>
            </div>
            
          }
          
        </div>

        
      );
    }
}


  
