
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, TextInput, View } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { UserContext, IsLoading } from '../App'

export default function OnboardTwo({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(1);
	const [projectName, setProjectName] = useState('')
	const [floorLevel, setFloorLevel] = useState('')
	const [locationArea, setLocationArea] = useState('')

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelLocationInput = async () => {
		if(projectName.length > 0 && floorLevel.length > 0 && locationArea.length > 0){
			setIsLoading(true)

			let data = await { ...user.data, location: {projectName: projectName, floorLevel: floorLevel, locationArea: locationArea} };
			setUser({ ...user, data:data })

			setIsLoading(false)
			setProgress(2)
		}else{
			setProgress(1)
		}
		console.log(user)
	}

	useEffect(()=>{handelLocationInput()}, [locationArea || floorLevel || projectName])

	useEffect(() => {
		// setIsLoading(false)
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<View>
					{ (progress == 2) && 
						<TouchableOpacity onPress={() => {handelLocationInput(), navigation.navigate('OnboardThree')}} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
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
				<Text style={{marginVertical: 10}}>2. Please specify the location of the Unsafe condition?</Text>
				{isLoading && <ActivityIndicator color={'#053095'}/> }
				<View>
					<TextInput placeholder='Project Name' value={projectName} onChangeText={text => setProjectName(text)} style={styles.inputField} />

					<TextInput placeholder='Floor Level' keyboardType="number-pad" value={floorLevel} onChangeText={text => setFloorLevel(text)} style={styles.inputField} />

					<TextInput placeholder='Location Area' value={locationArea} onChangeText={text => setLocationArea(text)} style={styles.inputField} />
				</View>
			</View>
			<View>
				<Text style={{marginHorizontal: 20}}>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
					{progress == 2 && 
						<View style={styles.progressOne}></View>
					}
					{progress == 1 && 
						<View style={styles.progressOthers}></View>
					}
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
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
