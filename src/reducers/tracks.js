const tracks = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRACKS':
      return action.tracks
    case 'ADD_TRACK':
      return [...state, action.track]
    case 'REMOVE_TRACK':
      state.splice(state.indexOf(action.track), 1)
      return state
    default:
      return state
  }
}

export default tracks