import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../constants'

const BackGroundImage =()=> {
  return (
    <ImageBackground source={images.logo} resizeMode="cover" style={styles.image} >
        
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
      },
})
export default BackGroundImage;

