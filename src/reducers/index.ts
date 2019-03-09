import { combineReducers } from 'redux';

import { repositoryCollection } from './gitRepository';
import { currentBit } from './currentBit';
import { rootUI } from './rootUI';
import { selectedTrack } from './selectedTrack';
import { sessionBPM } from './sessionBPM';
import { sessionVolume } from './sessionVolume';
import { tracks } from './tracks';

export default combineReducers({
  repositoryCollection,
  currentBit,
  selectedTrack,
  rootUI,
  sessionBPM,
  sessionVolume,
  tracks
});
