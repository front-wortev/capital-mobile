import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { Cards } from '../../molecules/Cards'
import { GoForward } from '../../atoms/GoForward'
import { useHeaderHeight } from '@react-navigation/elements'
import { datosPersonalesStyles } from './datosPersonalesStyles'
import { useDispatch, useSelector } from 'react-redux'
import { person_type } from '../../../redux/slices/authSlice'
import { useFetch } from '../../../hooks/useFetch' 
import { API_BASE } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import { reusableStyles } from '../../reusableStyles'

export const DatosPersonales = ({navigation}) => {

  const personTypeData = useSelector((state) => state.data.personType.data)

  const dispatch = useDispatch()

  const headerHeight = useHeaderHeight();

  const tokenRedux = useSelector((state) => state.session.token)

  const [ selectedButton, setSelectedButton ] = useState('persona_fisica')


  const handleAddPersonType = async() => {

    const apiBase = API_BASE
    const endPoint = '/user/update'
    const token = tokenRedux.access_token
  
    const body =  {
     'person_type' : selectedButton
    }

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${token}`)
    
    const fetch = await useFetch(apiBase+endPoint, headers, 'PUT', body, 'normal')

    if(selectedButton === 'persona_fisica_sf') {
      navigation.navigate('Datos')    
    } else {
      if(selectedButton === 'persona_moral') {
        navigation.navigate('Datos-Moral')
      }
    }
  
  }

  const handleChange = (buttonName) => {
    setSelectedButton(buttonName)
  }

  useEffect(() => {
    dispatch(person_type(selectedButton))
  },[selectedButton])

  return(
    <View style={datosPersonalesStyles.container}>
      <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={reusableStyles.background}
      />

      <View style={[datosPersonalesStyles.main, {marginTop: 50 + headerHeight}]}>


        <Texts type='h1' extraStyles={datosPersonalesStyles.h1}>{personTypeData.text_title}</Texts>

        <Texts type='pSmall' extraStyles={datosPersonalesStyles.pSmall}>{personTypeData.text_completaIvers}</Texts>

        <Texts type='h2' extraStyles={datosPersonalesStyles.h2}>{personTypeData.text_tipoPersona}</Texts>

        <View style={datosPersonalesStyles.cardsView}>
          <Cards 
            image='user'
            color={selectedButton === 'persona_fisica_sf' ? '#14DA13' : '#2B2B2B'}
            extraStyles={selectedButton === 'persona_fisica_sf' && {borderColor: '#14da13', borderWidth: 2}}
            handleChange={() => handleChange('persona_fisica_sf')}
          >
            {personTypeData.texto_Pfis}
          </Cards>

          <Cards 
            image='building'
            color={selectedButton === 'persona_moral' ? '#14DA13' : '#2B2B2B'}
            extraStyles={selectedButton === 'persona_moral' && {borderColor: '#14da13', borderWidth: 2}}
            handleChange={() => handleChange('persona_moral')}
          >
            {personTypeData.texto_Pmoral}
          </Cards>
        </View>

        <Texts type='pSmall' extraStyles={{textDecorationLine: 'underline'}}>Política de Privacidad</Texts>
      </View>

      <View style={datosPersonalesStyles.forwardButton}>
        <GoForward extraStyles={{marginTop: 50}} onPress={() => handleAddPersonType()} />
      </View>
      
      

    </View>
  )
}