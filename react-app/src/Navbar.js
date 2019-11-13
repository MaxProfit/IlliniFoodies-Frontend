import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    var linkNames = ["Home", "About", "Demo", "Testing", "Log In"];

    this.state = {
      links: linkNames.map(function(linkName) {
        if (linkName === "Log In") {
          var link =
            "https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz/signup";
        } else {
          link = "/" + linkName.toLowerCase();
        }

        return {
          name: linkName,
          link: link,
          active: ""
        };
      })
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(event) {
    console.log(event)
  }

  render() {
    var navLinks = this.state.links.map(function(linkInfo, self=this) {
      if (linkInfo.name === "Log In") {
        return (
          <li key={linkInfo.name} className={"nav-item nav-link " + linkInfo.active}>
            <a
              className="btn text-white"
              href={linkInfo.link}
              style={{
                backgroundImage:
                  "linear-gradient(to top right, #00b4db, #0083b0)"
              }}
            >
              {linkInfo.name}
            </a>
          </li>
        );
      }
      return (
        <Link key={linkInfo.name} to={linkInfo.link} onClick={self.handleLinkClick}>
          <li className={"nav-item nav-link mt-2 " + linkInfo.active}>
            {linkInfo.name}
          </li>
        </Link>
      );
    });

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top pt-3">
        <Link to="/" className="btn-link">
          <div className="d-flex flex-row">
            <img className="logo mr-3 ml-2 mt-1" src={require("./images/logo.png")}></img>
            <h2 className="text-dark">Illini Foodies</h2>
          </div>
        </Link>

        <ul className="navbar-nav ml-auto">{navLinks}</ul>
      </nav>
    );
  }
}

export default Navbar;
