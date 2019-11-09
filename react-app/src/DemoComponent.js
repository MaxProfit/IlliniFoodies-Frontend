import React from "react";
import "./App.css";

const axios = require("axios").default;

// generic axios request
function axiosRequest(request) {
  console.log(request)
  axios[request.type](request.url, request.data)
    .then(function(response) {
      console.log(response);
      if (response.status === 200){
        request.onSuccess(response);
      }
    })
    .catch(error => console.log(error));
}

class DemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      rating: null,
      comment: null,
      search: null,
      commentUpdate: null,
      rows: []
    };

    this.insertReview = this.insertReview.bind(this);
    this.searchReviews = this.searchReviews.bind(this);

    this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
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

  handleCommentUpdate(event) {
    this.setState({ commentUpdate: event.target.value });
  }

  // get data from db and save db rows into component state, triggering table update in ui
  updateTable(url="https://api.illinifoodies.xyz/ratings") {
    axiosRequest({
      type: "get",
      url: url,
      data: {},
      onSuccess: function(response) {
        console.log(response);
        var newRows = [];
        response.data.body.forEach(element => {
          newRows.push({
            id: element.Commentid,
            restaurant: element.RestaurantName,
            rating: element.Rating,
            comment: element.CommentBody,
            date: element.DayPosted
          });
        });

        this.setState({
          rows: newRows
        });
      }.bind(this)
    });
  }

  // db + ui update fxns
  insertReview() {
    axiosRequest({
      type: "post",
      url: "https://api.illinifoodies.xyz/ratings",
      data: {
        CommentBody: this.state.comment,
        RestaurantName: this.state.restaurant,
        Rating: this.state.rating,
        DayPosted: new Date().toString()
      },
      onSuccess: this.updateTable.bind(this,  "https://api.illinifoodies.xyz/ratings")
    });
  }

  updateReview(id) {
    axiosRequest({
      type: "put",
      url: "https://api.illinifoodies.xyz/ratings",
      data: { Commentid: id },
      onSuccess: this.updateTable.bind(this, "https://api.illinifoodies.xyz/ratings")
    });
  }

  deleteReview(id) {
    axiosRequest({
      type: "delete",
      url: "https://api.illinifoodies.xyz/ratings/" + id,
      data: {},
      onSuccess: this.updateTable.bind(this, "https://api.illinifoodies.xyz/ratings")
    });
  }

  searchReviews() {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/ratings/search/" + this.state.search,
      data: {},
      onSuccess: this.updateTable.bind(
        this,
        "https://api.illinifoodies.xyz/ratings/search/" + this.state.search
      )
    });
  }

  render() {
    console.log(this.state.rows);
    if (this.state.rows.length === 0) {
      var tableRows = (
        <tr>
          <td>No data available! ヽ(　￣д￣)ノ</td>
        </tr>
      );
    } else {
      tableRows = this.state.rows.map(row => (
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
      ));
    }
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center mb-3">
          <h1>Illini Foodies SQL Demo</h1>
        </div>
        <div className="row justify-content-center">
          {/* insert review form */}
          <form className="form-group mr-0 col-4">
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
              text="Insert Review"
            ></DemoButton>
          </form>

          {/* search reviews form */}
          <form className="form-group col-4">
            <input
              className="form-control"
              placeholder="Restaurant"
              onChange={this.handleSearchChange}
            ></input>
            <DemoButton
              color="btn-outline-success"
              id="search"
              onClick={this.searchReviews}
              text="Search Reviews"
            ></DemoButton>
          </form>

          <form className="form-group col-4">
            <input
              className="form-control"
              placeholder="Restaurant"
              onChange={this.handleCommentUpdate}
            ></input>
            <DemoButton
              color="btn-outline-info"
              id="search"
              onClick={this.updateComment}
              text="Update Comment"
            ></DemoButton>
          </form>
        </div>

        <hr />
        {/* db ui representation as table */}
        <table className="table table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
};

class DemoButton extends React.Component {
  render() {
    return (
      <button
        className={"btn w-100 " + this.props.color}
        id={this.props.id + "-button"}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
};

export default DemoForm;
