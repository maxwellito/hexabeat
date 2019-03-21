export interface BpmAction {
  type: string;
  value: number;
}

export function bpm(state: number = 120, action?: BpmAction): number {
  switch (action.type) {
    case 'SET_BPM':
      return Math.max(80, Math.min(200, action.value));
    default:
      return state;
  }
}
