import React from "react";
import InfoBar from "./InfoBar";
import './HomePage.css';
import Typist from 'react-typist';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <header className="intro-header">
          <div className="overlay"></div>
          <div className="welcome-message">
            <Typist className="typing-text">
              <span>Welcome, Eunice</span>
              <Typist.Delay ms={500} />
              <br></br>
              <span>what's up</span>
            </Typist>
            
          </div>
          

          
          
          
          {/* <h1 className="intro-catch">hungry?</h1> */}
          {/* <form className="form-inline w-100 justify-content-center align-items-end">
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
          </form> */}
        </header>

        <InfoBar title="TOP PICKS NEAR YOU"></InfoBar>
      </div>
    );
  }
}

export default HomePage;
