import React,{useEffect} from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import { connect, useDispatch } from 'react-redux';
import AddPost from './screens/AddPost';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { IS_AUTHENTICATED, SET_USER } from './redux/action/types';
import database from '@react-native-firebase/database';
import { requestPermission } from './utils/AskPermission';
import EmptyContainer from './components/EmptyContainer';
import CustomHeader from './layout/CustomHeader';

const Stack = createStackNavigator();

const App = ({ authState }) => {
  
  const dispatch = useDispatch();

  const onAuthStateChange = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload:true,
      })

      console.log(user._user.uid);

      database().
        ref(`/users/${user._user.uid}`).
        on('value', (snapshot) => {
          console.log('User Details', snapshot.val())
          dispatch({
            type: SET_USER,
            payload:snapshot.val()
          })
        })
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload:false
      })
    }
  }

  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, [])

  if (authState.loading) {
   return <EmptyContainer/>
  }

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header:(props)=><CustomHeader {...props} />
          }}
        >
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={ Home }/>
              <Stack.Screen name="AddPost" component={ AddPost }/>
            </>
          ) : (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  authState:state.auth  
})

export default connect(mapStateToProps)(App)

