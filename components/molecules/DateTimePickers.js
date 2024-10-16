import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Texts } from '../atoms/Texts';
import DateTimePicker from '@react-native-community/datetimepicker'
import { reusableStyles } from '../reusableStyles';

export const DateTimePickers = (props) => {

  const { placeholder, requireValue, extraStyles, onDateChange } = props;

  const dropdown = require('../../assets/images/dropdown.png');

  const [ isRequired, setIsRequired ] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ update, setUpdate ] = useState(false);
  const [ show, setShow ] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);   
    setUpdate(true);
    onDateChange(currentDate);
  };

  useEffect(() => {
    setIsRequired(requireValue);
  });

  return(
    <View style={[reusableStyles.inputContainer, extraStyles]}>


      <Text style={reusableStyles.inputLabel}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Text> 

        <Pressable style={reusableStyles.datePicker} onPressIn={setShow}>
          <Texts type='pLarge' extraStyles={[!update && {color: '#828282', marginLeft: 13}, update && {marginLeft: 13}]}>{update ? date.toLocaleDateString() : placeholder}</Texts>
          {!update && <Image source={dropdown}/>}
          {
            show &&
            <DateTimePicker 
              value={date}
              mode={'date'}
              display={'spinner'}
              onChange={onChange}
            />
          }
        </Pressable>


    </View>
  );
}