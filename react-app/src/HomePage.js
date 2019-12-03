import React from "react";
import InfoBar from "./InfoBar";
import './HomePage.scss';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

class FeedPae extends React.Component {
  render() {
    return (
      <div className="feed-page">
        <div className="d-flex head-wrapper">
        </div>
        
        
      </div>
    )
  }
}

class SearchPage extends React.Component {
  
  render() {
    return (
      <div className="search-page">
        <div className="search-form">

          <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          // options={top100Films.map(option => option.title)}
          renderInput={params => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        </div>
      </div>
    );
  }
}



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "search"
    }
  }

  iconChange(iconName) {
    // console.log(iconName);
    this.setState({
      active: iconName
    })
  }

  render() {
    return (
      <div>
        <header className="intro-header">
          <div className="overlay"></div>
          <div className="welcome-message">
            {/* <Typist className="typing-text">
              <Typist.Delay ms={400} />
              <span>Welcome, Eunice</span>
              <Typist.Delay ms={600} />
              <br></br>
              <span>what's up</span>
              <Typist.Backspace count={9} delay={1000} />
  
            </Typist> */}

          </div>

          <div className="icon-menu">
            <div className={"icon-item home-icon" + (this.state.active === "home" ? " active" : "")} onClick={this.iconChange.bind(this,"home")}>
              <FontAwesomeIcon icon={faHome} id="home-icon" />
            </div>
            <div className={"icon-item like-icon" + (this.state.active === "like" ? " active" : "")} onClick={this.iconChange.bind(this,"like")}>
              <FontAwesomeIcon icon={faHeart} id="heart-icon" />
            </div>
            <div className={"icon-item follow-icon" + (this.state.active === "follow" ? " active" : "")} onClick={this.iconChange.bind(this,"follow")}>
              <FontAwesomeIcon icon={faUsers} id="follow-icon" />
            </div>
            <div className={"icon-item search-icon" + (this.state.active === "search" ? " active" : "")} onClick={this.iconChange.bind(this,"search")}>
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

        <div className="content-wrapper">
          { this.state.active === "home" && 

            <div>
              
              <InfoBar title="TOP PICKS NEAR YOU" 
                       page="home page" 
                       recommendList={this.props.recommendList} 
                       user={this.props.user}></InfoBar>
            </div>
          }

          { this.state.active === "like" && 
            <div>
              <InfoBar title="Favorite Restaurants" 
                       page="like page" 
                       favRestaurants={this.props.favRestaurants} 
                       user={this.props.user} />
            </div>
          }

          { this.state.active === "follow" && 
            <div>
              <FeedPae />              
            </div>
          }

          { this.state.active === "search" && 
            <div>
              <SearchPage />
            </div>
          }
        </div>


      </div>
    );
  }
}

export default HomePage;
