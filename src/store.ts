import {createStore}  from 'redux';
import rootReducer from './reducers';

export default createStore(rootReducer)

/**
 * Store structure
 * 
 * selectedTrack: number
 * currentBit: number
 * 
 * tracks: Track[]
 * sessionBPM: number
 * sessionVolume: number
 * 
 * commitCollections: CommitCollection[]
 */
