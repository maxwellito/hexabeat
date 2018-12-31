import {RepositoryCollectionAction} from '../reducers/gitRepository';
import {CurrentBitAction} from '../reducers/currentBit'
import {SelectedTrackAction} from '../reducers/selectedTrack'
import {SessionBpmAction} from '../reducers/sessionBPM'
import {SessionVolumeAction} from '../reducers/sessionVolume'
import {TracksAction} from '../reducers/tracks'

import {RepositoryCollection} from '../models/GitRepository'
import Track from '../models/Track';

// Session
export const bpmUpdate = (value:number):SessionBpmAction => ({
  type: 'BPM_UPDATE',
  value
})
export const volumeUpdate = (value:number):SessionBpmAction => ({
  type: 'VOLUME_UPDATE',
  value
})

// Tracks
export const setTracks = (tracks:Track[]):TracksAction => ({
  type: 'SET_TRACKS',
  tracks
})
export const addTrack = (track:Track):TracksAction => ({
  type: 'ADD_TRACK',
  track
})
export const removeTrack = (track:Track):TracksAction => ({
  type: 'REMOVE_TRACK',
  track
})

// Repository Collection
export const setRepositoryCollection = (collection:RepositoryCollection): RepositoryCollectionAction => ({
  type: 'SET_REPOSITORY_COLLECTION',
  collection
})

// Selected track
export const selectTrack = (index:number):SelectedTrackAction => ({
  type: 'SELECT_TRACK',
  value: index
})
export const releaseTrack = ():SelectedTrackAction => ({
  type: 'RELEASE_TRACK'
})

// Current Bit
export const setCurrentBit = (index:number):CurrentBitAction => ({
  type: 'SET_CURRECT_BIT',
  value: index
})

// Session volume
export const setSessionVolume = (index:number):SessionVolumeAction => ({
  type: 'VOLUME_UPDATE',
  value: index
})