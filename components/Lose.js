import React from 'react'
import LottieView from 'lottie-react-native'

const Lose = () => {
  return (
    <>
      <LottieView style={{width:'50%', marginTop:'10%'}} source={require('../assets/Lottie/Lose.json')} autoPlay loop></LottieView>
    </>
  )
}

export default Lose
