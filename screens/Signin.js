
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import InviteInput from '../components/InviteInput.js'

export default function Signin({navigation}) {
  return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
				<View style={{color: 'black'}}>
					<Button color='cyan' title="SIGN IN" />
				</View>
				<Text style={styles.labelText}>Email</Text>
				<TextInput style={styles.textInput} />
				<Text style={styles.labelText}>Password</Text>
				<TextInput style={styles.textInput} />
				<View>
					<Button title="LOGIN" onPress={() =>
						navigation.navigate('OnboardOne')} />
				</View>
				<View style={styles.signUpBtn}>
					<Button color='red' title="Sign Up" onPress={() =>
						navigation.navigate('Signup') } 
					/>
				</View>
				<Text style={styles.orText}>OR</Text>
				<Text style={styles.centerText}>Enter Invitation Code</Text>
				<InviteInput />
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
  },
  textInput: {
    borderWidth: 1,
    // width: 250,
    padding: 4,
    marginBottom: 10
  },

  labelText: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5
  },

  signUpBtn: {
    marginLeft: 150,
    marginTop: 20,
    borderRadius: 20
  },

  centerText: {
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  }
});
