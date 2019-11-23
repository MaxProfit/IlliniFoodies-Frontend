// NEW USER SIGN UP PAGE
import React from "react";
import Slider from "@material-ui/core/Slider";
import { axiosRequest, setCookie } from "./Util";

const jwt = require("jsonwebtoken");
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    // default price range for sign up price selector
    this.defaultPriceRange = [10, 20];

    this.state = {
      userid: null,
      nickname: null,
      priceMin: this.defaultPriceRange[0],
      priceMax: this.defaultPriceRange[1],
      picture: null,
      currentForm: 0 // index of current slide in form
    };

    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.submitUserSetup = this.submitUserSetup.bind(this);
    this.nextForm = this.nextForm.bind(this);
    this.prevForm = this.prevForm.bind(this);

    // parse the hash into an object
    let hashObject = {};
    if (window.location.hash.length > 0) {
      let hash = window.location.href.substring(
        window.location.href.indexOf("#") + 1
      );
      for (let info of hash.split("&")) {
        let key_val = info.split("=");
        hashObject[key_val[0]] = key_val[1];
      }
    }

    // decode the json web token
    let decodedToken = jwt.decode(hashObject["id_token"], { complete: true });

    // if the user already exists in our database, redirect to the home page
    axiosRequest({
      type: "get",
      url:
        "https://api.illinifoodies.xyz/user/" +
        decodedToken.payload["cognito:username"],
      data: {},
      onSuccess: response => {
        if (response.data.Item !== undefined) {
          window.location.href = "/home";
        }
      }
    });

    // save the user's aws cognito username in the component state
    this.state.userid = decodedToken.payload["cognito:username"];

    // also save it to a cookie! nom
    setCookie("userid", this.state.userid, hashObject["expires_in"]);
  }

  // form input onChange handlers
  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handlePriceRangeChange(event, newPriceRange) {
    this.setState({ priceMin: newPriceRange[0], priceMax: newPriceRange[1] });
  }

  handlePictureChange(event) {
    this.setState({ picture: event.target.value });
  }

  // put the new user's data to the database
  submitUserSetup() {
    var data = {
      nickname: this.state.nickname,
      priceMin: this.state.priceMin,
      priceMax: this.state.priceMax,
      picture: this.state.picture
    };
    axiosRequest({
      type: "put",
      url: "https://api.illinifoodies.xyz/user/" + this.state.userid,
      data: data,
      onSuccess: response => this.props.signIn(data)
    });

    this.nextForm();
  }

  // move to the next form in the form slideshow
  nextForm() {
    this.setState({ currentForm: this.state.currentForm + 1 });
  }

  // move to the previous form in the form slideshow
  prevForm() {
    this.setState({ currentForm: this.state.currentForm - 1 });
  }

  render() {
    // render the current form slide
    if (this.state.currentForm === 0) {
      var form = (
        <CustomForm
          question="What should we call you?"
          tip="Your friends will see this name when you interact on our social pages"
          inputOnChange={this.handleNicknameChange}
        ></CustomForm>
      );
    } else if (this.state.currentForm === 1) {
      form = (
        <CustomForm
          question="Upload a profile picture?"
          tip="Enter direct url to the image (.jpg, .png, etc.)"
          inputOnChange={this.handlePictureChange}
          inputPlaceholder="Enter direct url to the image (.jpg, .png, etc)"
        ></CustomForm>
      );
    } else if (this.state.currentForm === 2) {
      const marks = [5, 10, 15, 20, 25, 30].map(tick => ({
        value: tick,
        label: "$" + tick.toString()
      }));
      form = <CustomForm question="How much are you willing to spend on food?"
        tip="Read: Rate yourself on a scale from broke to not broke"
        customInput={
          <div>
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
          </div>
        }></CustomForm>
    } else if (this.state.currentForm === 3) {
      form=<CustomForm question={"Okay, you're all set up " + this.state.nickname}
      tip="We're redirecting you to our home page..."></CustomForm>
    }

    return (
      <div className="bg-dark" style={{ height: "900px" }}>
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

class CustomForm extends React.Component {
  render() {
    if (this.props.inputOnChange != undefined) {
      var interactiveInput = (
        <input
          className="form-control mt-5 pt-2 w-100"
          onChange={this.props.inputOnChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.nextForm();
            }
          }}
          placeholder={this.props.inputPlaceholder}
        />
      );
    } else {
      interactiveInput = this.props.customInput;
    }

    return (
      <form className="rounded d-flex flex-column align-items-center">
        <h1>{this.props.question}</h1>
        <p>
          <i>{this.props.tip}</i>
        </p>
        {interactiveInput}
      </form>
    );
  }
}

export default SignUp;
