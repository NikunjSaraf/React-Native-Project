import React, { useEffect, useState } from 'react'
import { StyleSheet,  ScrollView } from 'react-native'

import { Container, Form, Item, Input, Button, H1, Text } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';


const Edit = ({navigation,route}) => {

  const [name, setName] = useState('');
  const [totalSeason, setTotalSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async () => {
    if (!name && !totalSeason) {
      return Toast.show({
          text: 'Please enter all the fields',
          buttonText: 'Okay',
          position:'bottom'
        })
    }

    const storedValue = await AsyncStorage.getItem('@season_list');
    const list = await JSON.parse(storedValue);

    list.map(list => {
      if (list.id == id) {
        list.name = name
        list.totalSeason=totalSeason
      }
      return list;
    })

    await AsyncStorage.setItem('@season_list', JSON.stringify(list));

    navigation.navigate('Home');
  }

  useEffect(() => {
    const { season } = route.params;
    const { id, name, totalSeason } = season;

    setId(id);
    setName(name);
    setTotalSeason(totalSeason);
    
  }, [])

    return (
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <H1 style={styles.heading}>
            Update the watch list
          </H1>
          <Form>
            <Item rounded style={styles.formItem}>
              <Input placeholder="Season name" style={{ color: '#FFF' }}
                value={name}
                onChangeText={(val)=>setName(val)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input placeholder="Total Number of Season" style={{ color: '#FFF' }}
                keyboardType="numeric"
                value={totalSeason}
                onChangeText={(val)=>setTotalSeason(val)}
              />
            </Item>
            <Button rounded block onPress={update}>
                <Text style={{color:'#eee'}}>Update</Text>
            </Button>
          </Form>
        </ScrollView>
       </Container>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
})
