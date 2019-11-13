import React from "react";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.developers = {
      Roshini: {
        name: "Roshini Saravanakumar",
        role: "Frontend, UI/UX, Data Visualization, Databases",
        tools: "React.js, Bootstrap, Pandas, AWS, SQL, Node.js, APIs",
        github: "https://github.com/roshinis78",
        website: "https://roshinis78.github.io/my-website",
        picture: "./images/roshini-profile.jpg"
      },
      Eunice: {
        name: "Eunice Zhou",
        role: "fill this in",
        tools: "fill this in",
        github: "#",
        website: "#",
        picture: "./images/eunice-profile.jpg"
      },
      Matthew: {
        name: "Matthew Williams",
        role: "fill this in",
        tools: "fill this in",
        github: "#",
        website: "#",
        picture: "./images/matthew-profile.jpg"
      },
      Sam: {
        name: "Samuel Dovgin",
        role: "fill this in",
        tools: "fill this in",
        github: "#",
        website: "#",
        picture: "./images/sam-profile.jpg"
      }
    };
  }

  render() {
    return (
      <div>
        <header className="custom-jumbotron bg-dark">
          <h1>Meet the Developers!</h1>
        </header>

        <div className="row flex-wrap justify-content-center">
          <DeveloperCard dev={this.developers["Roshini"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Eunice"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Matthew"]}></DeveloperCard>
          <DeveloperCard dev={this.developers["Sam"]}></DeveloperCard>
        </div>
      </div>
    );
  }
}

class DeveloperCard extends React.Component {
  render() {
    return (
      <div className="col-11 col-md-6 developer-card media">
        <img
          src={require("" + this.props.dev.picture)}
          className="img-fluid thumbnail mr-3"
        ></img>
        <div className="media-body">
          <h3>
            {this.props.dev.name}
            <a
              className="btn btn-github btn-social-icon m-1"
              href={this.props.dev.github}
            >
              <span className="fa fa-github fa-lg fa-inverse"></span>
            </a>
            <a
              className="btn btn-twitter btn-social-icon m-1"
              href={this.props.dev.website}
            >
              <span className="fa fa-globe fa-lg fa-inverse"></span>
            </a>
          </h3>
          <div>
            <i>{this.props.dev.role}</i>
            <p>{"Tools: " + this.props.dev.tools}</p>
            <p>{this.props.dev.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
