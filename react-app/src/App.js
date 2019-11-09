'use strict';

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "typeface-roboto";
import "font-awesome/css/font-awesome.min.css";
import { Navbar } from "./BarComponent";
import WelcomePage from "./WelcomePage";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <SignUp></SignUp>
    </div>
  );
}

export default App;
