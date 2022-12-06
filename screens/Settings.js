
import { StyleSheet, ScrollView, Text, View, Modal, Button} from 'react-native';
import { useState } from 'react'

export default function Settings ({navigation}) {
	const [inviteId, setinviteId] = useState(false);
	const [reportMan, setreportMan] = useState(false);
	const [subscribeMan, setsubscribeMan] = useState(false)
	const [moduleMan, setmoduleMan] = useState(false)
	const [emailMan, setemailMan] = useState(false)
	const [userMan, setuserMan] =useState(false)
	function toggelInvite () {
		if(inviteId){
			setinviteId(false)
		}else{
			setinviteId(true)
		}
	};

	function toggelReportMan () {
		if(reportMan){
			setreportMan(false)
		}else{
			setreportMan(true)
		}
	}

	function toggelSubscribeMan () {
		if(subscribeMan){
			setsubscribeMan(false)
		}else{
			setsubscribeMan(true)
		}
	}

	function toggelModuleMan () {
		if(moduleMan){
			setmoduleMan(false)
		}else{
			setmoduleMan(true)
		}
	}

	function toggelEmailMan () {
		if(emailMan){
			setemailMan(false)
		}else{
			setemailMan(true)
		}
	}

	function toggelUserMan () {
		if(userMan){
			setuserMan(false)
		}else{
			setuserMan(true)
		}
	}


  return (
		<ScrollView>
			<Text style={styles.settingText}>Settings</Text>
			<View style={styles.container}>
				<View>
					<View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelReportMan}>Report Management</Text>
					</View>
					{ reportMan &&
						<View>
							<Text style={styles.cardViewText}>View Reports</Text>
							<Text style={styles.cardViewText}>Delete Reports</Text>
							<Text style={styles.cardViewText}>Print Reports</Text>
						</View>
					}

					<View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelSubscribeMan}>Subscription Management</Text>
					</View>
					{ subscribeMan &&
						<View>
							<Text style={styles.cardViewText}>View Subscription</Text>
							<Text style={styles.cardViewText}>Change Subscription</Text>
							<Text style={styles.cardViewText}>Cancel Subscription</Text>
						</View>
					}

					<View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelModuleMan}>Module Management</Text>
						<Text></Text>
					</View>
					{ moduleMan &&
						<View>
							<Text style={styles.cardViewText}>Create Module</Text>
							<Text style={styles.cardViewText}>Delete Module</Text>
							<Text style={styles.cardViewText}>Active Module</Text>
						</View>
					}
				</View>
				<View>
					<View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelInvite}>Invite ID Management</Text>
					</View>
					{ inviteId &&
						<View>
							<Text style={styles.cardViewText}>Create ID</Text>
							<Text style={styles.cardViewText}>Search ID</Text>
							<Text style={styles.cardViewText}>Delete ID</Text>
						</View>
					}

					<View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelEmailMan}>Email Management</Text>
					</View>
					{ emailMan &&
						<View>
							<Text style={styles.cardViewText}>Create Email</Text>
							<Text style={styles.cardViewText}>Cahnge Email</Text>
							<Text style={styles.cardViewText}>Delete Email</Text>
						</View>
					}

					{/* <View style={styles.moduleCard}>
						<Text style={styles.cardText} onPress={toggelUserMan}>User Management</Text>
					</View>
					{ userMan &&
						<View>
							<Text style={styles.cardViewText}>Kick User</Text>
							<Text style={styles.cardViewText}>Ban User</Text>
							<Text style={styles.cardViewText}>Limit User</Text>
						</View>
					} */}
				</View>
			</View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 50,
    borderWidth: 1,
		// height: 550,
    borderColor: 'black',
		justifyContent: 'center'
  },
	settingText: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10
	},
  moduleCard: {
        borderRadius: 10,
				width: 125,
        padding: 10,
				backgroundColor: '#047dd9',
        margin: 5,
				marginBottom: 20,
				marginTop: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
  },
	cardText: {
		textAlign: 'center',
		color: 'white'
	},
	cardViewText: {
		padding: 2,
		margin: 5,
		backgroundColor: 'cyan',
		borderWidth: 1,
		borderColor: 'black',
		textAlign: 'center'
	}
});
