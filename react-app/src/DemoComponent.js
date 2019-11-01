import React from "react";
import { element } from "prop-types";

var counter = 0;
const axios = require('axios').default;

export const DemoForm = class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      rating: null,
      comment: null,
      date: null,
      user: null,
      rows: []
    };

    this.insertRow = this.insertRow.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);

    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleRestaurantChange(event) {
    this.setState({ restaurant: event.target.value, date: new Date() });
  }
  handleRatingChange(event) {
    this.setState({ rating: event.target.value, date: new Date() });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value, date: new Date() });
  }

  componentDidMount() {
    var self = this;
    axios.get('https://api.illinifoodies.xyz/ratings', {

    })
    .then(function (response) {
      console.log(response);
      var newRows = [];
      response.data.forEach(element => {
        var date = ""
        if (element.DayPosted) {
          date = element.DayPosted
        }

        newRows.push({
          restaurant: element.RestaurantName,
          rating: element.Rating,
          comment: element.CommentBody,
          date: date
        })
      });

      self.setState({
        rows: newRows
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  insertRow() {
    var row = Object.assign({}, this.state);
    delete row["rows"];
    row["id"] = counter++;
    this.setState({ rows: this.state.rows.concat(row) });

    // TODO: AXIOS REQUEST GOES HERE
    // The json object you have to pass to it is the var 'row'
    axios.post('https://api.illinifoodies.xyz/ratings', {
      CommentBody: this.state.comment, 
      RestaurantName: this.state.restaurant,
      Rating: this.state.rating,
      DayPosted: this.state.date
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateRow() {
    // update row
    console.log("Update row");

    // right now i don't have the updating row stuff set up but you can just update the entry with the dummy row id for testing
    var dummyID = 0;
    // TODO: AXIOS REQUEST GOES HERE
  }

  deleteRow() {
    // delete row
    console.log("Delete row");

    // right now i don't have the deleting row stuff set up but you can just delete the entry with the dummy row id for testing
    var dummyID = 0;
    // TODO: AXIOS REQUEST GOES HERE
  }

  render() {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
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
              onClick={this.insertRow}
            ></DemoButton>
          </form>

          <form className="form-group col-offset-2 col-5">
            <input className="form-control" placeholder="Restaurant"></input>
            <DemoButton color="btn-outline-success" id="search"></DemoButton>
          </form>
        </div>

        <table className="table table-striped">
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
            {this.state.rows.map((row) => 
              (
                <tr>
                  <td>{row.restaurant}</td>
                  <td>{row.rating}</td>
                  <td>{row.comment}</td>
                  <td>{row.date.toString()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-dark btn-social-icon mr-1"
                      onClick={this.updateRow}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-social-icon"
                      onClick={this.deleteRow}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            )}
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
