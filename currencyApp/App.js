import React, { useState } from 'react'
import { StyleSheet, Text, View ,ScrollView, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'

import Snackbar from 'react-native-snackbar';
const currencyPerRupee = {
  DOLLAR: 0.014,
  EURO: 0.012,
  POUND: 0.011,
  RUBEL: 0.93,
  AUSDOLLAR: 0.2,
  CANDOLLAR: 0.019,
  YEN: 1.54,
  DINAR: 0.0043,
  BITCOIN:0.000004
}

const App = () => {

  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);

  const currencyConverter = (currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please Enter a value',
        textColor: 'white',
        backgroundColor:'#EA7773'
      })
    }
    let result = parseFloat(inputValue) * currencyPerRupee[currency];
    setResult(result.toFixed(2));
  }

  return (
    <ScrollView
      backgroundColor="#1b262c"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic" >
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultValue}>{result}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Value"
            placeholderTextColor="#c1c1c1"
            value={inputValue}
            onChangeText={(input)=>setInputValue(input)}
          />
        </View>
        <View style={styles.convertButtonContainer}>
          {Object.keys(currencyPerRupee).map(currency => (
            <TouchableOpacity
              key={currency}
              style={styles.converterButton}
              onPress={() => {
                currencyConverter(currency)
              }}
            >
                <Text style={styles.text}>{currency}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1b262c'
  },
  resultContainer: {
    height: 70,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#bbe1fa',
    borderWidth:2
  },
  resultValue: {
    fontSize: 30,
    fontWeight: "bold",
    color:'#FFF'
  },
  inputContainer: {
    height: 70,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor:'#bbe1fa'
  },
  input: {
    fontSize: 30,
    color: '#FFF',
    textAlign:'center'
  },
  convertButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10
  },
  converterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '33.33%',
    borderColor: '#bbe1fa',
    borderWidth: 2,
    marginTop: 10,
    backgroundColor:'#0f4c75'
  },
  text: {
    color: '#FFF',
    fontSize:15
  }
})
