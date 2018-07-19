const selectedTrack = (state = -1, action) => {
  switch (action.type) {
    case 'SELECT_TRACK':
      return action.value
    case 'RELEASE_TRACK':
      return -1
    default:
      return state
  }
}

export default selectedTrack