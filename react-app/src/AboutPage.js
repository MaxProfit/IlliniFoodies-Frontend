import React from "react";
import Card from "react-bootstrap/Card";
import "./styles/App.css";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.developers = {
      Roshini: {
        name: "Roshini Saravanakumar",
        role: "Full Stack, UI/UX + Design, AWS",
        github: "https://github.com/roshinis78",
        website: "https://roshinis78.github.io/my-website",
        picture: "./images/roshini-profile.jpg"
      },
      Eunice: {
        name: "Eunice Zhou",
        role: "Front-End, UI/UX, MaterialUI",
        github: "https://github.com/eunicornbread",
        website: "#",
        picture: "./images/eunice-profile.jpg"
      },
      Matthew: {
        name: "Matthew Williams",
        role: "Back-End, AWS, Web Architect",
        github: "https://github.com/MaxProfit",
        website: "#",
        picture: "./images/matthew-profile.jpg"
      },
      Sam: {
        name: "Samuel Dovgin",
        role: "Back-End, AWS, RDS",
        github: "https://github.com/SamuelDovgin",
        website: "#",
        picture: "./images/sam-profile.jpg"
      }
    };
  }

  render() {
    return (
      <div className="bg-dark about-page">
        <header className="about-page-header pt-5 mb-3">
          <h1 className="mb-4">Meet the Developers!</h1>
          <a
            className="btn btn-social btn-github text-white"
            href="https://github.com/MaxProfit/IlliniFoodies-Frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fa fa-github"></span> View this project on GitHub!
          </a>
        </header>

        <div className="d-flex flex-wrap justify-content-center">
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
      <Card className="about-page-card ml-2 btn-github text-white">
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
            rel="noopener noreferrer"
          >
            <span className="fa fa-github fa-lg fa-inverse"></span>
          </a>
          <a
            className="btn btn-twitter btn-social-icon m-1"
            href={this.props.dev.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fa fa-globe fa-lg fa-inverse"></span>
          </a>
        </div>
      </Card>
    );
  }
}

export default AboutPage;
