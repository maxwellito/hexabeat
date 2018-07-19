const commitCollections = (state = [], action) => {
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

export default commitCollections