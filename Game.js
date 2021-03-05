import React from 'react'
import Sudoku from './stacks/Sudoku'
import Home from './stacks/Home'
import Score from './stacks/Score'
import LeaderBoard from './stacks/LeaderBoard'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Game = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Sudoku" component={Sudoku}/>
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Score" component={Score}/>
        <Stack.Screen options={{ headerShown: false }} name="LeaderBoard" component={LeaderBoard}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Game
