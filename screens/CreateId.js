
import { ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useState, useContext } from 'react';
import { IsLoading, UserContext } from '../App'

import { getFirestore,  doc, setDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

export default function CreateId({navigation}) {
  const {user, setUser} = useContext(UserContext)

  const [inviteCode, setInviteCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {isLoading, setIsLoading} = useContext(IsLoading)

  const handelCreatId = async() => {
    setIsLoading(true)
		// Initialize Cloud Firestore and get a reference to the service
		const db =  await getFirestore(app);

    let minm = 100000;
    let maxm = 999999;
		const ivCode = Math.floor(Math.random() * (maxm - minm + 1)) + minm
		let data = {user: [user.email], comments: '', condition: '', favorite: false, photo: '', location: {projectName: '', floorLevel: '', locationArea: ''}, }

    // console(auth.currentUser)
		try {
			await setDoc(doc(db, "Users", `${ivCode}`), data);
			setInviteCode(ivCode);
			setIsLoading(false)
			alert('New Invite Created')
		} catch (e) {
			console.error("Error adding document: ", e);
			setIsLoading(false)
		}
  }
  
  return (
		<ScrollView style={{backgroundColor: 'white',}}>
      <View style={{justifyContent: 'center'}}>
			<View style={styles.container}>
        {isLoading && <ActivityIndicator color={'#053095'}/> }
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }
				<Text style={{paddingVertical: 50, borderWidth: 1, width: '100%', marginVertical: 10, borderRadius: 4, borderColor: '#3e62cd', textAlign: 'center'}}>{inviteCode}</Text>
				<TouchableOpacity  onPress={handelCreatId}>
          <Text style={styles.loginBtn}>Create ID</Text>
				</TouchableOpacity>
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
    marginTop: 30,
    width: '50%',
  },
  orText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: '#053095',
    textAlign: 'center',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    color: 'white'
    // width: 200
  }
});
