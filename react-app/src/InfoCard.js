import React from 'react';
import "./InfoCard.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { axiosRequest } from "./Util";
import TextField from '@material-ui/core/TextField';
import { Fade } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Rating from '@material-ui/lab/Rating';

export const InfoCard = class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.likeRestaurant = this.likeRestaurant.bind(this);
    this.unlikeRestaurant = this.unlikeRestaurant.bind(this);
    this.state = {
      like: this.props.like,
      review: false,
      rating: 0,
      comment: ""
    }
  }

  submitReview() {
    console.log(this.props.user);
    if (this.props.user !== null) {
      console.log("userid", this.props.user.Id);
      // console.log("restaurant id", this.props.restaurantId);
      // console.log("rating", this.state.rating);

      var moment = require('moment-timezone');
      moment().format();
      
      
      var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      var m = moment.utc(d);
      m.tz('America/Chicago');
      var s = m.format("YYYY-MM-DD HH:mm:ss");

      // console.log("date time", s);
      // console.log("comment", this.state.comment);

      axiosRequest({
        type: "post",
        url: "https://api.illinifoodies.xyz/ratings",
        data: {
          "RestaurantId": this.props.restaurantId,
          "UserId": this.props.user.Id,
          "Comment": this.state.comment,
          "DatePosted": s,
          "Rating" : this.state.rating
        },
        onSuccess: response => {
          if (response.status === 200) {
            // console.log(response.data);
            this.setState({ review: false });
          }
        }
      });
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

  toggleReview(restaurantId) {
    var newReview = !this.state.review;
    this.setState({
      review: newReview
    })
  }

  render() {
      
      return (
        <div className="restaurant-card shadow">
          <img src={this.props.imageSrc}></img>
          <Fade in={this.state.review}>
            <div className="review-wrapper d-flex justify-content-center align-items-center">
              <div className="write-review">
                <div className="d-flex justify-content-between mt-3">
                  <Rating
                    name={"simple-controlled"+this.props.unique}
                    value={this.state.rating}
                    className="ml-4"
                    onChange={(event, newValue) => {
                      this.setState({
                        rating: newValue
                      })
                    }}
                  />
                  <div className="mr-4">{this.state.rating} / 5</div>
                </div>
                
                  
                <TextField
                  id="outlined-multiline-static"
                  label="Write a review"
                  multiline
                  rows="4"
                  className="review-input"
                  margin="normal"
                  variant="outlined"
                  onChange={(event) => {
                    // console.log(event.target.value);
                    this.setState({
                      comment: event.target.value
                    })
                  }}
                />


                <div>
                  <div className="d-flex justify-content-end">
                    <div onClick={ this.toggleReview.bind(this, this.props.restaurantId) }>
                      <IconButton aria-label="delete" className="delete-btn">
                        <DeleteIcon />
                      </IconButton>

                    </div>
                    
                    <div onClick={ this.submitReview.bind(this) }>
                    
                      <IconButton aria-label="done" className="done-btn">
                        <DoneIcon />
                      </IconButton>
                    
                    </div>                    
                    

                  </div>
                </div>
                
              </div>
              
            </div>
              
          </Fade>
          
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

          <div>
            
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

          { this.state.review === true && 
            <div onClick={ this.toggleReview.bind(this, this.props.restaurantId) }>
              <IconButton aria-label="add to favorites" className="align-self-end float-right edit-btn" color="primary">
                <RateReviewIcon />
              </IconButton>
            </div>
          }

          
          { this.state.review === false && 
            <div onClick={ this.toggleReview.bind(this, this.props.restaurantId) }>
              <IconButton aria-label="add to favorites" className="align-self-end float-right edit-btn">
                <RateReviewIcon />
              </IconButton>
            </div>
          }
            
          
          </div>
          
        </div>

        
      );
    }
}


  
