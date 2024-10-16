import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { API_BASE } from '@env'
import { useFetch } from '../../../hooks/useFetch'
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { changePasswordStyles } from './changePasswordStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { reusableStyles } from '../../reusableStyles'
import { InputPassword } from '../../organisms/InputPassword'
import { useSelector } from 'react-redux'
import { Modals } from '../../molecules/Modals'

export const ChangePassword = ({navigation}) => {

  const tokenRedux = useSelector((state) => state.session.token)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [errors, setErrors] = useState()
  const [modalVisbleSuccess, setModalVisibleSuccess] = useState(false)


  const handleChangePassword = async() => {
      const apiBase = API_BASE
      const endPoint = '/perfil/newpassword'
      const token = tokenRedux.access_token

      const changePassword = {
        oldpassword: password,
        newPassword: newPassword,
        confirmNewPassword: confPassword,
      }    
  
      const headers = new Headers()
      headers.append("Accept", "application/json")
      headers.append("Content-Type", "application/json") 
      headers.append("Authorization", `Bearer ${token}`)
  
      const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', changePassword,'normal')

      if(fetchResult.message === 'La contraseña fue actualizada con éxito.') {
        setModalVisibleSuccess(true)
      } else {
        if(fetchResult.message === 'Error') {
          setErrors(fetchResult.data)
        } 
        if(fetchResult.message === 'La contraseña actual no coincide con la contraseña en sistema.') {
          setErrors(fetchResult.message)
        }
      }        
  }

  const handleSuccess = () => {    
    navigation.goBack()
  }
  
  return (
    <SafeAreaView style={changePasswordStyles.container}>
      <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={reusableStyles.background}
      />
      <View style={changePasswordStyles.text}>
        <Texts type="h1" extraStyles={{textAlign: 'center'}} >Crea una nueva contraseña</Texts>
      </View>
      <View style={[changePasswordStyles.inputs, {marginBottom: 50}]}>
        <View style={{marginBottom: 15}}>
          <InputPassword 
            label='Contraseña actual' 
            placeholder='Ingresa tu contraseña' 
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {
            errors?.oldpassword  && <Texts type='pSmall' extraStyles={{color: '#E20000', marginTop: 5}} >{errors.oldpassword}</Texts>
          }
          {
            errors === 'La contraseña actual no coincide con la contraseña en sistema.' && <Texts type='pSmall' extraStyles={{color: '#E20000', marginTop: 5}}>{errors}</Texts>
          }
        </View>
        <View style={{marginBottom: 20}}>
          <InputPassword 
            label='Nueva constraseña' 
            placeholder='Nueva contraseña' 
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <Texts type='pSmall' extraStyles={{ color: newPassword.length >= 8 ? '#14DA13' : '#E20000', marginTop: 5 }}>Debe tener al menos 8 caracteres</Texts>
        </View>
        <View style={{marginBottom: 15}}>
          <InputPassword 
            label='Confirmar constraseña' 
            placeholder='Nueva contraseña' 
            value={confPassword}
            onChangeText={(text) => setConfPassword(text)}
          />
          {
            errors?.confirmNewPassword && <Texts type='pSmall' extraStyles={{color: '#E20000', marginTop: 5}} >{errors.confirmNewPassword}</Texts>
          }
        </View>
      </View>
      <Button type={'secondary'} size={'btnLarge'} onPress={handleChangePassword} >GUARDAR</Button>

      <Modals
        visible={modalVisbleSuccess}
        icon='check-circle'
        description='La contraseña fue actualizada con éxito.'
        buttonText='OK'
        typeButton='primary'
        onButtonPress={handleSuccess}
      />
    </SafeAreaView>
  )
}
