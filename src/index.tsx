import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import store from './store';
import config from './config';

import './index.css';

// Load commits
import RepositoryLoader from 'services/RepositoryLoader';
import * as actions from 'actions/index';

config.livesets.forEach(livesetFilePath => {
  fetch(livesetFilePath)
    .then(r => r.json())
    .then(liveset => {
      console.log('>>>', liveset);
      store.dispatch(actions.addLiveset(liveset));
    });
});
RepositoryLoader.addSource('maxwellito/vivus')
  .addSource('maxwellito/triangulart')
  .fetch()
  .then(collection => {
    store.dispatch(actions.setGitRepositories(collection));
    ReactDOM.render(<App />, document.getElementById('root'));
  });
