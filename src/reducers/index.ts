import {combineReducers} from 'redux'

import {commitCollections} from './commitCollections';
import {currentBit} from './currentBit';
import {selectedTrack} from './selectedTrack';
import {sessionBPM} from './sessionBPM';
import {sessionVolume} from './sessionVolume';
import {tracks} from './tracks';

export default combineReducers({
  commitCollections,
  currentBit,
  selectedTrack,
  sessionBPM,
  sessionVolume,
  tracks
})