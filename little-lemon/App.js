import { StatusBar } from 'expo-status-bar';
import { OnboardingScreen } from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './screens/Profile';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from './redux/user/userSlice';
import { SplashScreen } from './screens/Splash';


const Stack = createNativeStackNavigator();


function App() {


  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)


  React.useEffect(() => {

    (async () => {
      try {
        if (!(user.isSignedIn)) {
          const result = await AsyncStorage.multiGet(["App_User_name", "App_User_email"]);
          if (result !== null) {
            userResult = {
              name: result[0][1],
              email: result[1][1]

            }
            dispatch(saveUser(userResult))

          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }


      } catch (e) {

        console.error(e)
      }
    })();
  }, [user.isLoading]);

  if (user.isLoading) {
    return <SplashScreen />
  }



  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>

        {user.isSignedIn ? (<Stack.Screen name="Profile" component={ProfileScreen} />

        )
          : (<Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
      </Stack.Navigator>
    </NavigationContainer>



  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>

  )
}
