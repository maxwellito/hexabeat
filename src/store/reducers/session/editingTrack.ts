import Track from 'models/Track';

export interface EditingTrackAction {
  type: string;
  value?: Track;
}

export function editingTrack(
  state: Track = null,
  action?: EditingTrackAction
): Track {
  switch (action.type) {
    case 'SET_EDITING_TRACK':
      return action.value;
    case 'RELEASE_EDITING_TRACK':
      return null;
    default:
      return state;
  }
}
