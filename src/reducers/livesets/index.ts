import { Liveset } from 'models/Liveset';

export interface LivesetsAction {
  type: string;
  liveset: Liveset;
}

export function livesets(
  state: Map<string, Liveset> = new Map(),
  action?: LivesetsAction
): Map<string, Liveset> {
  let { liveset } = action,
    key = `${liveset.name}.${liveset.version}`;

  switch (action.type) {
    case 'ADD_LIVESET':
      state.set(key, liveset);
      return state;
    case 'REMOVE_LIVESET':
      state.delete(key);
      return state;
    default:
      return state;
  }
}
