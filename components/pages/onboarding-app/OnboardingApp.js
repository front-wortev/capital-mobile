import React from 'react'
import { View, Image } from 'react-native';
import { Texts } from '../../atoms/Texts';
import { onboardingAppStyles } from './OnboardingAppStyles';
import { GoForward } from '../../atoms/GoForward';
import { LinearGradient } from 'expo-linear-gradient';

export const OnboardingApp = ({navigation}) => {

  const logo = require('../../../assets/images/wc-logo.png');

  return (

    <View style={ onboardingAppStyles.container } >
      <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />

      <View style={ onboardingAppStyles.textContainer }>
        <Texts type="h1" extraStyles={ [onboardingAppStyles.pSmall, {fontSize: 30}] }>Hola,</Texts>
        <Texts type='h1' extraStyles={ [onboardingAppStyles.h1, { color: '#14da13', fontSize: 35 }] }>inversionista</Texts>
        <Texts type='p' extraStyles={ onboardingAppStyles.p }><Texts type='p' extraStyles={ { fontFamily: 'Poppins-Bold'} } >WORTEV CAPITAL </Texts>es el fondo de capital emprendedor que te da la oportunidad de invertir con un rendimiento anual del 24% fijo bruto depositado en tu cuenta bancaria.</Texts>
        <View style={ onboardingAppStyles.forwardButton }>
          <GoForward extraStyles={{marginTop: 50}} onPress={() => navigation.navigate('OnboardingApp01')} />
        </View> 
      </View>

    </View>
  )

}
