import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View,Pressable } from 'react-native'

import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

const App = () => {
  const [uri, setUri] = useState(DiceOne)
  const [image, setImage] = useState(DiceOne)

  const playGame = () => {
    let randomNumber = Math.floor(Math.random() * 6)+1;
    let ranNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setUri(DiceOne)
        break;
      case 2:
        setUri(DiceTwo)
        break;
      case 3:
        setUri(DiceThree)
        break;
      case 4:
        setUri(DiceFour)
        break;
      case 5:
        setUri(DiceFive)
        break
      case 6:
        setUri(DiceSix)
        break
      default:
        setUri(DiceOne)
        break;
      
    }
    switch (ranNumber) {
      case 1:
        setImage(DiceOne)
        break;
      case 2:
        setImage(DiceTwo)
        break;
      case 3:
        setImage(DiceThree)
        break;
      case 4:
        setImage(DiceFour)
        break;
      case 5:
        setImage(DiceFive)
        break
      case 6:
        setImage(DiceSix)
        break
      default:
        setImage(DiceOne)
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={uri} style={styles.image} />
      <Image source={image} style={styles.image}/>
      <Pressable onPress={playGame}>
        <Text style={styles.text}>Play Game</Text>
      </Pressable>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#222831'
  },
  image: {
    height: 200,
    width: 200,
    marginBottom:30
  },
  text: {
    fontSize: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    color: '#F2A365',
    borderRadius: 15,
    borderColor: '#30475E',
    borderWidth: 5,
    fontWeight:'bold'
  }
})
