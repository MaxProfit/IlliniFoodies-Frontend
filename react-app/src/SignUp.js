import React from "react";
import Slider from "@material-ui/core/Slider";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.defaultPriceRange = [10, 20];

    this.state = {
      username: null,
      nickname: null,
      minPrice: this.defaultPriceRange[0],
      maxPrice: this.defaultPriceRange[1],
      picture: null,
      formState: 0
    };

    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.submitUserSetup = this.submitUserSetup.bind(this);
    this.nextForm = this.nextForm.bind(this);
    this.prevForm = this.prevForm.bind(this);

    // load user
    var hashObject = {}
    for (let info of window.location.hash.split("&")) {
      let key_val = info.split("=")
      hashObject[key_val[0]] = key_val[1].substring(1)
    }
    console.log(hashObject)
  }

  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handlePriceRangeChange(event, newPriceRange) {
    this.setState({ minPrice: newPriceRange[0], maxPrice: newPriceRange[1] });
  }

  submitUserSetup() {
    var data = {
      nickname: this.state.nickname,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice
    };
    console.log(data);
    this.setState({ formState: 2 });
    this.props.app.setState({user: data})
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
    } else if (this.state.formState === 2) {
      form = <div>
        <h1>Okay, you're all set up {this.state.nickname}!</h1>
      </div>;
    }
    return (
      <div className="bg-dark" style={{ height: "900px" }} onLoad={this.loadUser}>
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
