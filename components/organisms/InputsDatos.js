import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { reusableStyles } from '../reusableStyles'
import { FontAwesome5 } from '@expo/vector-icons'

export const InputsDatos = (props) => {

  const { placeholder, secureTextEntry, value, requireValue, inputMode, onChangeText = () => null, extraStyles, editable = true, keyboard = 'numeric', icon = undefined, onBlur, currency = false} = props

  const [ isFocused, setIsFocused ] = useState(false);
  const [ isRequired, setIsRequired ] = useState(false);
  const [ invalidInput, setInvalidInput ] = useState(false)
  



  useEffect(() => {
    setIsRequired(requireValue)
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


      <Text style={reusableStyles.inputLabelDatos}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabelDatos, {color: '#14da13'}]}>*</Text>}</Text> 

      <TextInput
        style={[editable ? [reusableStyles.inputText, isFocused && reusableStyles.focusedInput, invalidInput && reusableStyles.invalidInput, icon && reusableStyles.paddingIcon] : [reusableStyles.des], { textAlign: (currency ? 'right' : 'justify'), paddingHorizontal: (currency ? 63 : 13)}]} 
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        onChangeText={onChangeText}
        selectTextOnFocus={true} 
        onFocus={() => setIsFocused(true)} 
        onBlur={handleInvalidInput} 
        keyboardType={keyboard}
        editable={editable}
      />

      {
        icon && editable && <FontAwesome5 name={icon} size={ 25 } color = { '#000'} style={{ position: 'absolute' , top: 32, left: 10}}/>
      }

      {
        currency && <Text style={{ position: 'absolute', right: 33, top:35}} >MXN</Text>
      }

    </View>
  )
}