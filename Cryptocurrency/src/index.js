import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <BrowserRouter >
   <Route path='/:page?' component={App} /> 
  </BrowserRouter>,
  document.getElementById("root")
);
