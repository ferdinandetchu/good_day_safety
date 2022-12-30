
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function Welcome({navigation}) {
  return (
		<View style={styles.column}>
			<View style={styles.container}>
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
				<View style={{color: 'black'}}>
					<Text style={{marginBottom: 20, fontSize: 20, textAlign: 'center'}}><Text style={{fontWeight: '700'}}>Thank you</Text> for your submission!</Text>
					<Text style={{fontSize: 20, textAlign: 'center'}}>We appreciate your joint effort in creating a safe work enviroment for everyone!</Text>
				</View>
				
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('Signin')}>
				<Text style={{
					backgroundColor: '#053095', 
					margin: 20, 
					padding: 10,
					color: 'white',
					borderRadius: 4,
					fontWeight: '700',
					textAlign: 'center'
				}}
				>Submit Another</Text>
			</TouchableOpacity>
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

  topText: {
    color: '#053095',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 80
  },
});
