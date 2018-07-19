const currentBit = (state = 0, action) => {
  switch (action.type) {
    case 'SET_CURRECT_BIT':
      return action.value
    default:
      return state
  }
}

export default currentBit