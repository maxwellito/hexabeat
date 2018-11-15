import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from './App';
import store from './store';

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);


// Playground

import commitLoader from 'services/CommitLoader';
commitLoader.addSource('maxwellito/vivus')
commitLoader.addSource('maxwellito/triangulart')
commitLoader.fetch().then(
  () => {
    console.info(commitLoader)
    debugger;
  },
  (e) => {
    console.warn(commitLoader, e)
    debugger;
  }
)