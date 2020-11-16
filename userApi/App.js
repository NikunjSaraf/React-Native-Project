import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import { Button, Spinner } from 'native-base';
import User from './components/User';

const App = () => {

  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const {data} = await axios.get('https://randomuser.me/api/');
      const details = data.results[0];
      setDetails(details);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [])

  if (!details) {
    return (
      <View style={styles.container}>
        <Spinner/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <User details={details} />
        <Button
          rounded
          onPress={()=>fetchDetails()}
          style={styles.button}
        >
          <Text>New User</Text>
          </Button>
      </View>
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
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
    alignSelf:'center'
  }
})
