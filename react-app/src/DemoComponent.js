import React from "react";
import { element } from "prop-types";
import { strict } from "assert";
import "./App.css";

var counter = 0;
const axios = require("axios").default;

export const DemoForm = class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      rating: null,
      comment: null,
      search: null,
      rows: []
    };

    this.insertReview = this.insertReview.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.searchReviews = this.searchReviews.bind(this);

    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    // load table from db
    this.updateTable();
  }

  // handle input changes
  handleRestaurantChange(event) {
    this.setState({ restaurant: event.target.value });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  // get data from db and save db rows into component state, triggering table update in ui
  updateTable() {
    var self = this;
    axios
      .get("https://api.illinifoodies.xyz/ratings", {})
      .then(function(response) {
        console.log(response);
        var newRows = [];
        response.data.forEach(element => {
          newRows.push({
            id: element.Commentid,
            restaurant: element.RestaurantName,
            rating: element.Rating,
            comment: element.CommentBody,
            date: element.DayPosted
          });
        });

        self.setState({
          rows: newRows
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // db + ui update fxns
  insertReview() {
    axios
      .post("https://api.illinifoodies.xyz/ratings", {
        CommentBody: this.state.comment,
        RestaurantName: this.state.restaurant,
        Rating: this.state.rating,
        DayPosted: new Date().toDateString()
      })
      .then(response => {
        console.log(response);
        this.updateTable();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateReview(id) {
    // TODO: AXIOS REQUEST GOES HERE

    // HI GUYS OKIE WAIT
    // so in insert review, i put this.updateTable when the promise is fulfilled, so when you guys
    // write the axios request, move the "this.updateTable();" line to the then handler of the the promise
    // thanks :DD -roshini
    this.updateTable();
  }

  deleteReview(id) {
    // TODO: AXIOS REQUEST GOES HERE

    // HI GUYS OKIE WAIT
    // so in insert review, i put this.updateTable when the promise is fulfilled, so when you guys
    // write the axios request, move the "this.updateTable();" line to the then handler of the the promise
    // thanks :DD -roshini
    this.updateTable();
  }

  searchReviews() {
    // TODO: AXIOS REQUEST GOES HERE
    console.log(this.state.search);

    // HI GUYS OKIE WAIT
    // so in insert review, i put this.updateTable when the promise is fulfilled, so when you guys
    // write the axios request, move the "this.updateTable();" line to the then handler of the the promise
    // thanks :DD -roshini
    this.updateTable();
  }

  render() {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          {/* insert review form */}
          <form className="form-group mr-0 col-5">
            <input
              className="form-control"
              placeholder="Restaurant"
              onChange={this.handleRestaurantChange}
            ></input>
            <input
              className="form-control"
              placeholder="Rating"
              onChange={this.handleRatingChange}
            ></input>
            <input
              className="form-control"
              placeholder="Comment"
              onChange={this.handleCommentChange}
            ></input>
            <DemoButton
              color="btn-outline-warning"
              id="insert"
              onClick={this.insertReview}
            ></DemoButton>
          </form>

          {/* search reviews form */}
          <form className="form-group col-offset-2 col-5">
            <input
              className="form-control"
              placeholder="Restaurant"
              onChange={this.handleSearchChange}
            ></input>
            <DemoButton
              color="btn-outline-success"
              id="search"
              onClick={this.searchReviews}
            ></DemoButton>
          </form>
        </div>

        {/* db ui representation as table */} 
        <table className="table table-scroll table-hover">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.rows.map(row => (
              <tr key={row.id}>
                <td>{row.restaurant}</td>
                <td>{row.rating}</td>
                <td>{row.comment}</td>
                <td>{row.date}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-dark btn-social-icon mr-1"
                    onClick={this.updateReview.bind(this, row.id)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-social-icon"
                    onClick={this.deleteReview.bind(this, row.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export const DemoButton = class DemoButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={"btn form-control " + this.props.color}
        id={this.props.id + "-button"}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.id.charAt(0).toUpperCase() + this.props.id.slice(1)}
      </button>
    );
  }
};
