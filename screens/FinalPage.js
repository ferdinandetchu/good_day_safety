import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'


import { UserContext, IsLoading } from '../App'
import { useContext } from 'react';


export default function FinalPage({navigation}) {
	const {user, setUser} = useContext(UserContext)
	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelSubmit = async () => {
		setIsLoading(true)
		// Initialize Cloud Firestore and get a reference to the service
		const db =  await getFirestore(app);
		try {
			const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
			setIsLoading(false)
			navigation.navigate('Welcome')
		} catch (error) {
			console.log(error)
		}
	}

  return (
		<View style={styles.column}>
			<View style={styles.container}>
				<Text style={{marginBottom: 20}}>Please confirm your response:</Text>
				<Text>1. Can you make this a <Text style={{fontWeight: '700'}}>safe condition:</Text> {user.data.favorite ? 'Yes' : 'No'}</Text>
				<Text>2. <Text style={{fontWeight: '700'}}>Project Name:</Text> {user.data.location.projectName}</Text>
				<Text style={{paddingLeft: 10}}> <Text style={{fontWeight: '700'}}>Floor Level:</Text> {user.data.location.floorLevel}</Text>
				<Text style={{paddingLeft: 10}}> <Text style={{fontWeight: '700'}}>Location Area:</Text> {user.data.location.locationArea}</Text>
				<Text>3. <Text style={{fontWeight: '700'}}>Unsafe Conditions:</Text> {user.data.condition}</Text>
				<Text>4. <Text style={{fontWeight: '700'}}>Comments:</Text> {user.data.comments}</Text>
				{isLoading && <ActivityIndicator color={'#053095'}/> }
				<TouchableOpacity onPress={() => handelSubmit()}>
					<Text style={{
						backgroundColor: '#053095', 
						margin: 4, 
						padding: 10,
						color: 'white',
						borderRadius: 4,
						fontWeight: '700',
						textAlign: 'center'
					}}
					>Submit</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={{marginHorizontal: 10}}>5 of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
				</View>
			</View>
		</View>
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
	progressContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#c2d5f5',
	},
	progressOne: {
		backgroundColor: '#053095',
		padding: 10,
		width: '20%'
	},
	progressOthers: {
		backgroundColor: '#c2d5f5',
		padding: 10,
		width: '20%'
	},
});