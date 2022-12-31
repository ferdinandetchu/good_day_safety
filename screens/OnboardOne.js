
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, ScrollView } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { IsLoading, UserContext } from '../App'

export default function OnboardOne({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(0)
	const [isSafe, setIsSafe] = useState(false)
	const [isNotSafe, setisNotSafe] = useState(false)

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelSelection = async (val) => {
		setIsLoading(true)
		
		if(val){
			setIsSafe(true)
			setisNotSafe(false)
		}else{
			setisNotSafe(true)
			setIsSafe(false)
		}

		let data = await {...user.data, favorite: val};
		setUser({ ...user, data:data })

		setProgress(1)
		setIsLoading(false)

		console.log(user)
	}

	useEffect(() => {
		setIsLoading(false)
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<View>
					{ (progress > 0) && 
						<TouchableOpacity onPress={() => navigation.navigate('OnboardTwo')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
							<Text style={{color: 'white'}}>Next</Text>
						</TouchableOpacity>
					}
				</View>
      ),
    });
  }, [progress]);

  return (
		<ScrollView>
			<View style={styles.column}>
				<View style={styles.container}>
					<Text>1. Can you make this a <Text style={{fontWeight: 'bold'}}>SAFE</Text> condition? *</Text>
					<Text style={{fontSize: 12, margin: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text>

					{isLoading && <ActivityIndicator color={'#053095'}/> }
					<View>
						<TouchableOpacity onPress={() => handelSelection(true)}>
							<Text style={isSafe ? styles.slected : styles.optionContianer}>Yes</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handelSelection(false)}>
							<Text style={isNotSafe ? styles.slected : styles.optionContianer}>No</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Text style={{marginHorizontal: 20}}>{progress} of 5 Answers</Text>
					<View style={styles.progressContainer}>
						{progress > 0 && 
							<View style={styles.progressOne}></View>
						}
						{!progress > 0 && 
							<View style={styles.progressOthers}></View>
						}
						<View style={styles.progressOthers}></View>
						<View style={styles.progressOthers}></View>
						<View style={styles.progressOthers}></View>
						<View style={styles.progressOthers}></View>
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
		alignItems: 'stretch',
		margin: 20,
  },
	column: {
		flex: 1,
		justifyContent: 'space-around',
		paddingVertical: '10%',
		backgroundColor: 'white',
		height: 540
	},
	optionContianer: {
		backgroundColor: '#3e62cd',
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginVertical: 2,
		// borderWidth: 1,
		// borderColor: '#053095',
		color: 'white',
		borderRadius: 4,
		textAlign: 'center'
	},
	slected: {
		backgroundColor: '#053095',
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginVertical: 2,
		color: 'white',
		borderRadius: 4,
		textAlign: 'center'
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
	}
});
