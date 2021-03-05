import React from 'react'
import LottieView from 'lottie-react-native'

const Win = () => {
  return (
    <>
      <LottieView style={{width:'50%', marginTop:'10%'}} source={require('../assets/Lottie/Win.json')} autoPlay loop></LottieView>
    </>
  )
}

export default Win
