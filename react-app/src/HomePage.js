import React from "react";
import Navbar from "./Navbar";
import InfoBar from "./BarComponent";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>

        <header className="custom-jumbotron foodie-header m-0">
          <h1 className="header-catch">hungry?</h1>
          <form className="form-inline justify-content-center align-items-end">
            <div className="input-group">
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

        <InfoBar title="Top Picks"></InfoBar>
      </div>
    );
  }
}

export default HomePage;
