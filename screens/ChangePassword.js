
import { ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useState, useContext } from 'react';
import { IsLoading } from '../App'

import { getAuth, updatePassword } from "firebase/auth";
import { app } from '../firebaseConfig.js'

export default function ChangePassword({navigation}) {

  // const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {isLoading, setIsLoading} = useContext(IsLoading)

  const handelChangePassword = () => {
    setIsLoading(true)
    const auth = getAuth(app);
		const user = auth.currentUser;

    console.log(user)
    updatePassword(user, password)
    .then(() => {
      alert('Password Updated')
      navigation.navigate('Signin')
      setIsLoading(false)
      setErrorMessage('');
      // ...
    })
    .catch((error) => {
      setIsLoading(false)
      let errorCode = error.code;
      errorCode = error.code.split('/')
      setErrorMessage(errorCode[1]);
      console.log(error.code)
    });
  }
  
  return (
		<ScrollView style={{backgroundColor: 'white',}}>
      <View style={{justifyContent: 'center'}}>
			<View style={styles.container}>
        {isLoading && <ActivityIndicator color={'#053095'}/> }
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }
				{/* <TextInput keyboardType="email-address" style={styles.textInput} value={email} placeholder="New Email" onChangeText={tetx => setEmail(tetx)} /> */}
				<TextInput secureTextEntry style={styles.textInput} value={password} placeholder="New Password" onChangeText={tetx => setPassword(tetx)} />
				<TouchableOpacity style={styles.loginBtn} onPress={handelChangePassword}>
          <Text style={{color: "white", textAlign: 'center'}}>Add</Text>
				</TouchableOpacity>
			</View>
      </View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
		alignItems: 'stretch',
		margin: 20,
  },
	column: {
		flex: 1,
		justifyContent: 'space-around',
		paddingVertical: '10%',
		backgroundColor: 'white'
	},
  textInput: {
    borderWidth: 1,
    borderColor: '#3e62cd',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: "black",
    backgroundColor: '#c2d5f5'
  },
  errorText: {
    color: 'red',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
    borderRadius: 10
  },
  loginBtn: {
    backgroundColor: '#053095',
    textAlign: 'center',
    borderRadius: 30,
    paddingHorizontal: 120,
    paddingVertical: 10,
    color: 'white'
    // width: 200
  }
});
