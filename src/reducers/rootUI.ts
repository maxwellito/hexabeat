export interface rootUIAction {
  type: string;
  help: boolean;
}

export function rootUI(state = false, action?: rootUIAction): boolean {
  switch (action.type) {
    case 'TOGGLE_HELP':
      return action.help;
    default:
      return state;
  }
}
