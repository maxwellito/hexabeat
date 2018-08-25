import Track from '../models/Track';

export interface TracksAction {
  type: string;
  track?: Track;
  tracks?: Track[]
}

export function tracks (state:Track[] = [], action?:TracksAction): Track[] {
  switch (action.type) {
    case 'SET_TRACKS':
      return action.tracks
    case 'ADD_TRACK':
      return [...state, action.track]
    case 'REMOVE_TRACK':
      state.splice(state.indexOf(action.track), 1)
      return state
    default:
      return state
  }
}