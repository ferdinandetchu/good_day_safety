
import { Button, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import InviteInput from '../components/InviteInput.js'

export default function Signup({navigation}) {
  return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.topText}>GOOD DAY SAFETY APPLICATION!</Text>
				<View style={{color: 'black'}}>
					<Button color='red' title="SIGN UP" />
				</View>
				<Text style={styles.labelText}>Email</Text>
				<TextInput style={styles.textInput} />
				<Text style={styles.labelText}>Password</Text>
				<TextInput style={styles.textInput} />
                <Text style={styles.labelText}>Confirm Password</Text>
				<TextInput style={styles.textInput} />
          <Button title="Purchase Account" onPress={() =>
						navigation.navigate('Module') }  
          />
				<View style={styles.backBtn}>
					<Button title="Back" onPress={() => navigation.goBack()} />
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
  },
  backBtn:{
    marginTop: 30,
    flex: 1,
    flexDirection: 'row'
  }
});
