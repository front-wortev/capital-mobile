import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native'
import { API_BASE } from '@env'
import { useFetch } from '../../../hooks/useFetch'
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { LinearGradient } from 'expo-linear-gradient'
import { reusableStyles } from '../../reusableStyles'
import { InputPassword } from '../../organisms/InputPassword'
import { useSelector } from 'react-redux'
import { Modals } from '../../molecules/Modals'
import { forgotPasswordStyles } from './forgotPasswordStyles'
import { Logo } from '../../atoms/Logo'

export const ResetPassword = ({navigation}) => {

  const tokenRedux = useSelector((state) => state.session.token)

  const [newPassword, setNewPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [errors, setErrors] = useState()
  const [modalVisbleSuccess, setModalVisibleSuccess] = useState(false)
  

  const handleSuccess = () => {    
    navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }],
    });
  }
  
  return (
    <SafeAreaView style={forgotPasswordStyles.containerReset}>
      <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={reusableStyles.background}
      />
      <View style={forgotPasswordStyles.text}>
        <Logo/>
        <Texts type="h1" extraStyles={{textAlign: 'center', marginTop: 60}} >Crea una nueva contraseña</Texts>
      </View>
      <View style={[forgotPasswordStyles.inputs, {marginBottom: 50}]}>
        <View style={{marginBottom: 20}}>
          <InputPassword 
            label='Nueva constraseña'
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <Texts type='pSmall' extraStyles={{ color: newPassword.length >= 8 ? '#14DA13' : '#E20000', marginTop: 5 }}>Debe tener al menos 8 caracteres</Texts>
        </View>
        <View style={{marginBottom: 15}}>
          <InputPassword 
            label='Confirmar constraseña' 
            placeholder='Nueva ontraseña' 
            value={confPassword}
            onChangeText={(text) => setConfPassword(text)}
          />
          {
            errors?.confirmNewPassword && <Texts type='pSmall' extraStyles={{color: '#E20000', marginTop: 5}} >{errors.confirmNewPassword}</Texts>
          }
        </View>
      </View>
      <Button type={'secondary'} size={'btnLarge'} extraStyles={{width: '110%'}} onPress={() => setModalVisibleSuccess(true)} >GUARDAR</Button>

      <Modals
        visible={modalVisbleSuccess}
        icon='check-circle'
        description='La contraseña fue actualizada con éxito.'
        buttonText='INICIAR SESIÓN'
        typeButton='primary'
        onButtonPress={handleSuccess}
      />
    </SafeAreaView>
  )
}
