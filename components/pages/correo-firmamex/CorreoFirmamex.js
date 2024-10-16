import React from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { correoFirmamexStyles } from './correoFirmamexStyles'
import { FontAwesome5 } from '@expo/vector-icons'
import { HyperLink } from '../../atoms/HyperLink'
import { useHeaderHeight } from '@react-navigation/elements'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

export const CorreoFirmamex = () => {

  const userData = useSelector((state) => state.user.userData);
  const contentData = useSelector((state) => state.data.correoFirmamex.data.attributes)

  const textoFirmamex = contentData.texto_correoFirmamex_1.replace('[correo]', userData.email)

  const headerHeigth = useHeaderHeight()

  return (
    <View style={[correoFirmamexStyles.container, {paddingTop: headerHeigth + 100}]}>
        <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: '1000%'}}
        />
        <Texts type='h1' >{contentData.title_correoFirmamex}</Texts>
        <Texts type='pLarge' extraStyles={{textAlign: 'center'}}>{textoFirmamex.split(userData.email)[0]}<Texts type='pLarge' extraStyles={{color: '#14DA13'}} >{userData.email}</Texts> {textoFirmamex.split(userData.email)[1]}</Texts>
        <Texts type='h3' extraStyles={{textAlign: 'center'}}>{contentData.texto_correoFirmamex_2}</Texts>
        <View style={{gap: 12}}>
          <Texts type='pSmall' extraStyles={{textAlign: 'center', color: '#828282'}}>{contentData.texto_info_correoFirmamex_1}</Texts>
          <Texts type='pSmall' extraStyles={{textAlign: 'center', color: '#828282'}}>{contentData.texto_info_correoFirmamex_2}</Texts>
        </View>
        <View style={correoFirmamexStyles.fila}>
          <FontAwesome5 name="exclamation-circle" size={24} color="#14DA13" />
          <HyperLink>Contactar a soporte</HyperLink>
        </View>
    </View>
  )
}