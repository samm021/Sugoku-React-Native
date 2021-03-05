const initState = {
  winners: [
    {
      id: 1,
      user: 'Alpha'
    },
    {
      id: 2,
      user: 'Beta'
    },
    {
      id: 3,
      user: 'Omega'
    },
    {
      id: 4,
      user: 'Nanang'
    }
  ]
}

const winnersReducer = (state=initState, action) => {
  switch (action.type) {
    case 'ADD_WINNER':
      return {
        ...state,
        winners: action.payload
      }
    default:
      return state
  }
}

export default winnersReducer