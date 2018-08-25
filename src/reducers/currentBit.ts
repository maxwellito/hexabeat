export interface CurrentBitAction {
  type: string;
  value: number;
}

export function currentBit (state:number = 0, action:CurrentBitAction):number {
  switch (action.type) {
    case 'SET_CURRECT_BIT':
      return action.value
    default:
      return state
  }
}