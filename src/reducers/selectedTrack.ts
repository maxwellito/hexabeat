export interface SelectedTrackAction {
  type: string;
  value?: number;
}

export function selectedTrack (state:number = -1, action?:SelectedTrackAction): number {
  switch (action.type) {
    case 'SELECT_TRACK':
      return action.value
    case 'RELEASE_TRACK':
      return -1
    default:
      return state
  }
}