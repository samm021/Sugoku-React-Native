import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import tailwind from 'tailwind-rn'
import Lose from '../components/Lose'
import Win from '../components/Win'
import { fetchBoard, validateOff } from '../store/actions/sudokuAction'
import { addWinner } from '../store/actions/winnersAction'

const Score = ({ navigation, route }) => {
  const { validate, loadingValidate, difficulty } = useSelector(state => state.sudoku)
  const { winners } = useSelector(state => state.winners)
  const { user } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    const newWinners = winners.map(winner => ({...winner}))
    if (validate === 'solved') {
      newWinners.push({
        id: winners.length + 1,
        user
      })
      dispatch(addWinner(newWinners))
    }
  }, [validate])

  const handlePlayAgain = () => {
    dispatch(fetchBoard(difficulty))
    dispatch(validateOff())
    navigation.navigate('Sudoku')
  }

  const handleCheckLeaderBoard = () => {
    navigation.navigate('LeaderBoard')
  }

  const handleGoHome = () => {
    dispatch(validateOff())
    navigation.navigate('Home')
  }

  if (loadingValidate) {
    return (
      <View style={tailwind('flex pt-20 h-full items-center bg-green-800')}>
        <Loading/>
        <Text style={tailwind('font-bold tracking-wider text-2xl text-white')}>ちょっと待ってく, {user}...</Text>
      </View>
    )
  } else {
    return (
      <View style={tailwind('container flex h-full items-center bg-green-800')}>
        { validate === 'unsolved'|| validate === 'broken'
          ? <> 
            <Text style={tailwind('text-3xl mt-20 font-bold tracking-wider text-white')}>またしてみて, {user}!</Text>
            <Lose/> 
            </>
          : <> 
            <Text style={tailwind('text-3xl mt-20 font-bold tracking-wider text-white')}>おめでとう, {user}!</Text>
            <Win/>
            </>
        }
        <View style={tailwind('mt-20')}>
        <TouchableOpacity onPress={handlePlayAgain} style={tailwind('bg-green-400 mx-2 rounded px-4 py-2')}>
          <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>play again 👀</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCheckLeaderBoard} style={tailwind('bg-yellow-400 mt-5 mb-2 mx-2 rounded px-4 py-2')}>
          <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>check leaderboard 🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('mt-5')} onPress={handleGoHome}>
          <Text style={tailwind('text-white text-sm font-semibold tracking-tight text-center')}>⬅️ Go Home</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Score
