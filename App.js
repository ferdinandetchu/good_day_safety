import { StatusBar } from 'expo-status-bar';

import { Text } from 'react-native';

import {Icon} from 'react-native-elements'

import Signin from './screens/Signin.js';
import Signup from './screens/Signup.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createContext, useState } from 'react';

import Module from './screens/Module.js';
import Settings from './screens/Settings';
import OnboardOne from './screens/OnboardOne'
import OnboardTwo from './screens/OnboardTwo'
import OnboardThree from './screens/OnboardThree'
import OnboardFour from './screens/OnboardFour'
import OnboardFive from './screens/OnboardFive'
import FinalPage from './screens/FinalPage'
import Welcome from './screens/Welcome'

const Stack = createNativeStackNavigator();
export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ title: 'SignIn' }}
          />
          <Stack.Screen
            name="OnboardOne"
            component={OnboardOne}
            options={{ 
              title: '1',
            }}
          />
          <Stack.Screen
            name="OnboardTwo"
            component={OnboardTwo}
            options={{ 
              title: '2',
            }}
          />
          <Stack.Screen
            name="OnboardThree"
            component={OnboardThree}
            options={{ 
              title: '3',
            }}
          />
          <Stack.Screen
            name="OnboardFour"
            component={OnboardFour}
            options={{ 
              title: '4',
            }}
          />
          <Stack.Screen
            name="OnboardFive"
            component={OnboardFive}
            options={{ 
              title: '5',
            }}
          />
          <Stack.Screen
            name="FinalPage"
            component={FinalPage}
            options={{ 
              title: 'FinalPage',
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ 
              title: 'Welcome',
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'SignUp' }}
          />
          <Stack.Screen
            name="Module"
            component={Module}
            options={{ 
              title: 'Logout',
              headerRight: () => (
                <Text>Create Module</Text>
              ),
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ 
              title: 'Back',
              headerRight: () => (
                <Text>Module 1</Text>
              ),
            }}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'center',
//     margin: 60
//   },
// });
