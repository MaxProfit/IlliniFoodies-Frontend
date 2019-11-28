import React from "react";
import InfoBar from "./InfoBar";
import './HomePage.scss';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faUsers, faSearch } from '@fortawesome/free-solid-svg-icons'

class HomePage extends React.Component {

  
  render() {
    return (
      <div>
        <header className="intro-header">
          <div className="overlay"></div>
          <div className="welcome-message">
            <Typist className="typing-text">
              <Typist.Delay ms={400} />
              <span>Welcome, Eunice</span>
              <Typist.Delay ms={600} />
              <br></br>
              <span>what's up</span>
              <Typist.Backspace count={9} delay={1000} />
  
            </Typist>

          </div>

          <div className="icon-menu">
            <div className="icon-item home-icon active">
              <FontAwesomeIcon icon={faHome} id="home-icon" />
            </div>
            <div className="icon-item like-icon">
              <FontAwesomeIcon icon={faHeart} id="heart-icon" />
            </div>
            <div className="icon-item follow-icon">
              <FontAwesomeIcon icon={faUsers} id="follow-icon" />
            </div>
            <div className="icon-item search-icon">
              <FontAwesomeIcon icon={faSearch} id="search-icon" />
            </div>
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
