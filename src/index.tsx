import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from './App';
import store from './store';

console.log(store)

// import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);