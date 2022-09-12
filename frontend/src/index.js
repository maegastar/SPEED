import React from "react";
import ReactDOM from "react-dom/client";
import {default as App} from "./App.js";
import "./index.css";


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <App/>
  
)
