import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, Text, ActivityIndicator,  View, StyleSheet} from 'react-native';
import { UserContext } from '../App'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../firebaseConfig.js'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

function InviteInput(prop) {

  const {user, setUser} = useContext(UserContext);
  const [codeError, setCodeError] = useState('')
  const [value, setValue] = useState('');

  const [ isLoading, setIsLoading ] = useState(false)


  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    const handelPinSignIn = async () => {
      // Initialize Cloud Firestore and get a reference to the service
      const db =  await getFirestore(app);
      try {
        if(value.length == 6) {
          setIsLoading(true)
          const querySnapshot = (getDoc(doc(db, "Users", value)))
          .then((doc) => {
            if(doc.data()){
              if(!doc.data().condition){
                setUser({id: doc.id, data: doc.data()})
                prop.navigation.navigate('OnboardOne')
                setIsLoading(false)
              }else{
                setCodeError('Invite code already used')
                setIsLoading(false)
              }
            }else{
              setCodeError('Invalid invite code')
              setIsLoading(false)
            }
          });
        }else{
          setCodeError('')
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
     
    }
    useEffect(()=>{
      handelPinSignIn()
    }, [value])
    // console.log(value)
  return (
    <View>
      { isLoading && <ActivityIndicator color={'#3e62cd'} />}
      {codeError &&
        <Text style={styles.errorText}>{codeError}</Text>
      }
      
      <SafeAreaView style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </SafeAreaView>
    </View>
  )
}

export default InviteInput

const styles = StyleSheet.create({
  
    root: {
      padding: 10,
      justifyContent: 'center',
      alignItems: "center",
        
      // minHeight: 300
    },
    title: {
      textAlign: 'center', 
      fontSize: 30,
    },
    codeFiledRoot: {
      // marginTop: 20
    },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 1,
      borderColor: 'white',
      textAlign: 'center',
      borderRadius: 5,
      backgroundColor: '#c2d5f5',
      margin: 2
    },
    focusCell: {
      borderColor: '#000',
    },
    errorText:{
      color: 'red',
      padding: 10,
      borderWidth: 1,
      borderColor: 'red',
      margin: 10,
      borderRadius: 10,
      textAlign: 'center'
    }
  
  });
