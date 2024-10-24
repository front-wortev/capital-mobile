import React from 'react';
import { View } from 'react-native';
import { CuentaCreada } from '../cuenta-creada/CuentaCreada';
import { SubirDocs } from '../subir-docs/SubirDocs';
import Swiper from 'react-native-swiper';
import { sliderStyles } from './sliderStyles';
import { useSelector } from 'react-redux';

export const Slider = ({navigation}) => {

  const userData = useSelector((state) => state.user.userData)
  const personType = useSelector((state) => state.auth.personType)

  const handleTypePerson = () => {
    if ( userData.person_type === 'persona_fisica_sf' || personType === 'persona_fisica_sf' ) {
      navigation.navigate('DatosInversionista')
    } else {
      navigation.navigate('Datos-inversionista-moral')
    }
  }

  return(
    <Swiper loop={false} dot={<View style={sliderStyles.dot} />} activeDot={<View style={sliderStyles.dotActive} />}>
      <CuentaCreada />
      <SubirDocs 
        onPress={() => navigation.navigate('OnboardingApp')}
        onPressButton={handleTypePerson}
      />
    </Swiper>
  );
}