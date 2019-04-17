import { HelpAction } from './reducers/help';
import { LivesetsAction } from './reducers/livesets';
import { BpmAction } from './reducers/session/bpm';
import { CurrentBitAction } from './reducers/session/currentBit';
import { GitRepositoriesAction } from './reducers/session/gitRepositories';
import { PlayingAction } from './reducers/session/isPlaying';
import { LivesetAction } from './reducers/session/liveset';
import { SelectedTrackAction } from './reducers/session/selectedTrack';
import { SoloTrackAction } from './reducers/session/soloTrack';
import { TracksAction } from './reducers/session/tracks';
import { VolumeAction } from './reducers/session/volume';

import { RepositoryCollection } from 'models/GitRepository';
import { Liveset } from 'models/Liveset';
import Track from 'models/Track';

// Help
export const toggleHelp = (newState: boolean): HelpAction => ({
  type: 'TOGGLE_HELP',
  help: newState
});

// Livesets
export const addLiveset = (liveset: Liveset): LivesetsAction => ({
  type: 'ADD_LIVESET',
  liveset
});
export const removeLiveset = (liveset: Liveset): LivesetsAction => ({
  type: 'REMOVE_LIVESET',
  liveset
});

// Session
// session.bpm
export const setBpm = (value: number): BpmAction => ({
  type: 'SET_BPM',
  value
});
// session.currentBit
export const setCurrentBit = (index: number): CurrentBitAction => ({
  type: 'SET_CURRECT_BIT',
  value: index
});
// session.gitRepositories
export const setGitRepositories = (
  collection: RepositoryCollection
): GitRepositoriesAction => ({
  type: 'SET_REPOSITORIES_COLLECTION',
  collection
});
// session.isPlaying
export const play = (value: boolean): PlayingAction => ({
  type: 'IS_PLAYING',
  value
});
export const togglePlaying = (): PlayingAction => ({
  type: 'TOGGLE_PLAYING'
});
// session.liveset
export const setLiveset = (value: Liveset): LivesetAction => ({
  type: 'SET_LIVESET',
  value
});
export const releaseLiveset = (): LivesetAction => ({
  type: 'RELEASE_LIVESET'
});
// session.selectedTrack
export const setSelectedTrack = (index: number): SelectedTrackAction => ({
  type: 'SELECT_TRACK',
  value: index
});
export const releaseSelectedTrack = (): SelectedTrackAction => ({
  type: 'RELEASE_TRACK'
});
// session.soloTrack
export const setSoloTrack = (value: Track): SoloTrackAction => ({
  type: 'SET_SOLO_TRACK',
  value
});
export const releaseSoloTrack = (): SoloTrackAction => ({
  type: 'RELEASE_SOLO_TRACK'
});
// session.tracks
export const setTrack = (tracks: Track[]): TracksAction => ({
  type: 'SET_TRACKS',
  tracks
});
export const addTrack = (track: Track): TracksAction => ({
  type: 'ADD_TRACK',
  track
});
export const removeTrack = (track: Track): TracksAction => ({
  type: 'REMOVE_TRACK',
  track
});
// session.volume
export const setVolume = (value: number): VolumeAction => ({
  type: 'SET_VOLUME',
  value
});
