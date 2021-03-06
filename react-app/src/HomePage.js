import React from "react";
import InfoBar from "./InfoBar";
import "./styles/HomePage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faUsers,
  faSearch,
  faQuoteLeft,
  faQuoteRight,
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { axiosRequest } from "./Util";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import { InfoCard } from "./InfoCard";
import Rating from "./Rating";

class Feed extends React.Component {
  render() {
    var res = this.props.rating.DatePosted.split("T");
    var date = res[0].split("-");

    return (
      <div
        key={this.props.rating.RatingId}
        className={
          "feed-wrapper d-flex" +
          (this.props.side === "left" ? " left-wrapper" : " right-wrapper")
        }
      >
        <div className="user-img-wrapper">
          <img src={this.props.rating.PictureURL} alt="User profile" />
        </div>
        <div
          className={
            "feed-content-wrapper d-flex flex-column flex-grow-1" +
            (this.props.side === "left" ? " left-side" : " right-side")
          }
        >
          <h4 className="feed-restaurant d-flex justify-content-start">
            {this.props.rating.RestaurantName}
          </h4>
          <div className="feed-rating d-flex justify-content-start mb-3">
            <Rating rating={this.props.rating.Rating}></Rating>
          </div>
          <div className="feed-comment d-flex justify-content-start">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className={
                "quote-left-icon" + (this.props.side === "right" ? "2" : "")
              }
            />
            <span className="feed-text">{this.props.rating.Comment}</span>
          </div>
          <div className="d-flex justify-content-end">
            <FontAwesomeIcon
              icon={faQuoteRight}
              className={
                "quote-right-icon" + (this.props.side === "right" ? "2" : "")
              }
            />
          </div>
          <div className="feed-user d-flex justify-content-end mt-4">
            {this.props.rating.Nickname}
          </div>
          <div className="feed-date d-flex justify-content-end">
            {date[1] +
              "/" +
              date[2] +
              "/" +
              date[0] +
              " " +
              res[1].substring(0, 5)}
          </div>
        </div>
      </div>
    );
  }
}

class FeedPage extends React.Component {
  render() {
    // FIXME: missing ratings component
    // if (this.props.user != null) {
    //   axiosRequest({
    //     type: "get",
    //     url:
    //       "https://api.illinifoodies.xyz/users/" +
    //       this.props.user.Id +
    //       "/missing-ratings",
    //     data: {},
    //   });
    // }
    // var missingRating = <div></div>;

    var feedComponent = [];
    this.props.ratingList.forEach((element, index) => {
      if (index % 2 === 0) {
        feedComponent.push(
          <div className="row" key={"row-" + index}>
            <div className="col">
              <Feed side="left" rating={element} />
            </div>
            <div className="col"></div>
          </div>
        );
      } else {
        feedComponent.push(
          <div className="row" key={"row-" + index}>
            <div className="col"></div>
            <div className="col">
              <Feed side="right" rating={element} />
            </div>
          </div>
        );
      }
    });
    return (
      <div className="feed-page">
        <div className="container mt-5">
          {/* missingRating - to be finished */}
          {feedComponent}
        </div>
      </div>
    );
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
      searchComponent: [],
      similarComponent: [],
      noResult: false
    };
  }

  componentDidMount() {
    axiosRequest({
      type: "get",
      url: "https://api.illinifoodies.xyz/restaurants/names",
      data: {},
      onSuccess: response => {
        if (response.status === 200) {
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
          this.setState({ tagsList: response.data.body });
        }
      }
    });
  }

  handleSearch() {
    this.setState({
      searchComponent: [],
      searchResult: [],
      similarResult: [],
      similarComponent: [],
      noResult: false
    });

    var tagInputString = this.state.tagInput.join(",");

    const axios = require("axios").default;
    var self = this;

    axios
      .get("https://api.illinifoodies.xyz/restaurants/search", {
        params: {
          minprice: this.state.minPrice,
          maxprice: this.state.maxPrice,
          minrating: this.state.minRating,
          restaurantname: this.state.nameInput,
          tags: tagInputString,
          limit: 21
        }
      })
      .then(function(response) {
        self.setState({
          searchResult: response.data
        });

        if (response.data.length === 0) {
          self.setState({
            noResult: true
          });
        }

        var searchResultCarousel = [];
        var searchResultSlide = [];
        response.data.forEach((element, index) => {
          searchResultSlide.push(
            <InfoCard
              key={"search-result-" + index}
              imageSrc={element.PictureURL}
              title={element.RestaurantName}
              titleLink={element.WebsiteURL}
              text={<Rating rating={element.AvgRating}></Rating>}
              like={false}
              restaurantId={element.RestaurantId}
              tags={element.Tags}
              user={self.props.user}
              unique={"search-result-" + index}
              refreshFavorites={self.props.refreshFavorites}
              refreshRatings={self.props.refreshRatings}
            ></InfoCard>
          );

          if ((index + 1) % 3 === 0) {
            if (index === 2) {
              searchResultCarousel.push(
                <div className="carousel-item active" key={"carousel" + index}>
                  <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                    {searchResultSlide}
                  </div>
                </div>
              );
            } else {
              searchResultCarousel.push(
                <div className="carousel-item" key={"carousel" + index}>
                  <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                    {searchResultSlide}
                  </div>
                </div>
              );
            }

            searchResultSlide = [];
          }
        });

        if (searchResultSlide.length !== 0) {
          if (response.data.length < 3) {
            searchResultCarousel.push(
              <div className="carousel-item active" key={"carousel-" + 1}>
                <div className="d-flex justify-content-center">
                  {searchResultSlide}
                </div>
              </div>
            );
          } else {
            searchResultCarousel.push(
              <div className="carousel-item" key={"carousel-" + 1}>
                <div className="d-flex justify-content-center">
                  {searchResultSlide}
                </div>
              </div>
            );
          }
        }
        self.setState({
          searchComponent: searchResultCarousel
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });

    axios
      .get("https://api.illinifoodies.xyz/restaurants/similar", {
        params: {
          minprice: this.state.minPrice,
          maxprice: this.state.maxPrice,
          minrating: this.state.minRating,
          restaurantname: this.state.nameInput,
          tags: tagInputString,
          limit: 21
        }
      })
      .then(function(response) {
        self.setState({
          similarResult: response.data
        });

        var similarResultCarousel = [];
        var similarResultSlide = [];
        response.data
          .sort((a, b) => {
            return b.AvgRating - a.AvgRating;
          })
          .forEach((element, index) => {
            similarResultSlide.push(
              <InfoCard
                key={"search-similar-" + index}
                imageSrc={element.PictureURL}
                title={element.RestaurantName}
                titleLink={element.WebsiteURL}
                text={<Rating rating={element.AvgRating}></Rating>}
                like={false}
                restaurantId={element.RestaurantId}
                tags={element.Tags}
                user={self.props.user}
                unique={"search-similar-" + index}
                refreshFavorites={self.props.refreshFavorites}
                refreshRatings={self.props.refreshRatings}
              ></InfoCard>
            );

            if ((index + 1) % 3 === 0) {
              if (index === 2) {
                similarResultCarousel.push(
                  <div
                    className="carousel-item active"
                    key={"carousel2" + index}
                  >
                    <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                      {similarResultSlide}
                    </div>
                  </div>
                );
              } else {
                similarResultCarousel.push(
                  <div className="carousel-item" key={"carousel2" + index}>
                    <div className="d-flex justify-content-center flex-row flex-wrap align-items-center">
                      {similarResultSlide}
                    </div>
                  </div>
                );
              }

              similarResultSlide = [];
            }
          });

        if (similarResultSlide.length !== 0) {
          if (response.data.length < 3) {
            similarResultCarousel.push(
              <div className="carousel-item active" key={"carousel-" + 1}>
                <div className="d-flex justify-content-center">
                  {similarResultSlide}
                </div>
              </div>
            );
          } else {
            similarResultCarousel.push(
              <div className="carousel-item" key={"carousel-" + 1}>
                <div className="d-flex justify-content-center">
                  {similarResultSlide}
                </div>
              </div>
            );
          }
        }
        self.setState({
          similarComponent: similarResultCarousel
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  render() {
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
                  onSelect={event => {
                    this.setState({
                      nameInput: event.target.value
                    });
                  }}
                  freeSolo
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Restaurant Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={event => {
                        this.setState({
                          nameInput: event.target.value
                        });
                      }}
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option, inputValue);
                    const parts = parse(option, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={"part-" + index}
                            style={{ fontWeight: part.highlight ? 700 : 400 }}
                          >
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
                  onChange={event => {
                    var tags = this.state.tagInput;
                    tags.push(event.target.innerHTML);
                    this.setState({
                      tagInput: tags
                    });
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
                    });
                  }}
                  valueLabelDisplay="on"
                  className="mt-2"
                />
              </div>

              <div className="col"></div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <Typography
                  id="track-inverted-range-slider"
                  gutterBottom
                  className="mb-5"
                >
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
                    });
                  }}
                  className="mt-2"
                />
              </div>

              <div className="col d-flex justify-content-end align-items-center mt-4">
                <Fab
                  variant="extended"
                  className="search-btn"
                  onClick={this.handleSearch.bind(this)}
                  id="search-btn"
                >
                  <SearchIcon className="search-icon" />
                  <span className="search-txt">Search</span>
                </Fab>
              </div>
            </div>
          </div>
        </div>

        <div className="search-result mb-5">
          {(this.state.searchComponent.length !== 0 || this.state.noResult) && (
            <h2 className="page-head2">- Search Results -</h2>
          )}

          {this.state.noResult && (
            <div className="no-result">
              Sorry. We do not find the restaurant for you :(
            </div>
          )}

          <div
            id="searchResultCarousel"
            className="carousel slide"
            data-interval="false"
          >
            <div className="carousel-inner">{this.state.searchComponent}</div>

            {this.state.searchComponent.length !== 0 && (
              <>
                <a
                  className="carousel-control-prev"
                  href="#searchResultCarousel"
                  role="button"
                  data-slide="prev"
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    className="left-right-icon"
                  />
                </a>
                <a
                  className="carousel-control-next"
                  href="#searchResultCarousel"
                  role="button"
                  data-slide="next"
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleRight}
                    className="left-right-icon"
                  />
                </a>
              </>
            )}
          </div>
        </div>

        <div className="similar-result">
          {this.state.similarComponent.length !== 0 && (
            <h2 className="page-head2">- Similar Restaurants -</h2>
          )}

          <div
            id="similarResultCarousel"
            className="carousel slide"
            data-interval="false"
          >
            <div className="carousel-inner">{this.state.similarComponent}</div>

            {this.state.similarComponent.length !== 0 && (
              <>
                <a
                  className="carousel-control-prev"
                  href="#similarResultCarousel"
                  role="button"
                  data-slide="prev"
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    className="left-right-icon"
                  />
                </a>
                <a
                  className="carousel-control-next"
                  href="#similarResultCarousel"
                  role="button"
                  data-slide="next"
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleRight}
                    className="left-right-icon"
                  />
                </a>
              </>
            )}
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
      active: "home"
    };
  }

  iconChange(iconName) {
    this.setState({
      active: iconName
    });
  }

  render() {
    return (
      <div>
        <header className="intro-header">
          <div className="overlay"></div>

          <div className="welcome-message"></div>

          <div className="icon-menu">
            <div
              className={
                "icon-item home-icon" +
                (this.state.active === "home" ? " active" : "")
              }
              onClick={this.iconChange.bind(this, "home")}
            >
              <FontAwesomeIcon icon={faHome} id="home-icon" />
            </div>
            <div
              className={
                "icon-item like-icon" +
                (this.state.active === "like" ? " active" : "")
              }
              onClick={this.iconChange.bind(this, "like")}
            >
              <FontAwesomeIcon icon={faHeart} id="heart-icon" />
            </div>
            <div
              className={
                "icon-item follow-icon" +
                (this.state.active === "follow" ? " active" : "")
              }
              onClick={this.iconChange.bind(this, "follow")}
            >
              <FontAwesomeIcon icon={faUsers} id="follow-icon" />
            </div>
            <div
              className={
                "icon-item search-icon" +
                (this.state.active === "search" ? " active" : "")
              }
              onClick={this.iconChange.bind(this, "search")}
            >
              <FontAwesomeIcon icon={faSearch} id="search-icon" />
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {this.state.active === "home" && (
            <div className="text-center">
              <h2 className="page-head">- Top Picks For You -</h2>
              <InfoBar
                title="TOP PICKS NEAR YOU"
                page="home page"
                recommendList={this.props.recommendList}
                user={this.props.user}
                refreshFavorites={this.props.refreshFavorites}
                refreshRatings={this.props.refreshRatings}
              ></InfoBar>
            </div>
          )}

          {(this.state.active === "like") && (this.props.user !== null) && (
            <div className="text-center">
              <h2 className="page-head">- Your Favorites -</h2>
              <InfoBar
                title="Favorite Restaurants"
                page="like page"
                favRestaurants={this.props.favRestaurants}
                user={this.props.user}
                refreshFavorites={this.props.refreshFavorites}
                refreshRatings={this.props.refreshRatings}
              />
            </div>
          )}

          {(this.state.active === "like") && (this.props.user === null) && (
            <div className="text-center">
              <h2 className="page-head">- Your Favorites -</h2>
              <p className="text-help"><i>Please sign in to view favorites!</i></p>
            </div>
          )}

          {(this.state.active === "follow") && (this.props.user !== null) && (
            <div className="text-center">
              <h2 className="page-head">- Your Feed -</h2>
              <FeedPage
                user={this.props.user}
                ratingList={this.props.ratingList}
                refreshFavorites={this.props.refreshFavorites}
                refreshRatings={this.props.refreshRatings}
              />
            </div>
          )}

          {(this.state.active === "follow") && (this.props.user === null) && (
            <div className="text-center">
              <h2 className="page-head">- Your Feed -</h2>
              <p className="text-help"><i>Please sign in to view your feed!</i></p>
            </div>
          )}

          {this.state.active === "search" && (
            <div className="text-center">
              <h2 className="page-head">- Find A Restaurant -</h2>
              <SearchPage
                user={this.props.user}
                refreshFavorites={this.props.refreshFavorites}
                refreshRatings={this.props.refreshRatings}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
