// NEW USER SIGN UP PAGE
import React from "react";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import { axiosRequest, setCookie } from "./Util";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import ReactGA from "react-ga";

const jwt = require("jsonwebtoken");

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    // default price range for sign up price selector
    this.defaultPriceRange = [10, 20];
    this.steps = ["Choose your nickname", "Add a profile image", "Preferences"];

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
        if (response.data.Item.PriceMin !== undefined) {
          this.props.signIn(decodedToken.payload["cognito:username"]);
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
    this.nextForm();
    var data = {
      Nickname: this.state.nickname,
      PriceMin: this.state.priceMin,
      PriceMax: this.state.priceMax,
      Picture: this.state.picture,
      Following: []
    };
    axiosRequest({
      type: "put",
      url: "https://api.illinifoodies.xyz/user/" + this.state.userid,
      data: data,
      onSuccess: response => {
        this.props.signIn(this.state.userid);

        ReactGA.event({
          category: 'User',
          action: 'Create an account'
        });
      }
    });
  }

  // move to the next form in the form slideshow
  nextForm() {
    if (
      (this.state.currentForm === 0 && this.state.nickname === null) ||
      (this.state.currentForm === 1 && this.state.picture === null)
    ) {
      return;
    }
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
          key={"get-nickname"}
          question="What should we call you?"
          inputOnChange={this.handleNicknameChange}
          inputOnEnter={this.nextForm}
          inputPlaceholder="Your friends will see this name when you interact on our social pages"
          buttonType="button"
          buttonText="Next"
          buttonOnClickHandler={this.nextForm}
        ></CustomForm>
      );
    } else if (this.state.currentForm === 1) {
      form = (
        <CustomForm
          key={"get-profile-picture"}
          question="Upload a profile picture?"
          inputOnChange={this.handlePictureChange}
          inputPlaceholder="Enter direct url to the image on Imgur (.jpg, .png, etc)"
          inputOnEnter={this.nextForm}
          buttonType="button"
          buttonText="Next"
          buttonOnClickHandler={this.nextForm}
        ></CustomForm>
      );
    } else if (this.state.currentForm === 2) {
      const marks = [0, 10, 20, 30, 40, 50, 60].map(tick => ({
        value: tick,
        label: "$" + tick.toString()
      }));

      form = (
        <CustomForm
          question="How much are you willing to spend on food?"
          tip="Read: Rate yourself on a scale from broke to not broke"
          customInput={
            <Slider
              className="mt-5"
              onChange={this.handlePriceRangeChange}
              defaultValue={this.defaultPriceRange}
              aria-labelledby="range-slider"
              valueLabelDisplay="auto"
              step={5}
              marks={marks}
              min={marks[0].value}
              max={marks[marks.length - 1].value}
            />
          }
          buttonType="submit"
          buttonText="Done"
          buttonOnClickHandler={this.submitUserSetup}
        ></CustomForm>
      );
    } else if (this.state.currentForm === 3) {
      form = (
        <CustomForm
          question={"Okay, you're all set up " + this.state.nickname}
          tip="We're redirecting you to our home page..."
        ></CustomForm>
      );
    }

    return (
      <div className="signup-page bg-dark">
        <div className="signup-form text-white">
          {form}
          <Stepper
            className="bg-transparent mt-3"
            activeStep={this.state.currentForm}
            alternativeLabel
          >
            {this.steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    );
  }
}

class CustomForm extends React.Component {
  render() {
    if (this.props.inputOnChange !== undefined) {
      var interactiveInput = (
        <TextField
          className="w-50 mt-4"
          inputProps={{
            style: { textAlign: "center", color: "white", fontSize: "1.5rem" }
          }}
          variant="standard"
          label={this.props.inputPlaceholder}
          onChange={this.props.inputOnChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.props.inputOnEnter();
            }
          }}
          key={this.props.key}
          autofocus
        ></TextField>
      );
    } else {
      interactiveInput = <div className="w-75">{this.props.customInput}</div>;
    }

    var button = <div></div>;
    if (this.props.buttonText !== undefined) {
      button = (
        <button
          className="btn btn-outline-light mt-5 w-50"
          type={this.props.buttonType}
          onClick={this.props.buttonOnClickHandler}
        >
          {this.props.buttonText}
        </button>
      );
    }

    return (
      <form className="d-flex flex-column align-items-center w-100">
        <h1>{this.props.question}</h1>
        <h5>
          <i>{this.props.tip}</i>
        </h5>
        {interactiveInput}
        {button}
      </form>
    );
  }
}

export default SignUp;
