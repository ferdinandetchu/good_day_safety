
import { ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useState, useContext } from 'react';
import { IsLoading, UserContext } from '../App'

import { getFirestore,  collection, getDocs } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

let usersData = [];

export default function SearchId({navigation}) {
  const {user, setUser} = useContext(UserContext)

  const [inviteCode, setInviteCode] = useState('')
	const [searchCode, setSearchCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {isLoading, setIsLoading} = useContext(IsLoading)

  const handelSearch = async () => {
    setIsLoading(true)

		 // Initialize Cloud Firestore and get a reference to the service
		 const db =  await getFirestore(app);
		try {
			const querySnapshot = await getDocs(collection(db, "Users"));
			await querySnapshot.forEach((doc) => {usersData.push(doc.id)});

			let isCode = usersData.includes(inviteCode)
			if(isCode){
				setSearchCode(inviteCode)
				setIsLoading(false)
			}else {
				setSearchCode('Invite Code not Found')
				setIsLoading(false)
				// console.log(usersData)
			}
		} catch (error) {
			setIsLoading(false)
			// console.log(error)
		}
  }
  
  return (
		<ScrollView style={{backgroundColor: 'white',}}>
      <View style={{justifyContent: 'center'}}>
			<View style={styles.container}>
        {isLoading && <ActivityIndicator color={'#053095'}/> }
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }
				<TextInput keyboardType="number-pad" style={styles.textInput} value={inviteCode} placeholder="Search invite" onChangeText={tetx => setInviteCode(tetx)} />
				<TouchableOpacity style={styles.loginBtn} onPress={handelSearch}>
          <Text style={{color: "white"}}>Search</Text>
				</TouchableOpacity>
				{searchCode && 
					<Text style={{paddingVertical: 5, borderWidth: 1, width: '100%', marginVertical: 10, borderRadius: 4, borderColor: '#3e62cd', textAlign: 'center'}}>{searchCode}</Text>
				}
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
    paddingHorizontal: 120,
    paddingVertical: 10,
    color: 'white'
    // width: 200
  }
});
