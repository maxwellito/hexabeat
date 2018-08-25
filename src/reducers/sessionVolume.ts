export interface SessionVolumeAction {
  type: string;
  value: number;
}

export function sessionVolume (state:number = .8, action:SessionVolumeAction):number {
  switch (action.type) {
    case 'VOLUME_UPDATE':
      return Math.max(0, Math.min(1, action.value))
    default:
      return state
  }
}