import React from 'react'
import LottieView from 'lottie-react-native'


const Loading = () => {
  return (
    <>
      <LottieView source={require('../assets/Lottie/Loading.json')} autoPlay loop></LottieView>
    </>
  )
}

export default Loading
