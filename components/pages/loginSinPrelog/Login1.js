import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { login1Styles } from './login1Styles'
import { Button } from '../../atoms/Button'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { HyperLink } from '../../atoms/HyperLink'
import Checkbox from 'expo-checkbox'
import { useDispatch } from 'react-redux'
import { InputPassword } from '../../organisms/InputPassword'
import { storeData } from '../../functions/helpers/storageHelper'
import { handleLogin } from '../../functions/authFunctions'
import { LinearGradient } from 'expo-linear-gradient'
import { GradientCircle } from '../InversionesHome/GradientCircle'
import { Logo } from '../../atoms/Logo'

export const Login1 = ({navigation}) => {


    const dispatch = useDispatch();

    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const [passwordValue, setPasswordValue] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isSelected, setSelection] = useState(false);

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

    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/(^|\s)\S/g, function(char) {
            return char.toUpperCase();
        });
    }

    const login = async () => {
        const result = await handleLogin(emailValue, passwordValue, navigation, dispatch);
        if (!result.success) {
            if (result.message.includes('correo')) {
                setEmailError(result.message);
                setPasswordError('');
            } else if (result.message.includes('contraseña')) {
                setPasswordError(result.message);
                setEmailError('');
            }
        } else {
            const userDataToSave = {
                email: result.userData.email,
                first_name: capitalizeWords(result.userData.first_name),
                last_name: result.userData.last_name
            };
            isSelected && await storeData('userData', JSON.stringify(userDataToSave))
        }
    };    

    return (
        <SafeAreaView style={login1Styles.screen}>
            <LinearGradient
                colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={login1Styles.background}
            />

            <View style={{position: 'absolute', top: '70%',right: '45%'}}>
                <GradientCircle extraStyles={{opacity: 0.2}} color='#14DA131A' />
            </View>

            <View style={{position: 'absolute', top: '-8%',left: '45%'}}>
                <GradientCircle extraStyles={{opacity: 0.7}} color='#C2E0F64D' />
            </View>

            <View style={login1Styles.conteiner} >
                <View style={{marginBottom: '20%'}}>
                    <Logo/>
                </View>
                <Texts type='h1'>Inicia sesión</Texts>

                <View style={login1Styles.inputsContainer} >

                    <View>
                        <Texts type='p' >Correo electrónico</Texts>
                        <TextInput 
                            style={[
                                login1Styles.input,
                                emailIsFocused && login1Styles.focusedInput,
                                emailIsInvalid && login1Styles.invalidInput
                            ]}
                            placeholder='hola@wortev.com'
                            inputMode='email'
                            value={emailValue}
                            onFocus={handleEmailFocus}
                            onBlur={handleEmailBlur}
                            onChangeText={(text) => setEmailValue(text)}
                            autoCapitalize='none'
                        />
                        {emailError && (
                            <Texts type="pSmall" extraStyles={login1Styles.errorMessage}>
                                {emailError}
                            </Texts>
                        )}
                    </View>

                    <View>
                        <InputPassword
                            value={passwordValue}
                            onChangeText={(text) => setPasswordValue(text)}
                        />                        
                        {passwordError && (
                            <Texts type="pSmall" extraStyles={login1Styles.errorMessage}>
                                {passwordError}
                            </Texts>
                        )}
                    </View>

                    <View>
                        <HyperLink extraStyles={login1Styles.hyperLink} onPress={() => navigation.navigate('Recuperar-Password')}>Olvidé mi contraseña</HyperLink>
                    </View>

                    <View style={login1Styles.checkboxContainer}>
                        <Checkbox 
                            style={login1Styles.checkbox} 
                            value={isSelected} 
                            onValueChange={setSelection}
                            color= { isSelected ? '#14DA13' : '#2B2B2B'} />
                        <Texts type='pLarge'>Recuérdame</Texts>
                    </View>
                    
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Button type='secondary' size='btnLarge' onPress={login}>Ingresar</Button>
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}
