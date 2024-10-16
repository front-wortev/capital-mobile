import React from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { datosMoralStyles } from './datosMoralStyles'
import { Inputs } from '../../organisms/Inputs'
import { GoForward } from '../../atoms/GoForward'
import { API_BASE } from '@env'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { ScrollView } from 'react-native-gesture-handler'
import { InputPhone } from '../../organisms/InputPhone'
import { LinearGradient } from 'expo-linear-gradient'

export const DatosMoral = ({navigation}) => {

  const tokenRedux = useSelector((state) => state.session.token)
  const userData = useSelector((state) => state.user.userData)

  const [ razonSocial, setRazonSocial ] = useState('')
  const [ rfcMoral, setRfcMoral ] = useState('')
  const [ telMoral, setTelMoral ] = useState('')  
  const [ errors, setErrors ] = useState({})

  const handleRfcChange = (text) => {
    setRfcMoral(text.toUpperCase());
  };

  const handleUpdatePerfilMoral = async() => {
    const apiBase = API_BASE
    const endPoint = '/perfil/update/moral'
    const token = tokenRedux.access_token

    const updateProfile = {
      razon_social: razonSocial,
      rfc_moral: rfcMoral,
      telefono: telMoral,
    }    

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json") 
    headers.append("Authorization", `Bearer ${token}`)

    const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', updateProfile, 'normal')

    if(fetchResult.message === 'success') {
      navigation.navigate('Slider')
    } else if (fetchResult.message === 'error') {
      setErrors(fetchResult.data)
    }
  }
  return (
      <ScrollView>
        <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <View style={datosMoralStyles.container}>
            <View style={{gap: 10, marginVertical: 20}}>
              <Texts type='h2' extraStyles={{fontFamily: 'Poppins-Bold'}} >Persona moral</Texts>
              <Texts type='p' >Por favor, llena los campos tal como se presenta en tu documentación oficial.</Texts>
            </View>
            <View style={{gap: 20}}>
              <Inputs 
                requireValue={true}
                inputMode='text'
                value={razonSocial}
                onChangeText={(text) => setRazonSocial(text)}
                extraStyles={{width: '100%'}} 
                autoCapitalize="words"
              >
                Razón Social
              </Inputs>
              { errors.razon_social && 
                <Texts type="pSmall" extraStyles={datosMoralStyles.errorMessage}>{errors.razon_social}</Texts>
              }
              <Inputs 
                requireValue={true}
                inputMode='text'
                value={rfcMoral}
                onChangeText={handleRfcChange}
                placeholder='12 dígitos' 
                extraStyles={{width: '100%'}} 
                autoCapitalize='characters'
                maxLength={12}
              >
                RFC
              </Inputs>
              { errors.rfc_moral && 
                <Texts type="pSmall" extraStyles={datosMoralStyles.errorMessage}>{errors.rfc_moral}</Texts>
              }
              <InputPhone
                requireValue={true}
                value={telMoral}
                onChangeText={(text) => setTelMoral(text)}
                extraStyles={{width: '100%'}}
                maxLength={10}
              > 
                Número telefónico
              </InputPhone>    
              { errors.telefono && 
                <Texts type="pSmall" extraStyles={datosMoralStyles.errorMessage}>{errors.telefono}</Texts>
              }
              <Inputs inputMode='text' value={userData.email} editable={false} extraStyles={{width: '100%'}}>Correo electrónico</Inputs>
            </View>

              <View style={datosMoralStyles.forwardButton}>
                <GoForward onPress={handleUpdatePerfilMoral} />
              </View>

        </View>
      </ScrollView>
  )
}
