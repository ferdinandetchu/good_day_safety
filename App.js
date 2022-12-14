import { StatusBar } from 'expo-status-bar';

import { Text } from 'react-native';

import {Icon} from 'react-native-elements'

import Signin from './screens/Signin.js';
import Signup from './screens/Signup.js';

import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from './firebaseConfig'

import Module from './screens/Module.js';
import Settings from './screens/Settings';
import OnboardOne from './screens/OnboardOne'
import OnboardTwo from './screens/OnboardTwo'
import OnboardThree from './screens/OnboardThree'
import OnboardFour from './screens/OnboardFour'
import OnboardFive from './screens/OnboardFive'
import FinalPage from './screens/FinalPage'
import Welcome from './screens/Welcome'
import CreateId from './screens/CreateId.js';
import SearchId from './screens/SearchId.js';
import DeleteId from './screens/DeleteId.js';
import ChangeEmail from './screens/ChangeEmail.js';
import ChangePassword from './screens/ChangePassword';
import ViewReport from './screens/ViewReport';

const Stack = createNativeStackNavigator();

export const UserContext = createContext();
export const ReportContext = createContext();
export const CurrentReportIdContext = createContext();
export const CurrentAdmin = createContext();
export const IsLoading = createContext();

let data = []

export default function App() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState(Array);
  const [currentReportId, setCurrentReportId] = useState(null)
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handelGetReports = async() =>{
		setIsLoading(true)
		const db =  await getFirestore(app);
			try {
				const querySnapshot = await getDocs(collection(db, "Users"));
        // console.log(querySnapshot)
				querySnapshot.forEach((doc) => {
          data.push({id: doc.id, data: doc.data()})
				});
        setReports({data})
				// console.log(data)
				setIsLoading(false)
			} catch (error) {
        setIsLoading(false)
				console.log(error)
			}
	}

  useEffect(() => {handelGetReports()}, [!data])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <CurrentAdmin.Provider value={{currentAdmin, setCurrentAdmin}}>
        <CurrentReportIdContext.Provider value={{currentReportId, setCurrentReportId}}>
        <ReportContext.Provider value={{data, setReports}}>
          <IsLoading.Provider value={{isLoading, setIsLoading}}>
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
                    // title: '1',
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
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{ 
                    title: 'Setting',
                  }}
                />
                <Stack.Screen
                  name="CreateId"
                  component={CreateId}
                  options={{ 
                    title: 'Create Invite Code',
                  }}
                />
                <Stack.Screen
                  name="SearchId"
                  component={SearchId}
                  options={{ 
                    title: 'Search Invite Code',
                  }}
                />
                <Stack.Screen
                  name="DeleteId"
                  component={DeleteId}
                  options={{ 
                    title: 'Delete Invite Code',
                  }}
                />
                <Stack.Screen
                  name="ChangeEmail"
                  component={ChangeEmail}
                  options={{ 
                    title: 'Change Email',
                  }}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={{ 
                    title: 'Change Password',
                  }}
                />
                 <Stack.Screen
                  name="ViewReport"
                  component={ViewReport}
                  options={{ 
                    title: 'View Report',
                  }}
                />
              </Stack.Navigator>
              <StatusBar style='auto' />
            </NavigationContainer>
          </IsLoading.Provider>
        </ReportContext.Provider>
        </CurrentReportIdContext.Provider>
      </CurrentAdmin.Provider>
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
