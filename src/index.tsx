import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import store from './store';
import config from './config';

import './index.css';

import { Liveset } from 'models/Liveset';
import * as actions from 'actions/index';

config.livesets.forEach(livesetFilePath => {
  new Liveset(livesetFilePath).loadConfig().then(liveset => {
    store.dispatch(actions.addLiveset(liveset));
  });
});

ReactDOM.render(<App />, document.getElementById('root'));
