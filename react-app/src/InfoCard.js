import React from "react";
import "./styles/InfoCard.css";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { axiosRequest } from "./Util";
import TextField from "@material-ui/core/TextField";
import { Fade } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import Rating from "@material-ui/lab/Rating";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export const InfoCard = class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.likeRestaurant = this.likeRestaurant.bind(this);
    this.unlikeRestaurant = this.unlikeRestaurant.bind(this);
    this.state = {
      like: this.props.like,
      review: false,
      rating: 0,
      comment: "",
      openAdd: false,
      openRemove: false,
      openLogin: false,
      openReview: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.handleClose4 = this.handleClose4.bind(this);
  }

  handleClose() {
    this.setState({
      openAdd: false
    });
  }

  handleClose2() {
    this.setState({
      openRemove: false
    });
  }

  handleClose3() {
    this.setState({
      openLogin: false
    });
  }

  handleClose4() {
    this.setState({
      openReview: false
    });
  }

  submitReview() {
    if (this.props.user !== null) {
      var moment = require("moment-timezone");
      moment().format();

      var d = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      var m = moment.utc(d);
      m.tz("America/Chicago");
      var s = m.format("YYYY-MM-DD HH:mm:ss");

      axiosRequest({
        type: "post",
        url: "https://api.illinifoodies.xyz/ratings",
        data: {
          RestaurantId: this.props.restaurantId,
          UserId: this.props.user.Id,
          Comment: this.state.comment,
          DatePosted: s,
          Rating: this.state.rating
        },
        onSuccess: response => {
          if (response.status === 200) {
            this.setState({
              review: false,
              openReview: true
            });
            this.props.refreshRatings(this.props.user.Id);
          }
        }
      });
    } else {
      this.setState({
        openLogin: true
      });
    }
  }

  likeRestaurant(restaurantId) {
    if (this.props.user) {
      axiosRequest({
        type: "put",
        url:
          "https://api.illinifoodies.xyz/user/" +
          this.props.user.Id +
          "/favorites/" +
          this.props.restaurantId,
        data: {},
        onSuccess: response => {
          if (response.status === 200) {
            this.setState({
              like: true,
              openAdd: true
            });
            this.props.refreshFavorites(this.props.user.Id);
          }
        }
      });
    } else {
      this.setState({
        openLogin: true
      });
    }
  }

  unlikeRestaurant(restaurantId) {
    if (this.props.user) {
      axiosRequest({
        type: "delete",
        url:
          "https://api.illinifoodies.xyz/user/" +
          this.props.user.Id +
          "/favorites/" +
          this.props.restaurantId,
        data: {},
        onSuccess: response => {
          if (response.status === 200) {
            this.setState({
              like: false,
              openRemove: true
            });
            this.props.refreshFavorites(this.props.user.Id);
          }
        }
      });
    }
  }

  toggleReview(restaurantId) {
    var newReview = !this.state.review;
    this.setState({
      review: newReview
    });
  }

  render() {
    return (
      <div className="restaurant-card shadow">
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openAdd}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Added to favorites!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openRemove}
          autoHideDuration={6000}
          onClose={this.handleClose2}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Removed from favorites!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose2}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openLogin}
          autoHideDuration={6000}
          onClose={this.handleClose3}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Please log in first!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose3}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openReview}
          autoHideDuration={6000}
          onClose={this.handleClose4}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Review submitted!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose4}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <img src={this.props.imageSrc} alt="Restaurant"></img>
        <Fade in={this.state.review}>
          <div className="review-wrapper d-flex justify-content-center align-items-center">
            <div className="write-review">
              <div className="d-flex justify-content-between mt-3">
                <Rating
                  name={"simple-controlled" + this.props.unique}
                  value={this.state.rating}
                  className="ml-4"
                  onChange={(event, newValue) => {
                    this.setState({
                      rating: newValue
                    });
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
                onChange={event => {
                  this.setState({
                    comment: event.target.value
                  });
                }}
              />

              <div>
                <div className="d-flex justify-content-end">
                  <div
                    onClick={this.toggleReview.bind(
                      this,
                      this.props.restaurantId
                    )}
                  >
                    <IconButton aria-label="delete" className="delete-btn">
                      <DeleteIcon />
                    </IconButton>
                  </div>

                  <div onClick={this.submitReview.bind(this)}>
                    <IconButton aria-label="done" className="done-btn">
                      <DoneIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        <div className="card-body text-center">
          <a href={this.props.titleLink} target="_blank" rel="noopener noreferrer" className="card-link">
            <h5 className="card-title text-dark">{this.props.title}</h5>
          </a>
          <div className="card-text">{this.props.text}</div>
        </div>
        <div className="mt-auto d-flex justify-content-center">
          {this.props.tags.split(",").map(function(tag) {
            return (
              <span className="badge badge-light mr-1" key={tag}>
                {tag}
              </span>
            );
          })}
        </div>

        <div>
          {this.state.like === true && (
            <div
              onClick={this.unlikeRestaurant.bind(
                this,
                this.props.restaurantId
              )}
            >
              <IconButton
                aria-label="add to favorites"
                className="align-self-end float-right heart-btn"
                color="secondary"
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          )}
          {this.state.like === false && (
            <div
              onClick={this.likeRestaurant.bind(this, this.props.restaurantId)}
            >
              <IconButton
                aria-label="add to favorites"
                className="align-self-end float-right heart-btn"
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          )}

          {this.state.review === true && (
            <div
              onClick={this.toggleReview.bind(this, this.props.restaurantId)}
            >
              <IconButton
                aria-label="add to favorites"
                className="align-self-end float-right edit-btn"
                color="primary"
              >
                <RateReviewIcon />
              </IconButton>
            </div>
          )}

          {this.state.review === false && (
            <div
              onClick={this.toggleReview.bind(this, this.props.restaurantId)}
            >
              <IconButton
                aria-label="add to favorites"
                className="align-self-end float-right edit-btn"
              >
                <RateReviewIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  }
};
