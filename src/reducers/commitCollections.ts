import {CommitCollection} from '../models/Commit'

export interface CommitCollectionsAction {
  type: string;
  collection?: CommitCollection;
  collections?: CommitCollection[];
}

export function commitCollections (state:CommitCollection[] = [], action:CommitCollectionsAction): CommitCollection[] {
  switch (action.type) {
    case 'SET_COMMIT_COLLECTIONS':
      return action.collections
    case 'ADD_COMMIT_COLLECTION':
      return [...state, action.collection]
    case 'REMOVE_COMMIT_COLLECTION':
      state.splice(state.indexOf(action.collection), 1)
      return state
    default:
      return state
  }
}