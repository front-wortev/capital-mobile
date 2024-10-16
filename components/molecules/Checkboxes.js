import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { reusableStyles } from '../reusableStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Checkboxes = (props) => {

  const { requireValue, extraStyles, option1, option2, onOption1Select, onOption2Select, preselectedValue } = props;

  const [ isRequired, setIsRequired ] = useState(false);
  const [ isChecked1, setIsChecked1 ] = useState(false);
  const [ isChecked2, setIsChecked2 ] = useState(false);

  useEffect(() => {
    setIsRequired(requireValue);
    if (preselectedValue === option1) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else if (preselectedValue === option2) {
      setIsChecked1(false);
      setIsChecked2(true);
    }
  }, [requireValue, preselectedValue, option1, option2]);

  const handleCheckboxPress1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked2(false);
    if (!isChecked1 && onOption1Select) {
      onOption1Select();
    }
  }

  const handleCheckboxPress2 = () => {
    setIsChecked1(false);
    setIsChecked2(!isChecked2);
    if (!isChecked2 && onOption2Select) {
      onOption2Select();
    }
  }

  return(
    <View style={[reusableStyles.inputContainer, extraStyles]}>


      <Text style={reusableStyles.inputLabel}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Text> 

      <View style={[{flexDirection:'row'}, extraStyles]}>
        <Pressable onPress={handleCheckboxPress1} style={reusableStyles.checkboxGap}>
          <Checkbox style={reusableStyles.checkbox} color={isChecked1 && '#14da13'} value={isChecked1} onValueChange={handleCheckboxPress1} />

          <Text style={reusableStyles.checkboxText}>{option1}</Text>
        </Pressable>

        <Pressable onPress={handleCheckboxPress2} style={reusableStyles.checkboxGap}>
          <Checkbox style={reusableStyles.checkbox} color={isChecked2 && '#14da13'} value={isChecked2} onValueChange={handleCheckboxPress2} />

          <Text style={reusableStyles.checkboxText}>{option2}</Text>
        </Pressable>
      </View>

    </View>
  );
}