import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-md navbar-dark bg-react-dark pt-3">
        <a className="navbar-brand" href="#"><img className="logo mr-4" src={require("./images/logo.png")}></img>Illini Foodies</a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          <li className="nav-item"><a className="nav-link" href="https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz">Log In</a></li>
          <li className="nav-item"><a className="nav-link btn btn-outline-dark ml-2" href="https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz">Sign Up</a></li>
        </ul>
      </nav>

      <header className="jumbotron foodie-header">
        <form className="form-inline justify-content-center align-items-end h-50">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Find food near"></input>
            <input type="text" className="form-control" placeholder="tags (price, cuisine, i'm broke and hangry, etc.)"></input>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
