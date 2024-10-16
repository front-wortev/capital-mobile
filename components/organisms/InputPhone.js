import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { reusableStyles } from '../reusableStyles'
import { Text, View } from 'react-native'
import { Texts } from '../atoms/Texts'

export const InputPhone = (props) => {

  const { placeholder, value, requireValue, onChangeText, extraStyles, editable = true, autoCapitalize = 'none', error, maxLength} = props;

  const [ isFocused, setIsFocused ] = useState(false);
  const [ isRequired, setIsRequired ] = useState(false);
  const [ invalidInput, setInvalidInput ] = useState(false);
  const [ telefonoValido, setTelefonoValido ] = useState(false);

  useEffect(() => {
    setIsRequired(requireValue);
  }, []);

  const handleInvalidInput = () => {
    setIsFocused(false);
  
    if (value.length !== 10) {
      setTelefonoValido(true);
      setInvalidInput(true);
    } else {
      setTelefonoValido(false);
      setInvalidInput(false);
    }
  }
  

  return (
    <View style={[reusableStyles.inputContainer, extraStyles]}>

      <Text style={reusableStyles.inputLabel}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Text> 

      <View style={error ? reusableStyles.invalidInput : editable ? [reusableStyles.inputPhoneContainer, isFocused && reusableStyles.focusedInput, invalidInput && reusableStyles.invalidInput] : [reusableStyles.des]}>
        <Texts type='pLarge' extraStyles={{ padding: 8, paddingLeft: 13, }} >+52</Texts>
        <TextInput
          style={[reusableStyles.inputText, {width: '80%', height: 35, borderWidth: 0}]}
          placeholder={placeholder}
          value={value}
          inputMode='tel'
          onChangeText={onChangeText}
          selectTextOnFocus={true} 
          onFocus={() => setIsFocused(true)} 
          onBlur={handleInvalidInput}
          editable={editable}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />

      </View>

      {
        telefonoValido && <Text style={{position: 'relative', color: '#c20000', left: 0, bottom: 0, fontSize: 10, fontFamily: 'Poppins'}}>El teléfono debe ser de 10 dígitos</Text>
      }

    </View>
  )
}
