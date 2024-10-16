import React from 'react'
import { View } from 'react-native'
import { reusableHeaderStyles } from './reusableHeaderStyles'
import { Texts } from '../../atoms/Texts'
import { useSelector } from 'react-redux'

export const Header = ({currentPage}) => {

  const userData = useSelector((state) => state.user.userData)

  return (
    <View style={reusableHeaderStyles.container} >
        <Texts type='h1' extraStyles={ [reusableHeaderStyles.h1Light, {marginTop: 30, alignSelf: 'center'}] } >Hola, <Texts type='h1'>{userData.first_name}</Texts> </Texts>
        { currentPage === 3 ? 

          <View style={reusableHeaderStyles.fila}>
            <Texts type='h2' >¡Estás a un paso!</Texts>
            <Texts type='pLarge' >Sube tus documentos</Texts>
          </View>

          :

          <Texts type='p' extraStyles={ [reusableHeaderStyles.pSmall, {alignSelf: 'center', fontFamily: 'Poppins-Light'}] } >Completemos tu perfil de inversionista</Texts>
        }
        <View style={reusableHeaderStyles.progressBar} >
            <View style={[ reusableHeaderStyles.progress, { width: `${(currentPage / 3) * 100}%` } ]} />
        </View>
    </View>
  )
}
