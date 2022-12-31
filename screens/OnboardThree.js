
import { ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, Text, View, } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext, IsLoading } from '../App'


export default function OnboardThree({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(2);
	const [selectionIndex, setSelectionIndex] = useState(7)
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

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelSelection = async (i) => {
		setIsLoading(true)
		if(i){
			let condition = select[i]
			let data = await { ...user.data, condition: condition, };
			setUser({ ...user, data:data })

			setProgress(3)
			setIsLoading(false)
			console.log(user)
		}else{
			setProgress(2)
		}
	}

	useEffect(() => {handelSelection(selectionIndex)}, [selectionIndex])

	useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<View>
					{ (progress == 3) && 
						<TouchableOpacity onPress={() => navigation.navigate('OnboardFour')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
							<Text style={{color: 'white'}}>Next</Text>
						</TouchableOpacity>
					}
				</View>
      ),
    });
  }, [progress]);
	// console.log(select)
  return (
		<View style={styles.column}>
			<View style={styles.container}>
				<Text style={{marginBottom: 20}}>3. Please select below the unsafe condition?</Text>
				{/* <Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text> */}
				{isLoading && <ActivityIndicator color={'#053095'}/> }
				<View style={styles.flatList}>
					<FlatList
						data={select}
						renderItem={({item, index}) => (
							<TouchableOpacity onPress={() => setSelectionIndex(index)}>
								<Text style={ (selectionIndex === index)? styles.selected :  styles.itemConteianer } key={index}>{item}</Text>
								{/* {console.log(index)} */}
							</TouchableOpacity>
						)}
						keyExtractor={item => item}
					/>
				</View>
			</View>
			<View>
				<Text style={{margin: 10}}>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
						{progress == 3 && 
							<View style={styles.progressOne}></View>
						}
						{progress == 2 && 
							<View style={styles.progressOthers}></View>
						}
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
	itemConteianer: {
		borderWidth: 1,
		borderColor: '#3e62cd',
		borderRadius: 4,
		padding: 5,
		margin: 5
	},
	flatList: {
		height: 300,
	},
	selected: {
		backgroundColor: '#c2d5f5',
		borderWidth: 1,
		borderColor: '#3e62cd',
		padding: 5,
		margin: 5,
		borderRadius: 4,
	}
});