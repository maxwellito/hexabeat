// Session
export const bpmUpdate = value => ({
  type: 'BPM_UPDATE',
  value
})
export const volumeUpdate = value => ({
  type: 'VOLUME_UPDATE',
  value
})

// Tracks
export const setTracks = tracks => ({
  type: 'SET_TRACKS',
  tracks
})
export const addTrack = track => ({
  type: 'ADD_TRACK',
  track
})
export const removeTrack = track => ({
  type: 'REMOVE_TRACK',
  track
})

// Commit Collections
export const setCommitCollections = collections => ({
  type: 'SET_COMMIT_COLLECTIONS',
  collections
})
export const addCommitCollection = collection => ({
  type: 'ADD_COMMIT_COLLECTION',
  collection
})
export const removeCommitCollection = collection => ({
  type: 'REMOVE_COMMIT_COLLECTION',
  collection
})

// Selected track
export const selectTrack = index => ({
  type: 'SELECT_TRACK',
  value: index
})
export const releaseTrack = () => ({
  type: 'RELEASE_TRACK'
})

// Current Bit
export const setCurrentBit = index => ({
  type: 'SET_CURRECT_BIT',
  value: index
})