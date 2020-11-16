import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const App = () => {

  const [randomColor, setRandomColor] = useState('rgb(32,0,126)')

  const changeBG = () => {
    let color = "rgb(" +
      Math.floor(Math.random() * 256) + "," +
      Math.floor(Math.random() * 256) + "," +
      Math.floor(Math.random() * 256) +
      ")";
    setRandomColor(color);
  }

  const resetColor = () => {
    let color="rgb(" +
      Math.floor(Math.random() * 0) + "," +
      Math.floor(Math.random() * 0) + "," +
      Math.floor(Math.random() * 0) +
      ")";
    setRandomColor(color);
  }

  return (
    <>
      <StatusBar backgroundColor={randomColor} />
    <View style={[styles.container, { backgroundColor: randomColor }]}>
      <TouchableOpacity onPress={changeBG}>
          <Text style={styles.text}>Tap Me</Text>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetColor}>
            <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
        
      </View>
      </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    backgroundColor: '#BB2CD9',
    paddingVertical: 10,
    paddingHorizontal: 40,
    color: '#FFFFFF',
    borderRadius: 15,
    
  }
})
