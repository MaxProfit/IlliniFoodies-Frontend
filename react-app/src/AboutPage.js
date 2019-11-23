import React from "react";
import Card from "react-bootstrap/Card";
import "./App.css";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.developers = {
      Roshini: {
        name: "Roshini Saravanakumar",
        role: "Front-End, UI/UX, Data Visualization, APIs",
        github: "https://github.com/roshinis78",
        website: "https://roshinis78.github.io/my-website",
        picture: "./images/roshini-profile.jpg"
      },
      Eunice: {
        name: "Eunice Zhou",
        role: "UI/UX",
        github: "https://github.com/eunicornbread",
        website: "#",
        picture: "./images/eunice-profile.jpg"
      },
      Matthew: {
        name: "Matthew Williams",
        role: "Back-End, AWS, Architect",
        github: "https://github.com/MaxProfit",
        website: "#",
        picture: "./images/matthew-profile.jpg"
      },
      Sam: {
        name: "Samuel Dovgin",
        role: "Back-End",
        github: "https://github.com/SamuelDovgin",
        website: "#",
        picture: "./images/sam-profile.jpg"
      }
    };
  }

  render() {
    return (
      <div>
        <header
          className="custom-jumbotron bg-sunkist text-white text-center align-items-center mb-3"
          style={{ "margin-top": "6em", "height": "300px" }}
        >
          <h1 className="mt-3 mb-4">Meet the Developers!</h1>
          <a
            className="btn btn-social btn-github text-white"
            href="https://github.com/MaxProfit/IlliniFoodies-Frontend"
            target="_blank"
          >
            <span className="fa fa-github"></span> View this project on GitHub!
          </a>
        </header>

        <div className="d-flex flex-wrap justify-content-center align-items-center h-100">
          <DeveloperCard dev={this.developers["Roshini"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Matthew"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Eunice"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Sam"]}></DeveloperCard>
        </div>
      </div>
    );
  }
}

class DeveloperCard extends React.Component {
  render() {
    return (
      <Card style={{ width: "350px" }} className="ml-2 bg-dark text-white">
        <Card.Header className="text-center">
          <h4>{this.props.dev.name}</h4>
          <i>{this.props.dev.role}</i>
        </Card.Header>
        <Card.Img
          className="dev-card-img"
          style={{ height: "300px" }}
          src={require("" + this.props.dev.picture)}
        />
        <div className="card-img-overlay d-flex justify-content-center align-items-center">
          <a
            className="btn btn-github btn-social-icon m-1"
            href={this.props.dev.github}
            target="_blank"
          >
            <span className="fa fa-github fa-lg fa-inverse"></span>
          </a>
          <a
            className="btn btn-twitter btn-social-icon m-1"
            href={this.props.dev.website}
            target="_blank"
          >
            <span className="fa fa-globe fa-lg fa-inverse"></span>
          </a>
        </div>
      </Card>
    );
  }
}

export default AboutPage;
