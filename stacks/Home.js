import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setDifficulty, fetchBoard } from '../store/actions/sudokuAction'


const Home = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [userGuard, setUserGuard] = useState(false)
  const dispatch = useDispatch()

  const handlePress = (payload) => {
    if (user.length >= 3 && user.length <= 10) {
      setUserGuard(false)
      dispatch(setDifficulty(payload))
      dispatch(fetchBoard(payload))
      navigation.navigate('Sudoku', {
        user
      })
      setUser('')
    } else {
      setUserGuard(true)
    }
  }

  return (
    <SafeAreaView style={tailwind('flex h-full items-center bg-green-800')}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={tailwind('flex mt-20 w-full items-center justify-center')}>
        <Text style={tailwind('text-4xl font-bold text-white tracking-widest')}>数独</Text>
        <View style={tailwind('flex mt-40 w-80 bg-white rounded')}>
          <TextInput
          value={user}
          onChangeText={(text) => setUser(text)}
          placeholder={'insert username'}
          style={tailwind('p-2 text-gray-500 text-center font-bold')}/>
        </View>
          {
            userGuard 
            ? <Text style={tailwind('mt-3 text-white tracking-tighter text-sm')}>please input username between 3 to 10 characters</Text>
            : <Text style={tailwind('mt-3 text-white tracking-tighter text-sm')}></Text>
          }
      </TouchableWithoutFeedback>
        <View style={tailwind('mt-6 flex flex-row w-80 justify-center')}>
          <TouchableOpacity onPress={() => handlePress('easy')} style={tailwind('bg-green-400 rounded px-6 mx-1 py-2')}>
            <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>easy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('medium')} style={tailwind('bg-yellow-400 rounded mx-1 px-6 py-2')}>
            <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>medium</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('hard')} style={tailwind('bg-red-400 rounded px-6 mx-1 py-2')}>
            <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>hard</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home
