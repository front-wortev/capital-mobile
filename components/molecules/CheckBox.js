import React, { useState} from 'react';
import { View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { reinversionesReusableStyles } from '../structure_five/reusable/reinversionesReusableStyles';
import { Texts } from '../../reusable/Texts';

export const CheckBox = (props) => {

  const { extraStyles, option1, option2 } = props;

  const [ isChecked1, setIsChecked1 ] = useState(true);
  const [ isChecked2, setIsChecked2 ] = useState(false);


  const handleCheckboxPress1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
  }

  const handleCheckboxPress2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
  }

  return(
    <View style={[reinversionesReusableStyles.inputContainer, extraStyles]}>


      <Texts type='h3' extraStyles={reinversionesReusableStyles.inputLabel}>{props.children}</Texts> 

      <View style={{flexDirection:'row', marginTop: 10}}>
        <View style={reinversionesReusableStyles.checkboxGap}>
          <Checkbox style={reinversionesReusableStyles.checkbox} color={isChecked1 && '#14da13'} value={isChecked1} onValueChange={handleCheckboxPress1} />

          <Texts type='pLarge' extraStyles={reinversionesReusableStyles.checkboxText}>{option1}</Texts>
        </View>

        <View style={reinversionesReusableStyles.checkboxGap}>
          <Checkbox style={reinversionesReusableStyles.checkbox} color={isChecked2 && '#14da13'} value={isChecked2} onValueChange={handleCheckboxPress2} />

          <Texts type='pLarge' extraStyles={reinversionesReusableStyles.checkboxText}>{option2}</Texts>
        </View>
      </View>

    </View>
  );
}
