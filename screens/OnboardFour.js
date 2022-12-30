import { Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
// ...rest of the import statements remain unchanged
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebaseConfig.js'
import { useState, useContext, useEffect } from 'react';
import { UserContext, IsLoading } from '../App'
// import { async } from '@firebase/util';

export default function OnboardFour({navigation}) {
	const [imageUrl, setImageUrl] = useState()
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(3);
	const [file, setFile] = useState([])

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
		setImageUrl(result.assets[0].uri)
		setFile(result)
  };

	const handelUpload = async () => {
		setIsLoading(true)
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

						// let data = await { ...user.data, photo: downloadURL };
						setUser({ ...user, data:{...user.data, photo: downloadedURL} })
						if(user.data.photo){
							alert('Image Upload Successfuly')

							setProgress(4)
							setIsLoading(false)
							console.log(user)
						}else{
							alert('Error Try Uploading Again')
							setIsLoading(false)
						}
						// console.log('File available at', downloadURL);
					});
					// setDownloadURL(await getDownloadURL(uploadTask.snapshot.ref))
					
				}
			);
			
		}
	}

	useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<View>
					{ (progress == 4) && 
						<TouchableOpacity onPress={() => navigation.navigate('OnboardFive')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
							<Text style={{color: 'white'}}>Next</Text>
						</TouchableOpacity>
					}
				</View>
      ),
    });
  }, [progress]);

  return (
		<View style={styles.column}>
			<View style={styles.container}>
				<Text>4. Please attach a photo of the unsafe condition?</Text>
				{/* <Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text> */}
				<View>
					{imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
					{!imageUrl && <Image source={require('../assets/mathier190500002.webp')} style={styles.image} />}
					{isLoading && <ActivityIndicator color={'#053095'}/> }
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<TouchableOpacity>
							<Text style={{
								backgroundColor: '#c5c1c1', 
								margin: 5, 
								padding: 7, 
								borderRadius: 4,
							}} onPress={pickImageAsync}>Choose File</Text>
						</TouchableOpacity>
						{!imageUrl && <Text>No file chosen</Text>}
					</View>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={{
							backgroundColor: '#3e62cd', 
							margin: 5, 
							padding: 10, 
							borderRadius: 5,
							fontWeight: '700',
							color: 'white'
						}}
						onPress={handelUpload}
						>Upload Photo</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={{marginHorizontal: 10}}>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					{progress == 4 && 
						<View style={styles.progressOne}></View>
					}
					{progress == 3 && 
						<View style={styles.progressOthers}></View>
					}
					<View style={styles.progressOthers}></View>
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
	image: {
		width: 250,
    height: 200,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10
	},
});