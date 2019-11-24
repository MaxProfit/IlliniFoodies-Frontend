import React from "react";
import InfoBar from "./InfoBar";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <header className="custom-jumbotron foodie-header m-0">
          <h1 className="header-catch">hungry?</h1>
          <form className="form-inline w-100 justify-content-center align-items-end">
            <div className="input-group w-75">
              <input
                type="text"
                className="form-control"
                placeholder="Find food near"
              ></input>
              <input
                type="text"
                className="form-control"
                placeholder="tags (price, cuisine, i'm broke and hangry, etc.)"
              ></input>
            </div>
          </form>
        </header>

        <InfoBar title="TOP PICKS NEAR YOU"></InfoBar>
      </div>
    );
  }
}

export default HomePage;
