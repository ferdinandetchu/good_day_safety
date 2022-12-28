
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import InviteInput from '../components/InviteInput.js';
import { useState, useContext } from 'react';
import { UserContext } from '../App'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

export default function Signin({navigation}) {
  const {user, setUser} = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handelSignIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setUser(userCredential.user);
      navigation.navigate('Module')
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      errorCode = error.code.split('/')
      setErrorMessage(errorCode[1]);
      console.log(error.code)
    });
  }
  
  const handelPinSignIn = async () => {
    // Initialize Cloud Firestore and get a reference to the service
    const db =  await getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    // console.log(querySnapshot)
  }
  // handelPinSignIn()
  // console.log(email)
  return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
				{/* <Text style={styles.signinText}>SIGN IN</Text> */}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }
				<TextInput keyboardType="email-address" style={styles.textInput} value={email} placeholder="Email" onChangeText={tetx => setEmail(tetx)} />
				{/* <Text style={styles.labelText}>Password</Text> */}
				<TextInput secureTextEntry style={styles.textInput} value={password} placeholder="Password" onChangeText={tetx => setPassword(tetx)} />
				<View style={styles.signUpBtn}>
					<Button title="LOGIN" onPress={handelSignIn} />
				</View>
				{/* <View style={styles.signUpBtn}>
					<Button color='red' title="Sign Up" onPress={() =>
						navigation.navigate('Signup') } 
					/>
				</View> */}
				<Text style={styles.orText}>OR</Text>
				<Text>Enter Invitation Code</Text>
				<InviteInput navigation={navigation} />
			</View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 70
  },
  textInput: {
    borderWidth: 1,
    width: '75%',
    padding: 4,
    marginBottom: 10
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
    marginTop: 30,
    width: '50%',
  },
  orText: {
    marginTop: 20,
    fontWeight: 'bold',
  }
});
