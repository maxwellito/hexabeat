import Track from 'models/Track';

export interface soloTrackAction {
  type: string;
  value?: Track;
}

export function soloTrack(
  state: Track = null,
  action?: soloTrackAction
): Track {
  switch (action.type) {
    case 'SET_SOLO_TRACK':
      if (state) {
        state.isSolo = false;
      }
      action.value.isSolo = true;
      return action.value;
    case 'RELEASE_SOLO_TRACK':
      if (state) {
        state.isSolo = false;
      }
      return null;
    default:
      return state;
  }
}
