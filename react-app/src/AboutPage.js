import React from 'react';
import { DeveloperCard } from './CardComponent';
import { Navbar } from './BarComponent';

var developers = {
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

class AboutPage extends React.Component {
    render() {
      return (
        <div>
          <Navbar active={["", " active", "", "", "", "", ""]}></Navbar>
  
          <header className="custom-jumbotron bg-dark">
            <h1>Meet the Developers!</h1>
          </header>
  
          <div className="row flex-wrap justify-content-center">
            <DeveloperCard dev={developers["Roshini"]}></DeveloperCard>
            <DeveloperCard dev={developers["Eunice"]}></DeveloperCard>
            <DeveloperCard dev={developers["Matthew"]}></DeveloperCard>
            <DeveloperCard dev={developers["Sam"]}></DeveloperCard>
          </div>
        </div>
      );
    }
  }

  export default AboutPage;