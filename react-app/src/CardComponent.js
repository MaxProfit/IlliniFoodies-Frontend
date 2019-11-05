import React from 'react';

export const InfoCard = class InfoCard extends React.Component {
    render() {
      return (
        <div className="card">
          <img src={this.props.imageSrc}></img>
          <div className="card-body">
            <a href={this.props.titleLink}>
              <h5 className="card-title">{this.props.title}</h5>
            </a>
            <p className="card-text">{this.props.text}</p>
          </div>
        </div>
      );
    }
}


export const DeveloperCard = class DeveloperCard extends React.Component {
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
            <p>
                <i>{this.props.dev.role}</i>
                <p>{"Tools: " + this.props.dev.tools}</p>
                <p>{this.props.dev.description}</p>
            </p>
            </div>
        </div>
        );
    }
}  
