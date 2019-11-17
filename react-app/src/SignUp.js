import React from "react";
import Slider from "@material-ui/core/Slider";

const axios = require("axios").default;
const fs = require("fs");
const jwt = require("jsonwebtoken");


// generic axios request
function axiosRequest(request) {
  console.log(request);
  axios[request.type](request.url, request.data)
    .then(function(response) {
      console.log(response);
      if (response.status === 200) {
        request.onSuccess(response);
      }
    })
    .catch(error => console.log(error));
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.defaultPriceRange = [10, 20];

    this.state = {
      userid: null,
      nickname: null,
      priceMin: this.defaultPriceRange[0],
      priceMax: this.defaultPriceRange[1],
      picture: null,
      formState: 0
    };

    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.submitUserSetup = this.submitUserSetup.bind(this);
    this.nextForm = this.nextForm.bind(this);
    this.prevForm = this.prevForm.bind(this);

    // load user
    var hashObject = {};
    if (window.location.hash.length > 0) {
      for (let info of window.location.hash.split("&")) {
        let key_val = info.split("=");
        hashObject[key_val[0]] = key_val[1].substring(0);
      }
      console.log(hashObject);
    }

    function setCookie(cname, cvalue, exseconds) {
      var d = new Date();
      d.setTime(d.getTime() + (exseconds*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    // decode the token, grab the userid and save it in a cookie! nom 
    var token = hashObject["#id_token"];
    this.state.userid =  jwt.decode(token, {complete: true}).payload["cognito:username"];
    console.log(jwt.decode(token, {complete: true}))
    setCookie("userid", this.state.userid, hashObject["expires_in"]);
  }

  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handlePriceRangeChange(event, newPriceRange) {
    this.setState({ priceMin: newPriceRange[0], priceMax: newPriceRange[1] });
  }

  handlePictureChange(event) {
    this.setState({ picture: event.target.value });
  }

  submitUserSetup() {
    var data = {
      nickname: this.state.nickname,
      priceMin: this.state.priceMin,
      priceMax: this.state.priceMax,
      picture: this.state.picture
    };

    axiosRequest({
      type: "put",
      url: "https://api.illinifoodies.xyz/" + this.state.userid,
      data: data,
      onSuccess: function(response) {
        console.log(response);
      }
    });

    this.nextForm();
  }

  nextForm() {
    this.setState({ formState: this.state.formState + 1 });
  }

  prevForm() {
    this.setState({ formState: this.state.formState - 1 });
  }

  render() {
    if (this.state.formState === 0) {
      var form = (
        <form className="rounded">
          <h1>What should we call you?</h1>
          <p>
            <i>
              Your friends will see this name when you interact on our social
              pages
            </i>
          </p>
          <input
            className="form-control mt-5 pt-2 w-100"
            onChange={this.handleNicknameChange}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.nextForm();
              }
            }}
          ></input>
        </form>
      );
    } else if (this.state.formState === 1) {
      form = (
        <form className="rounded d-flex flex-column align-items-center">
          <h1>Upload a profile picture?</h1>
          <input
            className="form-control mt-5 pt-2 w-100"
            onChange={this.handlePictureChange}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.nextForm();
              }
            }}
            placeholder="Enter direct url to the image (.jpg, .png, etc)"
          />
        </form>
      );
    } else if (this.state.formState === 2) {
      const marks = [5, 10, 15, 20, 25, 30].map(tick => ({
        value: tick,
        label: "$" + tick.toString()
      }));
      form = (
        <form className="rounded d-flex flex-column align-items-center">
          <h1>How much are you willing to spend on food?</h1>
          <p>
            <i>Read: rate yourself on a scale from broke to not broke</i>
          </p>
          <Slider
            className="mt-5"
            onChange={this.handlePriceRangeChange}
            defaultValue={this.defaultPriceRange}
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
            step={5}
            marks={marks}
            min={5}
            max={30}
          />
          <button
            className="btn btn-dark mt-4 w-25"
            type="button"
            onClick={this.submitUserSetup}
          >
            Done
          </button>
        </form>
      );
    } else if (this.state.formState === 3) {
      form = (
        <div>
          <h1>Okay, you're all set up {this.state.nickname}!</h1>
        </div>
      );
    }

    return (
      <div
        className="bg-dark"
        style={{ height: "900px" }}
        onLoad={this.loadUser}
      >
        <div className="container mt-5 pt-5">
          <div
            className="d-flex justify-content-center align-items-center text-white rounded"
            style={{
              backgroundImage: "linear-gradient(to top left, #00b4db, #0083b0)",
              height: "600px"
            }}
          >
            {form}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
