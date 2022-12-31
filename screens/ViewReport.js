
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator, Text, TextInput, View, ScrollView } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { UserContext, IsLoading, CurrentReportIdContext, ReportContext } from '../App'

import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

export default function ViewReport({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const {reports, setReports} = useContext(ReportContext);
	const {currentReportId, setCurrentReportId} = useContext(CurrentReportIdContext);
	const [currentReport, setCurrentReport] = useState({})
	const [email, setEmail] = useState('')

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelAddViewer = async () => {
			setIsLoading(true)
			try{
				// console.log(currentReport.data.user)
				const db =  await getFirestore(app);
				const washingtonRef = doc(db, "Users", currentReportId);

				await updateDoc(washingtonRef, {user: [...currentReport.data.user, email]});
				alert('Succesfully Added')
				setIsLoading(false)
			}catch(error){
				console.log(error)
			}
	}

	const handelGetReport = async() =>{
		setIsLoading(true)
		console.log(currentReportId)
		const db =  await getFirestore(app);
		const docRef = doc(db, "Users", currentReportId);
			try {
				const docSnap = await getDoc(docRef)
				setCurrentReport({data: docSnap.data(), id: docSnap.id})
				
				setIsLoading(false)
			} catch (error) {
        setIsLoading(false)
				console.log(error)
			}
	}

	useEffect(()=>{handelGetReport()}, [])

	useEffect(() => {
		// setIsLoading(false)
    navigation.setOptions({
      headerRight: () => (
				<TouchableOpacity onPress={() => {navigation.navigate('Module')}} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
					<Text style={{color: 'white'}}>Reports</Text>
				</TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
		<ScrollView>
			<View style={styles.column}>
				<View style={styles.container}>
					<Text style={{marginVertical: 10, textAlign: 'center'}}>Add Viewer</Text>
					{isLoading && <ActivityIndicator color={'#053095'}/> }
					<View>
						<TextInput placeholder='Invite email' value={email} onChangeText={text => setEmail(text)} style={styles.inputField} />
					</View>
					<TouchableOpacity style={styles.loginBtn} onPress={handelAddViewer}>
          	<Text style={{color: "white"}}>Add Email</Text>
					</TouchableOpacity>

					<View>
						{currentReport.data && <Image source={{uri: currentReport.data.photo }} style={styles.image} />}
						{/* {console.log(currentReport.data.photo)} */}
						{currentReport.data && 
							<View style={{marginVertical: 10}}>
								<Text>1. Can you make this a <Text style={{fontWeight: '700'}}>safe condition:</Text> {currentReport.data.favorite ? 'Yes' : 'No'}</Text>
								<Text>2. <Text style={{fontWeight: '700'}}>Project Name:</Text> {currentReport.data.location.projectName}</Text>
								<Text style={{paddingLeft: 10}}> <Text style={{fontWeight: '700'}}>Floor Level:</Text> {currentReport.data.location.floorLevel}</Text>
								<Text style={{paddingLeft: 10}}> <Text style={{fontWeight: '700'}}>Location Area:</Text> {currentReport.data.location.locationArea}</Text>
								<Text>3. <Text style={{fontWeight: '700'}}>Unsafe Conditions:</Text> {currentReport.data.condition}</Text>
								<Text>4. <Text style={{fontWeight: '700'}}>Comments:</Text> {currentReport.data.comments}</Text>
							</View>
						}
					</View>
				</View>
			</View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'flex-start',
		// alignItems: '',
		margin: 20,
		backgroundColor: 'white',
		zIndex: 1
  },
	column: {
		flex: 1,
		justifyContent: 'space-around',
		paddingVertical: '10%',
		backgroundColor: 'white',
		height: 540
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
	loginBtn: {
    backgroundColor: '#053095',
    textAlign: 'center',
    borderRadius: 30,
    paddingHorizontal: 120,
    paddingVertical: 10,
    color: 'white'
    // width: 200
  },
	inputField: {
		borderWidth: 1,
    borderColor: '#3e62cd',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: "black",
    backgroundColor: '#c2d5f5'
	}
});
