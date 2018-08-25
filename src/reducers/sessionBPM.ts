export interface SessionBpmAction {
  type: string;
  value: number;
}

export function sessionBPM (state:number = 120, action?:SessionBpmAction):number {
  switch (action.type) {
    case 'BPM_UPDATE':
      return Math.max(80, Math.min(200, action.value))
    default:
      return state
  }
}