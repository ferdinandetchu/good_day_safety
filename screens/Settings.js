
import { StyleSheet, ScrollView, Text, View, Modal, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react'

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

	useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<TouchableOpacity onPress={() => navigation.navigate('Module')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
        	<Text style={{color: 'white'}}>Report</Text>
				</TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity style={styles.moduleCard} onPress={toggelInvite}>
						<Text style={styles.cardText}>Invite ID Management</Text>
					</TouchableOpacity>
					{ inviteId &&
						<View>
							<Text style={styles.cardViewText}>Create ID</Text>
							<Text style={styles.cardViewText}>Search ID</Text>
							<Text style={styles.cardViewText}>Delete ID</Text>
						</View>
					}
				</View>

				<View style={styles.column}>
					<TouchableOpacity style={styles.moduleCard} onPress={toggelEmailMan}>
						<Text style={styles.cardText}>Email Management</Text>
					</TouchableOpacity>
					{ emailMan &&
						<View>
							<Text style={styles.cardViewText}>Create Email</Text>
							<Text style={styles.cardViewText}>Cahnge Email</Text>
							<Text style={styles.cardViewText}>Delete Email</Text>
						</View>
					}
				</View>
			</View>
		</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch' // if you want to fill rows left to right
  },
  moduleCard: {
		paddingVertical: 40,
    borderRadius: 4,
    backgroundColor: "#3e62cd",
		marginVertical: 6,
		// width: '50%',
    marginHorizontal: "2%",
  },
	column: {
		width: '50%',
	},
	cardText: {
		textAlign: 'center',
		color: 'white'
	},
	cardViewText: {
		paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#053095",
		marginVertical: 6,
    marginHorizontal: "2%",
		color: 'white',
		textAlign: 'center'
	}
});
