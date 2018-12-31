import {RepositoryCollection} from '../models/GitRepository';

export interface RepositoryCollectionAction {
  type: string;
  collection?: RepositoryCollection;
}

export function repositoryCollection (state:RepositoryCollection = {}, action:RepositoryCollectionAction): RepositoryCollection {
  switch (action.type) {
    case 'SET_REPOSITORY_COLLECTION':
      return action.collection
    default:
      return state
  }
}