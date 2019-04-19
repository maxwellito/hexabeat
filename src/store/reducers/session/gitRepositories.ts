// import { RepositoryCollection } from 'models/GitRepository';
import { Repository } from 'models/GitRepository';

export interface GitRepositoriesAction {
  type: string;
  collection?: Map<string, Repository>;
}

export function gitRepositories(
  state: Map<string, Repository> = new Map(),
  action: GitRepositoriesAction
): Map<string, Repository> {
  switch (action.type) {
    case 'SET_REPOSITORIES_COLLECTION':
      return action.collection;
    default:
      return state;
  }
}
