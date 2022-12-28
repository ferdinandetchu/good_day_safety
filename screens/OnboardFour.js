import { Button, Image, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import {Icon} from 'react-native-elements'
// ...rest of the import statements remain unchanged
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'
import { useState, useContext} from 'react';
import { UserContext } from '../App'
import { async } from '@firebase/util';

export default function OnboardFour({navigation}) {
	const [imageUrl, setImageUrl] = useState()
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(3);
	const [file, setFile] = useState([])
	const [downloadURL, setDownloadURL] = useState('')
	const [data, setData] = useState(null)

	const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
		setImageUrl(result.assets[0].uri)
		setFile(result)
  };

	const handelUpload = async () => {
		let id = user.id;
		if(user){
			// Initialize Cloud Storage and get a reference to the service
			const storage = await getStorage(app);
			
			const response = await fetch(imageUrl)
			const blob = await response.blob()
			const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') +1)

			// Create a reference to 'images/mountains.jpg'
			const mountainImagesRef = ref(storage, `images/${fileName}`);

			// 'file' comes from the Blob or File API
			const uploadTask = uploadBytesResumable(mountainImagesRef, blob)

			uploadTask.on('state_changed', 
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					alert('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				}, 
				(error) => {
					// Handle unsuccessful uploads
				}, 
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
						setDownloadURL(downloadedURL)
						setProgress(4)
						// console.log('File available at', downloadURL);
					});
					// setDownloadURL(await getDownloadURL(uploadTask.snapshot.ref))
					
				}
			);

			// Add link to db
			// Initialize Cloud Firestore and get a reference to the service
			const db =  await getFirestore(app);
			// let data = null
			try {
					 const querySnapshot = (getDoc(doc(db, "Users", user.id)))
					 .then((doc) => {
						 if(doc.data()){
							// setData(doc.data())
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
						condition: user.data.condition, 
						favorite: user.data.favorite, 
						location: user.data.location, 
						photo: downloadURL
					}, 
				id: id
			})
			try {
			  const querySnapshot = await (updateDoc(doc(db, "Users", user.id), user.data))
		  } catch (error) {
			console.log(error)
		  }
			if(user){
				alert('Image Upload Successfuly')
			}else{
				alert('Error')
			}
			
		}
	}
  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				{/* <Icon name="arrow-right" size={20} color="#047dd9" type="entypo" onPress={() => navigation.navigate('OnboardFive')} /> */}
				{progress == 4  && 
					<Button title="Next" onPress={() => navigation.navigate('OnboardFive')} />
				}
			</View>
			<View style={styles.container}>
				<Text>4. Please attach a photo of the unsafe condition?</Text>
				{/* <Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text> */}
				<View>
					{!imageUrl && (
						<View style={{
							fontSize: 400, 
							borderWidth: 1, 
							borderColor: 'grey',
							padding: 100,
							margin: 10
						}}>
						</View>
					)}
					{imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={{
							backgroundColor: '#c5c1c1', 
							margin: 5, 
							padding: 5, 
							borderWidth: 1, 
							borderColor: 'black',
							borderRadius: 5,
						}} onPress={pickImageAsync}>Choose File</Text>
						{!imageUrl && <Text>No file chosen</Text>}
					</View>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={{
							backgroundColor: 'cyan', 
							margin: 5, 
							padding: 10, 
							borderRadius: 5,
							fontWeight: '700'
						}}
						onPress={handelUpload}
						>Upload Photo</Text>
					</View>
				</View>
			</View>
			<View style={{marginLeft: 30, marginRight: 30, }}>
				<Text>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					{progress == 4 && 
						<View style={styles.progressOne}></View>
					}
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
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
    margin: 30,
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
	image: {
		width: 250,
    height: 200,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10
	},
});