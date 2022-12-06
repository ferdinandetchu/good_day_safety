
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import {Icon} from 'react-native-elements'

export default function OnboardOne({navigation}) {
  return (
		<ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
				<Icon name="arrow-left" size={20} color="#047dd9" type="entypo" onPress={() => navigation.goBack()} />
				<Icon name="arrow-right" size={20} color="#047dd9" type="entypo" onPress={() => navigation.navigate('OnboardTwo')} />
			</View>
			<View style={styles.container}>
				<Text>1. Can you make this a <Text style={{fontWeight: 'bold'}}>SAFE</Text> condition? *</Text>
				<Text style={{fontSize: 10, color: 'grey', paddingTop: 10}}>If no please make inaccessible to other and proceed with your report</Text>
				<View>
					<View style={styles.optionContianer}>
						<Text style={styles.optionText} onPress={() => navigation.navigate('OnboardTwo')}>Y</Text>
						<Text>Yes</Text>
					</View>
					<View style={styles.optionContianer}>
						<Text style={styles.optionText} onPress={() => navigation.navigate('OnboardTwo')}>N</Text>
						<Text>No</Text>
					</View>
				</View>
			</View>
			<View style={{margin: 20}}>
				<Text>1 of 5 Answers</Text>
				<View style={styles.progressContainer}>
					<View style={styles.progressOne}></View>
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
					<View style={styles.progressOthers}></View>
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
    margin: 60,
		// height: 300
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
