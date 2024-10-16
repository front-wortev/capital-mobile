import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { reusableStyles } from '../reusableStyles';

export const Inputs = (props) => {

  const { placeholder, secureTextEntry, value, requireValue, inputMode, onChangeText, extraStyles, editable = true, keyboard , autoCapitalize = 'none', error, message, maxLength} = props;

  const [ isFocused, setIsFocused ] = useState(false);
  const [ isRequired, setIsRequired ] = useState(false);
  const [ invalidInput, setInvalidInput ] = useState(false);
  



  useEffect(() => {
    setIsRequired(requireValue);
  }, []);

  const handleInvalidInput = () => {
    setIsFocused(false)
    if(value === '') {
      setInvalidInput(true)
    } 
    else {
      setInvalidInput(false)
    }
  }

  return(
    <View style={[reusableStyles.inputContainer, extraStyles]}>


      <Text style={reusableStyles.inputLabel}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Text> 

      <TextInput 
        style={error ? reusableStyles.invalidInput : editable ? [reusableStyles.inputText, isFocused && reusableStyles.focusedInput, invalidInput && reusableStyles.invalidInput] : [reusableStyles.des]} 
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        onChangeText={onChangeText}
        selectTextOnFocus={true} 
        onFocus={() => setIsFocused(true)} 
        onBlur={handleInvalidInput} 
        keyboardType={keyboard}
        editable={editable}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
      />

        {/* <Text style={{position: 'absolute', color: 'red', right: 0, bottom: -28, fontSize: 10, fontFamily: 'Poppins'}}>mensaje de error{message}</Text> */}

      {
        error && <Text style={{position: 'relative', color: 'red', left: 0, bottom: 0, fontSize: 10, fontFamily: 'Poppins'}}>{message}</Text>
      }

    </View>
  );
}