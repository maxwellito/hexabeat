import { combineReducers } from 'redux';

import { bpm } from './bpm';
import { currentBit } from './currentBit';
import { editingTrack } from './editingTrack';
import { gitRepositories } from './gitRepositories';
import { isPlaying } from './isPlaying';
import { liveset } from './liveset';
import { selectedTrack } from './selectedTrack';
import { soloTrack } from './soloTrack';
import { tracks } from './tracks';
import { volume } from './volume';

export default combineReducers({
  bpm,
  currentBit,
  editingTrack,
  gitRepositories,
  isPlaying,
  liveset,
  selectedTrack,
  soloTrack,
  tracks,
  volume
});
