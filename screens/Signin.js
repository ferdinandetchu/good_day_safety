
import { ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import InviteInput from '../components/InviteInput.js';
import { useState, useContext } from 'react';
import { IsLoading, UserContext } from '../App'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebaseConfig.js'

export default function Signin({navigation}) {
  const {user, setUser} = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {isLoading, setIsLoading} = useContext(IsLoading)

  const handelSignIn = () => {
    setIsLoading(true)
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setUser(userCredential.user);
      setIsLoading(false)
      setErrorMessage('')
      navigation.navigate('Module')
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
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
        {isLoading && <ActivityIndicator color={'#053095'}/> }
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }
				<TextInput keyboardType="email-address" style={styles.textInput} value={email} placeholder="Email" onChangeText={tetx => setEmail(tetx)} />
				<TextInput secureTextEntry style={styles.textInput} value={password} placeholder="Password" onChangeText={tetx => setPassword(tetx)} />
				<TouchableOpacity style={styles.loginBtn} onPress={handelSignIn}>
          <Text style={{color: "white"}}>LOGIN</Text>
				</TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: "white"}}>SIGNUP</Text>
				</TouchableOpacity>
				<Text style={styles.orText}>OR</Text>
				<Text>Enter Invitation Code</Text>
				<InviteInput navigation={navigation} />
			</View>
      </View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  topText: {
    color: '#053095',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 80
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
    signUpBtn: {
      backgroundColor: '#3e62cd',
      textAlign: 'center',
      borderRadius: 30,
      paddingHorizontal: 120,
      paddingVertical: 10,
      color: 'white',
      marginVertical: 6,
    },
  orText: {
    marginTop: 20,
    fontWeight: 'bold',
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
