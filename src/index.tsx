import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from './App';
import store from './store';

import './index.css';




// Load commits
import RepositoryLoader from 'services/RepositoryLoader';
import * as actions from 'actions/index';
RepositoryLoader
  .addSource('maxwellito/vivus')
  .addSource('maxwellito/triangulart')
  .fetch()
  .then(
    collection => {
      store.dispatch(actions.setRepositoryCollection(collection));
      ReactDOM.render(
        <App />,
        document.getElementById("root")
      );
    }
  )