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
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";


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
      tagsList: [],
      nameInput: "",
      tagInput: [],
      searchResult: [],
      similarResult: [],
      searchComponent: []
    }

    
  }

  componentDidMount() {
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

  handleSearch() {
    // console.log("min price", this.state.minPrice);
    // console.log("max price", this.state.maxPrice);
    // console.log("min rating", this.state.minRating);
    // console.log("name", this.state.nameInput);
    // console.log("tags", this.state.tagInput);

    // console.log("search");

    var tagInputString = this.state.tagInput.join(",")

    const axios = require('axios').default;
    var self = this;
    axios.get('https://api.illinifoodies.xyz/restaurants/search', {
      params: {
        minprice: this.state.minPrice,
        maxprice: this.state.maxPrice,
        minrating: this.state.minRating,
        restaurantname: this.state.nameInput,
        tags: tagInputString
      }
    })
    .then(function (response) {
      // console.log(response);
      self.setState({
        searchResult: response.data
      })

      var searchResultCarousel = [];
      var searchResultSlide = [];
      response.data.forEach((element, index) => {
        searchResultSlide.push(
          <InfoCard
              key={"search-result-"+index}
              imageSrc={element.PictureURL}
              title={element.RestaurantName}
              titleLink={element.WebsiteURL}
              text={<Rating rating={element.AvgRating}></Rating>}
              like={false}
              restaurantId={element.RestaurantId}
              tags={element.Tags}
              user={self.props.user}
              unique={"search-result-"+index}
            ></InfoCard>
        );
        
        // console.log(searchResultSlide);
        if ((index + 1) % 3 === 0) {
          if (index == 2) {
            searchResultCarousel.push(
              <div className="carousel-item active" key={"carousel" + index}>
                <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                  { searchResultSlide }
                </div>
              </div>
            )
          } else {
            searchResultCarousel.push(
              <div className="carousel-item" key={"carousel" + index}>
                <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                  { searchResultSlide }
                </div>
              </div>
            )
          }
          
          searchResultSlide = [];
        }

      })

      if (searchResultSlide.length !== 0) {
        if (response.data.length < 3) {
          searchResultCarousel.push(
            <div className="carousel-item active" key={"carousel-" + 1}>
              <div className="d-flex justify-content-center">
                
                { searchResultSlide }
              </div>
            </div>
          )
        } else {
          searchResultCarousel.push(
            <div className="carousel-item" key={"carousel-" + 1}>
              <div className="d-flex justify-content-center">
                
                { searchResultSlide }
              </div>
            </div>
          )
        }
      }
      self.setState({
        searchComponent: searchResultCarousel
      })
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });  
  }
  
  // <div class="carousel-item">
  //               <div className="test2"></div>
              
  //             </div>

  render() {
    // console.log("hi:", this.state.searchResult);
    

    // console.log(searchResultCarousel.length);

    return (
      <div className="search-page">
        
        <div className="search-form">
          
          <div className="container mt-5">
            <div className="row mb-4">
              <div className="col">
                <Autocomplete
                  id="highlights-demo"
                  options={this.state.restaurantName}
                  getOptionLabel={option => option}
                  onSelect={(event) => {
                    // console.log(event.target.value);
                    this.setState({
                      nameInput: event.target.value
                    })
                  }}
                  freeSolo
                  renderInput={params => (
                    <TextField 
                        {...params} 
                        label="Restaurant Name" 
                        variant="outlined" 
                        fullWidth margin="normal"
                        onChange={(event) => {
                          // console.log(event.target.value);
                          this.setState({
                            nameInput: event.target.value
                          })
                          // console.log(event.target.value);
                        }}
                     />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option, inputValue);
                    const parts = parse(option, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span key={"part-"+index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
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
                  onChange={(event) => {
                    // console.log(event.target.innerHTML);
                    var tags = this.state.tagInput;
                    tags.push(event.target.innerHTML);
                    this.setState({
                      tagInput: tags
                    })
                  }}
                  
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      margin="normal"
                      fullWidth         
                    />
                  )}
                />
              </div>     
            </div>

            <div className="row mb-4">
              <div className="col">
                <Typography id="range-slider" gutterBottom className="mb-5">
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
                  className="mt-2"
                />
              </div>

              <div className="col">
                
              </div>
              
              
            </div>

            <div className="row mb-4">
              <div className="col">
                <Typography id="track-inverted-range-slider" gutterBottom className="mb-5">
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
                    className="mt-2"
                  />
              </div>

              <div className="col d-flex justify-content-end align-items-center mt-4">
                <Fab variant="extended" className="search-btn" onClick={ this.handleSearch.bind(this) }>
                  <SearchIcon className="search-icon" />
                  <span className="search-txt">Search</span>
                </Fab>
              </div>
              </div>
          </div>
        
          
        </div>


        <div className="search-result mb-5">
          <div id="searchResultCarousel" className="carousel slide">
            <div className="carousel-inner">
              {/* <div class="carousel-item active">
                <div className="test"></div>
              </div>
              <div class="carousel-item">
                <div className="test2"></div>
              
              </div>
              <div class="carousel-item">
                <div className="test3"></div>
              
              </div> */}
              { this.state.searchComponent }
            </div>
            <a className="carousel-control-prev" href="#searchResultCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#searchResultCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="similar-result">

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
