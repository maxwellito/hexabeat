import { combineReducers } from 'redux';

import { bpm } from './bpm';
import { currentBit } from './currentBit';
import { gitRepositories } from './gitRepositories';
import { liveset } from './liveset';
import { selectedTrack } from './selectedTrack';
import { tracks } from './tracks';
import { volume } from './volume';

export default combineReducers({
  bpm,
  currentBit,
  gitRepositories,
  liveset,
  selectedTrack,
  tracks,
  volume
});
