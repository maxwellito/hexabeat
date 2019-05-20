import Track from 'models/Track';

export interface SoloTrackAction {
  type: string;
  value?: Track;
}

export function soloTrack(
  state: Track = null,
  action?: SoloTrackAction
): Track {
  switch (action.type) {
    case 'TOGGLE_SOLO_TRACK':
      if (state && state !== action.value) {
        state.toggleSolo(false);
      }
      action.value.toggleSolo();
      const output = action.value.isSolo ? action.value : null;
      return output;
    case 'SET_SOLO_TRACK':
      if (state) {
        state.toggleSolo(false);
      }
      action.value.toggleSolo(true);
      return action.value;
    case 'RELEASE_SOLO_TRACK':
      if (state) {
        state.toggleSolo(false);
      }
      return null;
    default:
      return state;
  }
}
