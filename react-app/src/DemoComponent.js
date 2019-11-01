import React from 'react';

export const DemoForm = class DemoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        restaurant: null,
        rating: null,
        comment: null,
        date: null,
        user: null
      };
  
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleRestaurantChange = this.handleRestaurantChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
    }
  
    handleSubmit() {
      console.log(this.state)
    }
  
    handleRestaurantChange(event) {
      this.setState({ restaurant: event.target.value , date: new Date()});
    }
    handleRatingChange(event) {
      this.setState({ rating: event.target.value ,date: new Date()});
    }
  
    handleCommentChange(event) {
      this.setState({ comment: event.target.value ,date: new Date()});
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
                onClick={this.handleSubmit}
              ></DemoButton>
            </form>
  
            <form className="form-group col-offset-2 col-5">
              <input className="form-control" placeholder="Restaurant"></input>
              <DemoButton color="btn-outline-success" id="search"></DemoButton>
            </form>
          </div>
  
          <table className="table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
  
            <tbody id="demo-table-body"></tbody>
          </table>
        </div>
      );
    }
}
  
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
}
  