import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Game from './Game'

const App = () => {
  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  )
}

export default App
