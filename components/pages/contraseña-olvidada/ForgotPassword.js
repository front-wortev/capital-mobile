import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { forgotPasswordStyles } from './forgotPasswordStyles'
import { Button } from '../../atoms/Button'
import { TextInput } from 'react-native-gesture-handler'
import { API_BASE } from '@env'
import { useFetch } from '../../../hooks/useFetch'
import { LinearGradient } from 'expo-linear-gradient'
import { GradientCircle } from '../InversionesHome/GradientCircle'
import { reusableStyles } from '../../reusableStyles'
import { useSelector } from 'react-redux'

export const ForgotPassword = ({navigation}) => {

    const forgotPasswordData = useSelector((state) => state.data.forgotPassword.data)

    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailFocus = () => {
        setEmailIsFocused(true);
    }

    const handleEmailBlur = () => {
        setEmailIsFocused(false);
        if (emailValue === '') {
            setEmailIsInvalid(true);
        } else {
            setEmailIsInvalid(false);
        }
    }

    const handleRecuperarPasword = async() => {

        const apiBase = API_BASE
        const endPoint = '/recuperar-password'

        const user = {
          email: emailValue,
        };

        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")      

        const fetchResponse = await useFetch(apiBase + endPoint, headers, 'POST', user, 'normal');
        console.log(fetchResponse)
        if (fetchResponse.message === 'Email de recuperación enviado.') {
            console.log(fetchResponse)
            navigation.navigate('Correo-Password', { email: emailValue });
          } else { if(fetchResponse.message === 'The given data was invalid.') {
                    setEmailError('Es necesario introducir un correo');
                    setEmailIsInvalid(true)
                } else {
                    setEmailError(fetchResponse.message)
                    setEmailIsInvalid(true)
                }
            } 
    }

  return (
    <SafeAreaView style={{height: '100%'}}>

    <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={reusableStyles.background}
    />

    <View style={{position: 'absolute', top: '70%',right: '45%'}}>
        <GradientCircle extraStyles={{opacity: 0.2}} color='#14DA131A' />
    </View>

    <View style={{position: 'absolute', top: '-8%',left: '45%'}}>
        <GradientCircle extraStyles={{opacity: 0.7}} color='#C2E0F64D' />
    </View>

    <View style={forgotPasswordStyles.container}>
        <Texts type='h1' >{forgotPasswordData.title_ForgotPassword}</Texts>
        <Texts type='p' extraStyles={{textAlign: 'center'}} >{forgotPasswordData.texto_ForgotPassword}</Texts>

        <View style={forgotPasswordStyles.inputContainer}>
            <Texts type='h2' >Correo electrónico</Texts>
            <TextInput 
                style={[
                    forgotPasswordStyles.input,
                    emailIsFocused && forgotPasswordStyles.focusedInput,
                    emailIsInvalid && forgotPasswordStyles.invalidInput
                ]}
                placeholder='hola@wortev.com'
                inputMode='email'
                value={emailValue}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                onChangeText={(text) => setEmailValue(text)}
            />
            {emailError ? (
                <Texts type="pSmall" extraStyles={forgotPasswordStyles.errorMessage}>
                    {emailError}
                </Texts>
            ) : null}

        </View>

        <Button type={forgotPasswordData.btn1.Type} size={forgotPasswordData.btn1.size} onPress={handleRecuperarPasword} >{forgotPasswordData.btn1.ButtonText}</Button>
    </View>
    </SafeAreaView>
  )
}
