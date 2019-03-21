import { combineReducers } from 'redux';

import { help } from './help';
import { livesets } from './livesets';
import session from './session';

export default combineReducers({
  help,
  livesets,
  session
});
