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
            <div className="card-text">{this.props.text}</div>
          </div>
        </div>
      );
    }
}


  
