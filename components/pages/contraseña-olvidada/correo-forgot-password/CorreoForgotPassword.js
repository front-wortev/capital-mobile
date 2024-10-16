import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { API_BASE } from '@env'
import { SafeAreaView, View } from 'react-native'
import { reusableStyles } from '../../../reusableStyles'
import { Texts } from '../../../atoms/Texts'
import { forgotPasswordStyles } from '../forgotPasswordStyles'
import { Button } from '../../../atoms/Button'
import { useFetch } from '../../../../hooks/useFetch'
import { useRoute } from '@react-navigation/native'
import { Modals } from '../../../molecules/Modals'
import { GradientCircle } from '../../InversionesHome/GradientCircle'
import { useSelector } from 'react-redux'

export const CorreoForgotPassword = () => {

    const route = useRoute()

    const { email } = route.params;

    const correoForgotPasswordData = useSelector((state) => state.data.correoForgotPassword.data)

    console.log(correoForgotPasswordData.btn1.size);

    const [ modalVisibleEmailReenviado, setModalVisibleEmailReenviado ] = useState(false)
    const [ emailReenviado, setEmailReenviado ] = useState('')

    const handleRecuperarPasword = async() => {

        const apiBase = API_BASE
        const endPoint = '/recuperar-password'

        const user = {
          email: email,
        };

        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")      

        const fetchResponse = await useFetch(apiBase + endPoint, headers, 'POST', user, 'normal');
        console.log(fetchResponse)
        if (fetchResponse.message === 'Email de recuperación enviado.') {
            setEmailReenviado(fetchResponse.message)            
            setModalVisibleEmailReenviado(true)
          }
    }

  return (
    <SafeAreaView style={{height: '100%', marginTop: '5%'}}>
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

        <View style={[forgotPasswordStyles.container, {alignContent: 'center', paddingHorizontal: 24}]}>
            <Texts type='h2' >Revisa tu correo</Texts>
            <Texts type='p' extraStyles={{textAlign: 'center'}} >{correoForgotPasswordData.texto_CorreoForgotPassword_1}</Texts>
            <Texts type='p' extraStyles={{textAlign: 'center'}}>{correoForgotPasswordData.texto_CorreoForgotPassword_2}</Texts>
            <Texts type='h2' extraStyles={{color: '#14DA13', marginVertical: 20}} >{email}</Texts>
            <View>
                <Button type={correoForgotPasswordData.btn1.Type} size={correoForgotPasswordData.btn1.size} onPress={handleRecuperarPasword} >{correoForgotPasswordData.btn1.ButtonText}</Button>                                 
            </View>
        </View>

        <Modals
            visible={modalVisibleEmailReenviado}
            vectoricon='check-circle'
            description={emailReenviado}
            buttonText='OK'
            onButtonPress={() => setModalVisibleEmailReenviado(false)}
        />
    </SafeAreaView>
  )
}
