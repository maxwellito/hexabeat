import { Liveset } from 'models/Liveset';

export interface LivesetsAction {
  type: string;
  liveset: Liveset;
}

export function livesets(
  state: Liveset[] = [],
  action?: LivesetsAction
): Liveset[] {
  switch (action.type) {
    case 'ADD_LIVESET':
      return [...state, action.liveset];
    case 'REMOVE_LIVESET':
      state.splice(state.indexOf(action.liveset), 1);
      return [...state];
    default:
      return state;
  }
}
