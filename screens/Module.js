
import { StyleSheet, ScrollView, Text, View, Modal} from 'react-native';

export default function Module({navigation}) {
  return (
		<View>
			<ScrollView>
				<Text style={styles.settingText}>Settings</Text>
				<View style={styles.container}>
          <View style={styles.moduleCard}>
					  <Text onPress={() => navigation.navigate('Settings')} >Modules 1</Text>
          </View>
				</View>
			</ScrollView>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 60,
    borderWidth: 1,
		height: 500,
    borderColor: 'black'
  },
	settingText: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10
	},
	topnavContainer: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 10
	},
	logoutText: {},
	createModuleText: {
		width: '85%',
		textAlign: 'right'
	},
	moduleCard: {
		borderWidth: 1,
		borderColor: 'black',
		padding: 20,
		margin: 5,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
}
});
