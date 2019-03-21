import { RepositoryCollection } from 'models/GitRepository';

export interface GitRepositoriesAction {
  type: string;
  collection?: RepositoryCollection;
}

export function gitRepositories(
  state: RepositoryCollection = {},
  action: GitRepositoriesAction
): RepositoryCollection {
  switch (action.type) {
    case 'SET_REPOSITORIES_COLLECTION':
      return action.collection;
    default:
      return state;
  }
}
