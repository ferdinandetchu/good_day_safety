
import { Button, StyleSheet, SafeAreaView, FlatList, Text, TextInput, View } from 'react-native';
import {Icon} from 'react-native-elements'
import React, {useState, useContext} from 'react';
import { UserContext } from '../App'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'


export default function OnboardThree({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(2);
	const [selectionIndex, setSelectionIndex] = useState('')
	const [select, setSelection] = useState([
		'Vehicle, Machine or Tool', 
		'Electrical', 
		'Flamable or Explosion', 
		'Breathing', 
		'Cutting or Stabbing',
		'Overhead',
		'Struck or Hit by',
		'Unguarded Opening or Edge',
		'Uneven sorface or tripping',
		'Slippery',
		'Unlit Area',
		'Other - Describe in comments section'
	])

	const handelSelection = async (Value, i) => {
		let id = user.id;
		setSelectionIndex(i)
		if(user){
			setProgress(3)
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
				 console.log(error)
			 }
			 setUser({
				data: 
					{
						comments: "", 
						condition: Value, 
						favorite: user.data.favorite, 
						location: user.data.location, 
						photo: ""
					}, 
				id: id
			})
			try {
			  const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
		  } catch (error) {
			
		  }
			console.log(user)
		}else{
			setProgress(2)
		}
	}
	// console.log(select)
  return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				{/* <Icon name="arrow-right" size={20} color="#047dd9" type="entypo" onPress={() => navigation.navigate('OnboardFour')} /> */}
				{progress == 3  && 
					<Button title="Next" onPress={() => navigation.navigate('OnboardFour')} />
				}
			</View>
			<View>
				<Text style={{marginBottom: 20}}>3. Please select below the unsafe condition?</Text>
				{/* <Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text> */}
				
				<View style={styles.flatList}>
					<FlatList
						data={select}
						renderItem={({item, index}) => (
							<View>
								<Text style={ (selectionIndex === index)? styles.selected :  styles.itemConteianer } onPress={() => handelSelection(item, index)} key={index}>{item}</Text>
							</View>
						)}
						keyExtractor={item => item}
					/>
				</View>
			</View>
			<View style={{marginTop: 20}}>
				<Text>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					{progress == 3 && 
						<View style={styles.progressOne}></View>
					}
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
				</View>
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
	container:{
		marginLeft: 30,
		marginRight: 30,
	},

	progressContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
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
	itemConteianer: {
		borderWidth: 1,
		borderColor: 'blue',
		borderRadius: 5,
		padding: 5,
		margin: 5
	},
	flatList: {
		height: 300,
	},
	selected: {
		backgroundColor: '#a7d4f1',
		borderWidth: 1,
		borderColor: 'blue',
		padding: 5,
		margin: 5,
		borderRadius: 5,
	}
});