import axios from '../../api/axios'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&')

const setDifficulty = (payload) => {
  return {
    type: 'SET_DIFFICULTY',
    payload
  }
}

const fetchingBoard = () => {
  return {
    type: 'FETCHING_BOARD'
  }
}

const fetchedBoard = (payload) => {
  return {
    type: 'FETCHED_BOARD',
    payload
  }
}

const fetchBoardError = (payload) => {
  return {
    type: 'FETCH_BOARD_ERROR',
    payload
  }
}

const loadingValidate = () => {
  return {
    type: 'LOADING_VALIDATE'
  }
}

const errorValidate = (payload) => {
  return {
    type: 'ERROR_VALIDATE',
    payload
  }
}

const setValidate = (payload) => {
  return {
    type: 'VALIDATE',
    payload
  }
}

const askSolution = (payload) => {
  return {
    type: 'ASK_SOLUTION',
    payload
  }
}

const validateOff = () => {
  return {
    type: 'VALIDATE_OFF'
  }
}

const fetchBoard = (payload) => {
  return async dispatch => {
    try {
      dispatch(fetchingBoard())
      const res = await axios({
        method: 'GET',
        url: `/board?difficulty=${payload}`,
      })
      setDifficulty(payload)
      dispatch(fetchedBoard(res.data.board))
    }
    catch (err) {
      console.log(err)
      dispatch(fetchBoardError(err))
    } 
  }
}

const validateBoard = (payload) => {
  return async dispatch => {
    try {
      dispatch(loadingValidate())
      const res = await axios({
        method: 'POST',
        url: '/validate',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: encodeParams(payload)
      })
      dispatch(setValidate(res.data.status))
    }
    catch (err) {
      dispatch(errorValidate(err))
    }
  }
}

const solveBoard = (payload) => {
  return async dispatch => {
    try {
      dispatch(fetchingBoard())
      const res = await axios({
        method: 'POST',
        url: '/solve',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: encodeParams(payload)
      })
      dispatch(askSolution(res.data.solution))
    }
    catch (err) {
      dispatch(fetchBoardError(err))
    }
  }
}

export {
  setDifficulty,
  fetchingBoard,
  fetchedBoard,
  fetchBoardError,
  fetchBoard,
  validateBoard,
  loadingValidate,
  errorValidate,
  setValidate,
  solveBoard,
  askSolution,
  validateOff
}