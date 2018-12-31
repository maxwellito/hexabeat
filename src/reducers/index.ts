import {combineReducers} from 'redux'

import {repositoryCollection} from './gitRepository';
import {currentBit} from './currentBit';
import {selectedTrack} from './selectedTrack';
import {sessionBPM} from './sessionBPM';
import {sessionVolume} from './sessionVolume';
import {tracks} from './tracks';

export default combineReducers({
  repositoryCollection,
  currentBit,
  selectedTrack,
  sessionBPM,
  sessionVolume,
  tracks
})