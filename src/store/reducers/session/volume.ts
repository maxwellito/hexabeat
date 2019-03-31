export interface VolumeAction {
  type: string;
  value: number;
}

export function volume(state: number = 0.75, action: VolumeAction): number {
  switch (action.type) {
    case 'SET_VOLUME':
      return Math.max(0, Math.min(1, action.value));
    default:
      return state;
  }
}
