import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { Texts } from '../atoms/Texts';
import { Dropdown } from 'react-native-element-dropdown';
import { reusableStyles } from '../reusableStyles';

export const DropdownPicker = (props) => {

  const { placeholder, requireValue, extraStyles, data, value, onChange, onBlur, onFocus, dropdownPosition } = props;

  const [ isRequired, setIsRequired ] = useState(false);

  useEffect(() => {
    setIsRequired(requireValue);
  });

  return(
    <View style={[reusableStyles.dropdownContainer, extraStyles]}>

      <Texts type='pSmall' extraStyles={reusableStyles.inputLabel}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Texts> 

      <Dropdown
        style={[reusableStyles.dropdown, extraStyles ]}
        containerStyle={reusableStyles.dropdownContainerList}
        itemTextStyle={reusableStyles.textItemDropdown}
        selectedTextStyle={reusableStyles.textSelectedDropdown}
        value={value}
        data={data}
        maxHeight={250}
        placeholder={placeholder}
        placeholderStyle={reusableStyles.dropdownPlaceholder}
        labelField="label"
        valueField="value"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        dropdownPosition={dropdownPosition}
      />
      

    </View>
   
  );
}