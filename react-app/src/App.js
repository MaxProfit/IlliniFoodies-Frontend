import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to IlliniFoodies! We're currently working on functionality.
        </p>
        <a
          className="App-link"
          href="https://auth.illinifoodies.xyz/login?response_type=token&client_id=2h8u013ovbmseaaurir8981hcs&redirect_uri=https://illinifoodies.xyz"
        >
          Try Our Authentication!
        </a>
      </header>
    </div>
  );
}

export default App;
