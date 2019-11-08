import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import config from './config';
import { Liveset } from 'models/Liveset';
import { store, actions } from 'store';
import themeService from 'services/Theme';
import { Machine } from 'models/Machine';

import './index.css';

// Check if a config file is provided
if (location.hash) {
  // Load config file
  const theLS = new Liveset(location.hash.substr(1));
  theLS
    .loadConfig()
    .then(() => theLS.loadAssets())
    .then(() => {
      store.dispatch(actions.setBpm(120));
      store.dispatch(actions.setCurrentBit(0));
      store.dispatch(actions.setSelectedTrack(null));
      store.dispatch(actions.setVolume(0.75));
      store.dispatch(actions.setGitRepositories(theLS.repoData));
      store.dispatch(actions.setLiveset(theLS));
      themeService.set(theLS.theme);
    });
}
// Load default config files
Promise.all(
  config.livesets.map(livesetFilePath =>
    new Liveset(livesetFilePath).loadConfig()
  )
).then(
  livesets =>
    livesets.forEach(liveset => store.dispatch(actions.addLiveset(liveset))),
  console.warn
);

new Machine();

ReactDOM.render(<App />, document.getElementById('root'));
