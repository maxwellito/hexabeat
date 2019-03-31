export interface PlayingAction {
  type: string;
  value?: boolean;
}

export function isPlaying(state = false, action?: PlayingAction): boolean {
  switch (action.type) {
    case 'IS_PLAYING':
      return action.value;
    case 'TOGGLE_PLAYING':
      return !state;
    default:
      return state;
  }
}
