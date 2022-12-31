
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, FlatList} from 'react-native';


import { UserContext, IsLoading, ReportContext, CurrentReportIdContext } from '../App'
// import { async } from '@firebase/util';

export default function Module({navigation}) {
	const {data, setReports} = useContext(ReportContext)
	const {isLoading, setIsLoading} = useContext(IsLoading)
	const {user, setUser} = useContext(UserContext)

	const {currentReportId, setCurrentReportId} = useContext(CurrentReportIdContext);

	console.log(user.email)
	useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
				<TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, backgroundColor: '#053095'}}>
        	<Text style={{color: 'white'}}>Settings</Text>
				</TouchableOpacity>
      ),
    });
  }, [navigation]);
	console.log(data)
  return (
		<View style={{backgroundColor: 'white', height: '100%'}}>
			<View>
				<Text style={styles.settingText}>Reports</Text>
				{ isLoading && <ActivityIndicator color={'#053095'}/> }
				<View style={styles.container}>
					{data && 
						<FlatList
							data={data}
							numColumns={2}
							renderItem={({item}) => (
								<View>
									{item.data.user.includes(user.email) &&
										<View>
											{item.data.location.projectName && 
												<TouchableOpacity style={styles.report} onPress={() => {navigation.navigate('ViewReport'); setCurrentReportId(item.id)}} >
													<Text style={styles.repportText}>{item.data.location.projectName}</Text>
													{/* {console.log(item.data.user.includes(user.email))} */}
												</TouchableOpacity>
											}
										</View>
									}
								</View>
							)}
							keyExtractor={item => item.id.toString()}
						/>
					}
				</View>
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
		alignItems: 'stretch',
		zIndex: 100,
  },
	settingText: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
		color: 'black'
	},
	repportText: {
		fontSize: 12,
    fontWeight: "700",
		textAlign: "center",
		color: 'white'
	},
	report: {
    paddingVertical: 40,
    borderRadius: 4,
    backgroundColor: "#3e62cd",
		marginVertical: 6,
		width: 169,
    marginHorizontal: "2%",
	}
});
