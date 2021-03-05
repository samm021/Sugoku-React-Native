const initState = {
  board: [],
  difficulty: '',
  loadingFetchBoard: false,
  errorFetchBoard: null,
  validate: null,
  loadingValidate: false,
  errorValidate: null,
  askForSolution: false
}

const sudokuReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload
      }
    case 'FETCHING_BOARD':
      return {
        ...state,
        loadingFetchBoard: true
      }
    case 'FETCHED_BOARD':
      return {
        ...state,
        loadingFetchBoard: false,
        errorFetchBoard: null,
        askForSolution: false,
        board: action.payload
      }
    case 'FETCH_BOARD_ERROR':
      return {
        ...state,
        loadingFetchBoard: false,
        errorFetchBoard: action.payload
      }
    case 'VALIDATE':
      return {
        ...state,
        loadingValidate: false,
        errorValidate: null,
        validate: action.payload
      }
    case 'LOADING_VALIDATE':
      return {
        ...state,
        loadingValidate: true
      }
    case 'ERROR_VALIDATE':
      return {
        ...state,
        errorValidate: action.payload
      }
    case 'ASK_SOLUTION':
      return {
        ...state,
        loadingFetchBoard: false,
        errorFetchBoard: null,
        askForSolution: true,
        board: action.payload
      }
    case 'VALIDATE_OFF':
      return {
        ...state,
        validate: null
      }
    default:
      return state
  }
}

export default sudokuReducer