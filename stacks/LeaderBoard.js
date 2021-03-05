import React from 'react'
import { View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { validateOff } from '../store/actions/sudokuAction'
import tailwind from 'tailwind-rn'

const LeaderBoard = ({ navigation }) => {
  const dispatch = useDispatch()
  const { winners } = useSelector(state => state.winners)

  const handleBack = () => {
    navigation.goBack()
  }

  const handleGoHome = () => {
    dispatch(validateOff())
    navigation.navigate('Home')
  }

  return (
    <ScrollView style={tailwind('bg-green-800')}>
      <View style={tailwind('container flex h-full items-center')}>
        <View>
          <Text style={tailwind('text-4xl mt-20 font-bold tracking-widest text-white')}>🏆 勝者 🏆</Text>
        </View>
        <View style={tailwind('w-11/12 items-center mt-10 flex flex-row flex-wrap justify-center')}>
            {
              winners.map(winner => {
                return(
                  <View key={winner.id} style={tailwind('bg-yellow-400 m-2 px-5 py-2 rounded-full')}>
                    <Text style={tailwind('text-white text-xs tracking-wider font-bold')}>
                      {winner.user}
                    </Text>
                  </View>
                )
              })
            }
        </View>
        <View style={tailwind('mt-10')}>
          <TouchableOpacity onPress={handleBack} style={tailwind('bg-blue-400 rounded px-6 py-2')}>
            <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tailwind('mt-5')} onPress={handleGoHome}>
            <Text style={tailwind('text-white text-sm font-semibold tracking-tight text-center')}>⬅️ Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default LeaderBoard
