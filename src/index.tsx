import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import config from './config';
import { Liveset } from 'models/Liveset';
import { store, actions } from 'store';

import './index.css';

config.livesets.forEach(livesetFilePath => {
  new Liveset(livesetFilePath).loadConfig().then(liveset => {
    store.dispatch(actions.addLiveset(liveset));
  });
});

ReactDOM.render(<App />, document.getElementById('root'));
