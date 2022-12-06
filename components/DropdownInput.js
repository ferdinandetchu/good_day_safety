import { useState } from "react";
import { View, TextInput } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

export default function DropdownInput({navigation}) {
	const countries = ["Electrical", "Fire", "Plumbring", "Glass", "– Other – Describe"]

	const [selectedOption, setsSelectedOption] = useState(null)
  return (
		<View>
			<View style={{borderWidth: 1, borderColor: 'grey', marginTop: 10}}>
				<SelectDropdown
					data={countries}
					onSelect={(selectedItem, index) => {
						setsSelectedOption(selectedItem)
						console.log(selectedOption, index)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						// text represented after item is selected
						// if data array is an array of objects then return selectedItem.property to render after item is selected
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						// text represented for each item in dropdown
						// if data array is an array of objects then return item.property to represent item in dropdown
						return item
					}}
				/>
			</View>
			{ selectedOption === '– Other – Describe' && 
				<TextInput multiline style={{height: 100, borderWidth: 1, borderColor: 'black', marginTop: 10}} />
			}
		</View>
	)
}