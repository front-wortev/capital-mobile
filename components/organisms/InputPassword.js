import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Texts } from '../atoms/Texts'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { reusableStyles } from '../reusableStyles'

export const InputPassword = ({value, onChangeText, label, placeholder}) => {

    const [passwordIsFocused, setPasswordIsFocused] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [ passwordVisible, setPasswordVisible ] = useState(false);

    const handleVisiblePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handlePasswordFocus = () => {
        setPasswordIsFocused(true);
    }

    const handlePasswordBlur = () => {
        setPasswordIsFocused(false);
        if (value === '') {
            setPasswordIsInvalid(true);
        } else {
            setPasswordIsInvalid(false);
        }
    }
  return (
    <View >
        <Texts type='p' >{ label ? label : 'Contraseña'}</Texts>
        <View
            style={[
                reusableStyles.input,
                passwordIsFocused && reusableStyles.focusedInput,
                passwordIsInvalid && reusableStyles.invalidInput,
                {marginTop: 8}
            ]}
        >

            <TextInput 
                style={{height: '100%', width:'80%',fontSize: 16, fontFamily: 'Poppins'}}
                placeholder={placeholder ? placeholder : '••••••••••••'}
                inputMode='text'
                value={value}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                secureTextEntry={passwordVisible ? false : true}
                onChangeText={onChangeText}
            />
            <Pressable style={{marginHorizontal: '8%'}} onPress={handleVisiblePassword} >
                {
                    passwordVisible === true ?
                        <Ionicons name="eye" size={24} color="#BDBDBD" />
                    :
                        <Ionicons name="eye-off" size={24} color="#BDBDBD" />
                }

            </Pressable>
        </View>
    </View> 
  )
}
