import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';

import { useState, useContext, useEffect} from 'react';
import { UserContext, IsLoading } from '../App'


export default function OnboardFive({navigation}) {
	const {user, setUser} = useContext(UserContext);
	const [progress, setProgress] = useState(4);
	const [comments, setComments] = useState('')

	const {isLoading, setIsLoading} = useContext(IsLoading)

	const handelCommentsSubmit = async () => {
		if(comments.length > 0){
			setIsLoading(true)
			setUser({ ...user, data:{...user.data, comments: comments} })
			setIsLoading(false)
			setProgress(5)
			console.log(user)
		}else{
			setProgress(4)
		}
	}

	useEffect(()=> {handelCommentsSubmit()}, [comments])

	useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<View>
					{ (progress == 5) && 
						<TouchableOpacity onPress={() => navigation.navigate('FinalPage')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
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
				<Text style={{marginVertical: 10}}>5. Please include any necessary comments you may have about the unsafe condition?</Text>
				<View>
					{isLoading && <ActivityIndicator color={'#053095'}/> }
					<View>
						<TextInput value={comments} onChangeText={text => setComments(text)} style={styles.textInput} maxLength={250} multiline />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
						<Text style={{color: 'grey'}}>250 Characters Max</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={{marginHorizontal: 10}}>{progress} of 5 Answers</Text>
				<View style={styles.progressContainer}>
				<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOne}></View>
					{progress == 5 && 
						<View style={styles.progressOne}></View>
					}
					{progress == 4 && 
						<View style={styles.progressOthers}></View>
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
	textInput: {
    borderWidth: 1,
    borderColor: '#3e62cd',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: "black",
    backgroundColor: '#c2d5f5'
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