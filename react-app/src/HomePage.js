import React from "react";
import InfoBar from "./InfoBar";
import './HomePage.scss';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { axiosRequest } from "./Util";

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
  constructor(props) {
    super(props);
    this.state = {
      minPrice: 10,
      maxPrice: 50,
      minRating: 3,
      restaurantName: [],
      tagsList: []
    }

    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/restaurants/names",
      data: {},
      onSuccess: response => {
        if (response.status === 200) {
          // console.log(response.data.body);
          this.setState({ restaurantName: response.data.body });
        }
      }
    });

    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/restaurants/tags",
      data: {},
      onSuccess: response => {
        if (response.status === 200) {
          // console.log(response.data.body);
          this.setState({ tagsList: response.data.body });
        }
      }
    });
  }
  

  render() {
    return (
      <div className="search-page">
        <div className="search-form">
          
          <div className="container">
            <div className="row">
              <div className="col">
                <Autocomplete
                  id="highlights-demo"
                  options={this.state.restaurantName}
                  getOptionLabel={option => option}
                  renderInput={params => (
                    <TextField {...params} label="Restaurant Name" variant="outlined" fullWidth margin="normal" />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option, inputValue);
                    const parts = parse(option, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                />
              </div>

              <div className="col">
                

                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={this.state.tagsList}
                  getOptionLabel={option => option}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Favorites"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </div>
              
            </div>

            <div className="row">
              <div className="col">
                <Typography id="range-slider" gutterBottom>
                  Price range
                </Typography>
                <Slider
                  value={[this.state.minPrice, this.state.maxPrice]}
                  aria-labelledby="range-slider"
                  onChange={(event, newValue) => {
                    this.setState({
                      minPrice: newValue[0],
                      maxPrice: newValue[1]
                    })
                  }}
                  valueLabelDisplay="on"
                />
              </div>

              <div className="col">
                <Typography id="track-inverted-range-slider" gutterBottom>
                  Minimum Rating
                </Typography>
                <Slider
                  track="inverted"
                  aria-labelledby="track-inverted-range-slider"
                  min={0}
                  max={5}
                  value={this.state.minRating}
                  valueLabelDisplay="on"
                  step={0.1}
                  onChange={(event, newValue) => {
                    this.setState({
                      minRating: newValue
                    })
                  }}
                />
              </div>

            </div>
          </div>
        
          
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
