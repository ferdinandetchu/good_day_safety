import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import {Icon} from 'react-native-elements'

import { useState, useContext, useEffect} from 'react';
import { UserContext } from '../App'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'


export default function OnboardFive({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(4);
	const [comments, setComments] = useState('')
	const [data, setData] = useState(null)

	const handelCommentsSubmit = async () => {
		let id = user.id
		if(comments.length > 0){
			 // Initialize Cloud Firestore and get a reference to the service
			 const db =  await getFirestore(app);
			 try {
					 const querySnapshot = (getDoc(doc(db, "Users", user.id)))
					 .then((doc) => {
						 if(doc.data()){
							//  setData(doc.data())
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
						comments: comments, 
						condition: user.data.condition, 
						favorite: user.data.favorite, 
						location: user.data.location, 
						photo: user.data.photo
					}, 
				id: id
			})
			try {
			  const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
				setProgress(5)
		  } catch (error) {
				console.log(error)
		  }
			console.log(user)
		}else{
			setProgress(4)
		}
	}

	useEffect(()=> {handelCommentsSubmit()}, [comments])
  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				{/* <Icon name="arrow-right" size={20} color="#047dd9" type="entypo" onPress={() => navigation.navigate('FinalPage')} /> */}
				{progress == 5  && 
					<Button title="Next" onPress={() => navigation.navigate('FinalPage')} />
				}
			</View>
			<View style={styles.container}>
				<Text>5. Please include any necessary comments you may have about the unsafe condition?</Text>
				<View>
					<View>
						<TextInput value={comments} onChangeText={text => setComments(text)} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10 }} maxLength={250} multiline />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
						<Text>250 Characters Max</Text>
					</View>
				</View>
			</View>
			<View style={{margin: 20}}>
				<Text>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
				{progress == 5 && 
						<View style={styles.progressOne}></View>
					}
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
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
	}
});