export interface HelpAction {
  type: string;
  help: boolean;
}

export function help(state = false, action?: HelpAction): boolean {
  switch (action.type) {
    case 'TOGGLE_HELP':
      return action.help;
    default:
      return state;
  }
}
