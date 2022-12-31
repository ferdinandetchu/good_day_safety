
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, FlatList, View } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { IsLoading, UserContext } from '../App'

import { getFirestore,  collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

let usersData = [];

export default function DeleteId({navigation}) {
  const {user, setUser} = useContext(UserContext)

  const [inviteCode, setInviteCode] = useState('')
	const [searchCode, setSearchCode] = useState([])
	const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {isLoading, setIsLoading} = useContext(IsLoading)

  const handelDelete = async (id, i) => {
    setIsLoading(true)

		 // Initialize Cloud Firestore and get a reference to the service
		 const db =  await getFirestore(app);
		try {
			await deleteDoc(doc(db, "Users", id));
			delete usersData[i]
			// console.log(usersData)
			alert('Code Deleted')
			navigation.navigate('Settings')
			setIsDeleting(true)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
  }
  
	const handelGetData = async () => {
		setIsLoading(true)
		 // Initialize Cloud Firestore and get a reference to the service
		 const db =  await getFirestore(app);
		try {
			const querySnapshot = await getDocs(collection(db, "Users"));
			await querySnapshot.forEach((doc) => {usersData.push({data: doc.data(), id: doc.id})});

			setSearchCode(usersData)
			console.log(searchCode)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error)
			setIsLoading(false)
			// console.log(error)
		}
	}

	useEffect(() => {handelGetData()}, [])
	// useEffect(() => {handelGetData()}, [isDeleting])
	useEffect(() => {setSearchCode([]); usersData = []}, [navigation])
	
  return (
		<View style={styles.column}>
      <View style={styles.container}>
				<View style={styles.container}>
					{isLoading && <ActivityIndicator color={'#053095'}/> }
					{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text> }

					{searchCode && 
						<FlatList
						data={searchCode}
						renderItem={({item, index}) => (
							<View>
								{item != undefined &&
									<View>
										{item.data.user.includes(user.email) &&
											<View style={styles.listItem}>
												<Text style={{textAlign: 'center'}}>{item.id}</Text>
												<TouchableOpacity onPress={() => handelDelete(item.id, index)}>
													<Text style={styles.deletBtn}>Delete</Text>
												</TouchableOpacity>
												{/* {console.log(item.data.user)} */}
											</View>
										}
									</View>
								}
							</View>
						)}
						keyExtractor={item => item}
					/>
					}
					{!searchCode &&
						<Text style={{textAlign: 'center'}}>No invite id</Text>
					}
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
	listItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderWidth: 1, 
		width: '100%', 
		marginVertical: 10, 
		borderRadius: 4, 
		borderColor: '#3e62cd', 
	},
	deletBtn: {
		backgroundColor: 'red',
		borderRadius: 30,
		paddingVertical: 3,
		paddingHorizontal: 10,
		color: 'white'
	},
  errorText: {
    color: 'red',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
    borderRadius: 10
  },
});
