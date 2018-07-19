const sessionBPM = (state = 120, action) => {
  switch (action.type) {
    case 'BPM_UPDATE':
      return Math.max(80, Math.min(200, action.value))
    default:
      return state
  }
}

export default sessionBPM