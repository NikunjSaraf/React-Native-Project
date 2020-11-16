import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  Fab,
  Icon,
  List,
  ListItem,
  Button,
  Left,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  Container,
  Text,
  Spinner
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
  
  const [listSeason, setListSeason] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list'); 

    if (!storedValue) {
      setListSeason([])
    }

    const list = JSON.parse(storedValue);
    setListSeason(list);

    setLoading(false)
  }

  const deleteSeason = async (id) => {
    const newList = await listSeason.filter(list => list.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListSeason(newList);
  }

  const markComplete = async (id) => {
    const newArr = listSeason.map(list => {
      if (list.id == id) {
        list.isWatched = !list.isWatched
      }
      return list;
    })

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListSeason(newArr);
  }

  useEffect(() => {
    getList();  
  }, [isFocused])

  if (loading) {
    return (
      <Container>
        <Spinner color="#00b7c2" />
      </Container>
    )
  }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {listSeason.length == 0 ? (
          <Container style={styles.emptyContainer} >
            <H1 style={styles.heading}>
              WatchList is empty.Please add something to the watchlist.
              </H1>
          </Container>
        ) : (
            <Container style={styles.container}>
              <H1 style={styles.heading}>
                Next series to watch
                </H1>
              <List>
                {listSeason.map(season => (
                  <ListItem key={season.id} style={styles.listItem}>
                  <Left>
                      <Button
                        style={styles.actionButton}
                        danger
                        onPress={()=>deleteSeason(season.id)}
                      >
                      <Icon name="trash" active/>
                    </Button>
                      <Button
                        style={styles.actionButton}
                        primary
                        onPress={() => {
                          navigation.navigate('Edit',{season})
                        }}
                      >
                      <Icon active name="edit" type="Feather"/>
                    </Button>
                  </Left>
                  <Body>
                    <Title style={styles.seasonName}>{season.name} </Title>
                    <Text note>{season.totalSeason} season to watch</Text>
                  </Body>
                  <Right>
                      <CheckBox
                        checked={season.isWatched}
                        onPress={()=>markComplete(season.id)}
                      />
                  </Right>
                </ListItem>
               ))}
              </List>
            </Container>
        )}

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={()=>navigation.navigate('Add')}
        >
          <Icon name="add"/>
        </Fab>
        </ScrollView>
    )
}

export default Home;


const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
