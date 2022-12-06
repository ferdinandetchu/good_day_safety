
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import InviteInput from '../components/InviteInput.js'

export default function Welcome({navigation}) {
  return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
				<View style={{color: 'black'}}>
					<Text style={{marginBottom: 20}}><Text style={{fontWeight: '700'}}>Thank you</Text> for your submission!</Text>
					<Text>We appreciate your joint effort in creating a safe work enviroment for everyone!</Text>
				</View>
				<View>
					<Text style={{
						backgroundColor: 'cyan', 
						margin: 5, 
						padding: 10, 
						borderRadius: 10,
						fontWeight: '700',
						textAlign: 'center'
					}}
					onPress={() => navigation.navigate('Module')}
					>Submit</Text>
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
    margin: 60
  },

  topText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
