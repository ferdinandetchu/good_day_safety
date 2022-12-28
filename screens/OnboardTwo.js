
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import {Icon} from 'react-native-elements'
import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../App'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

export default function OnboardTwo({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(1);
	const [projectName, setProjectName] = useState('')
	const [floorLevel, setFloorLevel] = useState('')
	const [locationArea, setLocationArea] = useState('')

	const handelLocationInput = async () => {
		let id = user.id
		if(projectName.length > 0 && floorLevel.length > 0 && locationArea.length > 0){
			setProgress(2)
			 // Initialize Cloud Firestore and get a reference to the service
			 const db =  await getFirestore(app);
			 try {
					 const querySnapshot = (getDoc(doc(db, "Users", user.id)))
					 .then((doc) => {
						 if(doc.data()){
							 setUser({id: doc.id, data: doc.data()})
						 }else{
							 setCodeError('Invalide invite code')
						 }
					 });
			 } catch (error) {
				 
			 }
			setUser({
				data: 
					{
						comments: "", 
						condition: "", 
						favorite: user.data.favorite, 
						location: {projectName: projectName, floorLevel: floorLevel, locationArea: locationArea}, 
						photo: ""
					}, 
				id: id
			})
			try {
			  const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
		  } catch (error) {
			
		  }
		}else{
			setProgress(1)
		}
	}

	useEffect(()=>{handelLocationInput()}, [locationArea || floorLevel || projectName])

  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				{progress == 2  && 
					<Button title="Next" onPress={() => {handelLocationInput(), navigation.navigate('OnboardThree')}} />
				}
			</View>
			<View style={styles.container}>
				<Text>2. Please specify the location of the Unsafe condition?</Text>
				{/* <Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text> */}
				<View>
					<Text style={styles.inputText}>Project Name</Text>
					<TextInput value={projectName} onChangeText={text => setProjectName(text)} style={styles.inputField} />

					<Text style={styles.inputText}>Floor Level</Text>
					<TextInput keyboardType="number-pad" value={floorLevel} onChangeText={text => setFloorLevel(text)} style={styles.inputField} />

					<Text style={styles.inputText}>Location Area</Text>
					<TextInput value={locationArea} onChangeText={text => setLocationArea(text)} style={styles.inputField} />
				</View>
			</View>
			<View style={{margin: 20}}>
				<Text>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
				{progress == 2 && 
						<View style={styles.progressOne}></View>
					}
					<View style={styles.progressOne}></View>
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
    margin: 20,
		// height: 450
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
		borderColor: 'black'
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
	},
	inputText: {
		marginTop: 10
	},
	inputField: {
		borderRadius: 5, 
		borderWidth: 1, 
		padding: 5, 
		borderColor: 'black', 
		marginTop: 10
	}
});
