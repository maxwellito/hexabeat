import { Liveset } from 'models/Liveset';

export interface LivesetAction {
  type: string;
  value?: Liveset;
}

export function liveset(
  state: Liveset = null,
  action?: LivesetAction
): Liveset {
  switch (action.type) {
    case 'SET_LIVESET':
      return action.value;
    case 'RELEASE_LIVESET':
      return null;
    default:
      return state;
  }
}
