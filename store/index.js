import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import sudokuReducer from './reducers/sudokuReducer'
import winnersReducer from './reducers/winnersReducer'

const rootReducer = combineReducers({
  sudoku: sudokuReducer,
  winners: winnersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store