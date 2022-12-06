import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, Text, } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

function InviteInput() {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

  return (
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
  )
}

export default InviteInput

const styles = StyleSheet.create({
  
    root: {
        padding: 20, 
        // minHeight: 300
    },
    title: {
        textAlign: 'center', 
        fontSize: 30
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
      borderColor: '#000000',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  
  });
