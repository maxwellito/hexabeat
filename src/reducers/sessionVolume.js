const sessionVolume = (state = .8, action) => {
  switch (action.type) {
    case 'VOLUME_UPDATE':
      return Math.max(0, Math.min(1, action.value))
    default:
      return state
  }
}

export default sessionVolume