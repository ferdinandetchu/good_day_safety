import { StyleSheet, ScrollView, Text, View } from 'react-native';
import {Icon} from 'react-native-elements'


export default function FinalPage({navigation}) {

  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
			</View>
			<View style={styles.container}>
				<Text style={{marginBottom: 20}}>Please confirm your response:</Text>
				<Text>1. Can you make this a <Text style={{fontWeight: '700'}}>safe condition:</Text> Yes</Text>
				<Text>2. <Text style={{fontWeight: '700'}}>Project Location:</Text> 10</Text>
				<Text>3. <Text style={{fontWeight: '700'}}>Unsafe Conditions:</Text> Electrical</Text>
				<Text>4. <Text style={{fontWeight: '700'}}>Comments:</Text> Exposed cabels lying around</Text>
				<View>
					<Text style={{
						backgroundColor: 'cyan', 
						margin: 5, 
						padding: 10, 
						borderRadius: 10,
						fontWeight: '700',
						textAlign: 'center'
					}}
					onPress={() => navigation.navigate('Welcome')}
					>Submit</Text>
				</View>
			</View>
			<View style={{margin: 20}}>
				<Text>5 of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
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