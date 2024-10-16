import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { Texts } from '../atoms/Texts';
import DropDownPicker from 'react-native-dropdown-picker';
import { reusableStyles } from '../reusableStyles';

export const DropdownDatos = (props) => {

  const { placeholder, requireValue, extraStyles, editable = true, valueDefault } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ahorros', value: 'ahorros'},
    {label: 'Estudiante', value: 'estudiante'},
    {label: 'Estado', value: 'queretaro'}
  ]);
  const [ isRequired, setIsRequired ] = useState(false);

  useEffect(() => {
    setIsRequired(requireValue)

    items.map((item) => {
        if(item.value === valueDefault)
            setValue(item.value)
    })
  });

  return(
    <View style={[reusableStyles.dropdownContainerDatos, extraStyles]}>

      <Texts type='pSmall' extraStyles={{color: '#757575'}}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14DA13'}]}>*</Text>}</Texts> 

      <DropDownPicker
        disabled={!editable}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        placeholderStyle={[reusableStyles.dropdownPlaceholder, {color: editable ? '#828282' : '#333'}]}
        dropDownDirection="DEFAULT"
        style={[reusableStyles.dropdownDatos, {borderWidth: editable ? 2 : 0, backgroundColor: editable ? '#FFF' : '#F2F5FA'}]}
      />
      

    </View>
   
  );
}