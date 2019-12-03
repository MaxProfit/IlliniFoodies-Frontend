import React from 'react';
import "./InfoCard.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { axiosRequest } from "./Util";

export const InfoCard = class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.likeRestaurant = this.likeRestaurant.bind(this);
    this.unlikeRestaurant = this.unlikeRestaurant.bind(this);
    this.state = {
      like: this.props.like
    }
  }

  likeRestaurant(restaurantId) {
    console.log(restaurantId);
    console.log(this.props.user);
    // this.setState({
    //   like: true
    // });

    if (this.props.user) {
      axiosRequest({
        type: "put",
        url: "https://api.illinifoodies.xyz/user/" + this.props.user.Id +"/favorites/" + this.props.restaurantId,
        data: {},
        onSuccess: response => {
          if (response.status === 200) {
            // console.log(response.data);
            this.setState({ like: true });
          }
        }
      });
    }
    
  }

  unlikeRestaurant(restaurantId) {
    console.log(restaurantId);

    if (this.props.user) {
      axiosRequest({
        type: "delete",
        url: "https://api.illinifoodies.xyz/user/" + this.props.user.Id +"/favorites/" + this.props.restaurantId,
        data: {},
        onSuccess: response => {
          console.log(response);
          if (response.status === 200) {
            // console.log(response.data);
            console.log(response);
            this.setState({ like: false });
          }
        }
      });
    }
    
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
          { this.state.like === true && 
            <div onClick={ this.unlikeRestaurant.bind(this, this.props.restaurantId) }>
              <IconButton aria-label="add to favorites" className="align-self-end float-right heart-btn" color="secondary">
                <FavoriteIcon />
              </IconButton>
            </div>
            
          }
          { this.state.like === false && 
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


  
