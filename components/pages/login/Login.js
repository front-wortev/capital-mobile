import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { loginStyles } from './loginStyles'
import { Ionicons } from '@expo/vector-icons';
import {Texts} from '../../atoms/Texts'
import { useDispatch } from 'react-redux'
import { GoForward } from '../../atoms/GoForward';
import { getItemFor } from '../../functions/helpers/storageHelper';
import { handleLogin } from '../../functions/authFunctions';
import { reusableStyles } from '../../reusableStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '../../atoms/Logo';
import { GradientCircle } from '../InversionesHome/GradientCircle';

export const Login = ({navigation}) => {

    const dispatch = useDispatch();

    const [flagSecure, setFlagSecure] = useState(true)
    const [userData, setUserData] = useState({})
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const userDataString = await getItemFor('userData');
            if (userDataString !== null) {
                setUserData(JSON.parse(userDataString));
            } else {
                console.log("No se encontraron datos del usuario.");
            }
        };
        loadUserData();
    }, []);

    const login = async () => {
        const result = await handleLogin(userData.email, passwordValue, navigation, dispatch);
        if (!result.success) {
            if (result.message.includes('correo')) {
                setEmailError(result.message);
                setPasswordError('');
            } else if (result.message.includes('contraseña')) {
                setPasswordError(result.message);
                setEmailError('');
            }
        } else {
            console.log("Datos del usuario:", result.userData);
        }
    };

    return (

        <SafeAreaView>
            <LinearGradient
                colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={reusableStyles.background}
            />
            <View style={{position: 'absolute', top: '75%',right: '50%'}}>
                <GradientCircle extraStyles={{opacity: 0.1}} color='#14DA131A' />
            </View>

            <View style={{position: 'absolute', top: '-5%',left: '50%'}}>
                <GradientCircle extraStyles={{opacity: 0.5}} color='#C2E0F64D' />
            </View>
            <View style={loginStyles.mainContainer}>

                <View style={loginStyles.logoContainer}>
                    <Logo/>
                </View>

                <View style={loginStyles.nameContainer}>
                    <Texts type='h2' extraStyles={[ loginStyles.white, loginStyles.textNormal, loginStyles.left ]} >¡Hola,</Texts>
                    <Texts type='h1' extraStyles={[ loginStyles.white, loginStyles.textBold ]} > {userData.first_name}!</Texts>
                </View>

                <View style={loginStyles.inputContainer}>
                    <View style={loginStyles.passwordContainer}>
                        <View style={loginStyles.inputPasswordContainer}>
                            <TextInput 
                                style={loginStyles.input}
                                placeholder='Ingresa tu contraseña'
                                placeholderTextColor='#D9D9D9'
                                secureTextEntry={flagSecure}
                                password={true}
                                value={passwordValue}
                                onChangeText={(text) => setPasswordValue(text)}
                            ></TextInput>
                                                            
                            <View style={loginStyles.eyeContainer}>
                                <TouchableOpacity onPress={() =>  setFlagSecure(!flagSecure)}>
                                    {
                                        flagSecure ? 
                                            <Ionicons name="eye-off" size={24} color="#BDBDBD" />
                                        :
                                            <Ionicons name="eye" size={24} color="#BDBDBD" />
                                    }
                                    
                                </TouchableOpacity>
                            </View>

                        </View>
                        {passwordError && (
                            <Texts type="pSmall" extraStyles={loginStyles.errorMessage}>
                                {passwordError}
                            </Texts>
                            )}
                        {emailError && (
                            <Texts type="pSmall" extraStyles={loginStyles.errorMessage}>
                                {emailError}
                            </Texts>
                        )}
                    </View>
                    <View style={loginStyles.buttonContainer}>
                        <GoForward onPress={login}/>
                    </View>
                </View>

                <View style={loginStyles.forgotPassword}>
                    <TouchableOpacity onPress={() => navigation.navigate('Recuperar-Password')}>
                        <Texts type='p' extraStyles={[ loginStyles.linkGreen, {textAlign: 'left'}]} > Olvidé mi contraseña</Texts>
                    </TouchableOpacity>
                </View>

                <View style={loginStyles.logoContainer}>
                    <Ionicons name="finger-print-sharp" size={60} color="#7A7B7D" />
                </View>

                <View style={loginStyles.bottomContainer}>
                    <Texts type='p' extraStyles={[loginStyles.white, { paddingRight: 5}]}>¿No eres tú? </Texts>
                    <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
                        <Texts type='p' extraStyles={[ loginStyles.black, {textDecorationLine: 'underline'} ]}>Iniciar sesión</Texts>
                    </TouchableOpacity>
                    <Texts type='p'> / </Texts>
                    <TouchableOpacity onPress={() => navigation.navigate('Credenciales')}>
                        <Texts type='p' extraStyles={[ loginStyles.linkGreen]} > Crear cuenta</Texts>
                    </TouchableOpacity>
                </View>


            </View>

        </SafeAreaView>
    )

}
