import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import tailwind from 'tailwind-rn';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { validateBoard, solveBoard, fetchBoard } from '../store/actions/sudokuAction'
import Loading from '../components/Loading'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CountDown from 'react-native-countdown-component'


const Sudoku = ({ navigation, route }) => {
  const { user } = route.params
  const { board, loadingFetchBoard, askForSolution, difficulty } = useSelector(state => state.sudoku)
  const [answerBoard, setAnswerBoard] = useState([])
  const [timer, setTimer] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setAnswerBoard(board?.map(item => [...item]))
  }, [board])

  const handleValidate = () => {
    dispatch(validateBoard({ board: answerBoard }))
    setTimer(false)
    navigation.navigate('Score', {
      user
    })
  }

  const handleSolve = () => {
    if (!askForSolution) {
      dispatch(solveBoard({board: board}))
    }
  }
  
  const handleNewBoard = () => {
    dispatch(fetchBoard(difficulty))
  }
  
  const handleChange = (val, idxRow, idxCol) => {
    answerBoard[idxRow][idxCol] = +val
  }

  const handleStart = () => {
    setTimer(true)
  }

  const handleTimeout = () => {
    handleValidate()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  if (loadingFetchBoard) {
    return (
      <View style={tailwind('flex pt-20 h-full items-center bg-green-800')}>
        <Loading/>
        <Text style={tailwind('font-bold tracking-wider text-2xl text-white')}>ゲームしましょう, {user}!</Text>
      </View>
    )
  } else {
    return (
      <View style={tailwind('flex h-full items-center bg-green-800')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={tailwind('flex items-center justify-center')}>
        <View>
          { timer && !askForSolution
          ? <View style={tailwind('mt-20 flex flex-row')}>
            <Text style={tailwind('mt-2 mx-2 text-white text-sm tracking-widest')}>数えるよ...</Text>
              <CountDown
              until={120}
              onFinish={() => handleTimeout()}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#34d399'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
              size={12}/> 
            </View>
          : <Text style={tailwind('text-4xl mt-20 font-bold text-white tracking-widest')}>数独</Text>
          }
        </View>
          <View style={tailwind('mt-4 container flex flex-col flex-nowrap')}>
            {
              answerBoard.map((row, idxRow)=> {
                return (
                    <View key={idxRow} 
                    style={tailwind(`${(idxRow + 1) % 3 == 0  ? 'border-b-8 border-t-0 border-l-2 border-r-2 border-green-800' : 'border-b-2 border-t-0 border-l-2 border-r-2 border-green-800'} 
                    flex flex-row`)}>
                      {
                        row.map((col, idxCol) => {
                          return (
                            <View key={idxCol}
                            style={tailwind(`flex w-10 
                            ${col === 0 ? 'bg-white' : 'bg-blue-100'} 
                            ${(idxCol + 1) % 3  == 0 && idxCol + 1 !== 9 ? 'border-r-4 border-t-0 border-l-2 border-b-2 border-green-800' : 'border-b-2 border-t-0 border-l-2 border-r-2 border-green-800'} `)}>
                              <View style={tailwind('flex items-center')}>
                                <TextInput
                                editable={ col === 0 ? true : false}
                                style={tailwind('p-2 text-red-400 font-bold')}
                                maxLength={1}
                                keyboardType='numeric'
                                onChangeText={(val) => handleChange(val, idxRow, idxCol)}
                                >{
                                  timer 
                                  ?  col === 0 ? '' : col 
                                  :
                                  ''
                                }</TextInput>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                )
              })
            }
          </View>
        </TouchableWithoutFeedback>
        {
          timer 
          ? <View style={tailwind('flex')}>
              <TouchableOpacity onPress={handleValidate} style={tailwind('bg-blue-400 mt-5 mx-2 rounded px-6 py-2')}>
                  <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>submit 👌🏼</Text>
              </TouchableOpacity>
              <View style={tailwind('flex flex-row')}>
                <TouchableOpacity onPress={handleNewBoard} style={tailwind('bg-yellow-400 mt-3 mx-2 rounded px-6 py-2')}>
                  <Text style={tailwind('text-white text-sm font-bold tracking-widest')}>new board 📈</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBack} style={tailwind('bg-red-500 mt-3 mx-2 rounded px-6 py-2')}>
                  <Text style={tailwind('text-white text-sm font-bold tracking-widest')}>quit 💀</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleSolve} style={tailwind('bg-gray-400 mt-3 mx-2 rounded px-6 py-2')}>
                  <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>give up 🏳</Text>
              </TouchableOpacity>
            </View> 
          : <View style={tailwind('flex')}>
              <TouchableOpacity onPress={handleStart} style={tailwind('bg-green-400 mt-5 mx-2 rounded px-6 py-2')}>
                  <Text style={tailwind('text-white text-sm font-bold tracking-widest text-center')}>start 🏁</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

export default Sudoku
