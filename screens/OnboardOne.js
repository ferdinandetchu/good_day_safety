
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import React, {useState, useContext} from 'react';
import { UserContext } from '../App'
import {Icon} from 'react-native-elements'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

export default function OnboardOne({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(0)
	const [codeError, setCodeError] = useState('')

	const handelSelection = async (val) => {
		setProgress(1)
		let id = user.id
			setUser({
				data: 
					{
						comments: "", 
						condition: "", 
						favorite: val, 
						location: null, 
						photo: ""
					}, 
				id: id
			})

		// Initialize Cloud Firestore and get a reference to the service
		const db =  await getFirestore(app);
		try {
			  const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
		  } catch (error) {
			
		  }
		console.log(user)
	}
  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				{progress > 0 && 
					<Button title="Next" onPress={() => navigation.navigate('OnboardTwo')} />
				}
			</View>
			<View style={styles.container}>
				<Text>1. Can you make this a <Text style={{fontWeight: 'bold'}}>SAFE</Text> condition? *</Text>
				<Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text>
				<View>
					<Text style={styles.optionContianer} onPress={() => handelSelection(true)}>Yes</Text>
					<Text style={styles.optionContianer} onPress={() => handelSelection(false)}>No</Text>
				</View>
			</View>
			<View style={{margin: 20}}>
				<Text>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					{progress > 0 && 
						<View style={styles.progressOne}></View>
					}
					
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
				</View>
			</View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    margin: 60,
		// height: 300
  },
	optionContianer: {
		flex: 1,
		backgroundColor: 'cyan',
		flexDirection: 'row', 
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 50, 
		paddingRight: 50,
		padding: 8,
		margin: 10,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5
	},
	optionText: {
		backgroundColor: 'white', 
		padding: 8,
		paddingLeft: 13,
		paddingRight: 13,
		borderWidth: 1,
		borderColor: 'black'
	},
	progressContainer: {
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white',
		// padding: 10,
		// margin: 20
	},
	progressOne: {
		backgroundColor: '#047dd9',
		padding: 10,
		width: '20%'
	},
	progressOthers: {
		backgroundColor: 'white',
		padding: 10,
		width: '20%'
	}
});
