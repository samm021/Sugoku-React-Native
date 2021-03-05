const addWinner = (payload) => {
  return {
    type: 'ADD_WINNER',
    payload
  }
}

export {
  addWinner
}