import React, { useState } from 'react'
import { View } from 'react-native'
import { BottomTab } from '../../molecules/BottomTab'
import { onboardingAppStyles } from '../../pages/onboarding-app/OnboardingAppStyles'
import Slide from './Slide'
import { HomeOnboarding } from './HomeOnboarding'
import { LinearGradient } from 'expo-linear-gradient'

export const OnboardingApp01 = ({navigation}) => {

  const data = [
    { 
        title: 'Aquí comienza el impacto',
        description: 'Invierte desde $10,000 MXN y crece tu dinero apoyando empresas mexicanas.'
    },
    { 
        title: '¿Cuánto quieres invertir?' ,
        description: 'Calcula los rendimientos con montos hipotéticos, según tus preferencias.'
    },
    { 
        title: 'Disfruta de beneficios extra',
        description: 'Participa en el Programa de Referidos y recibe bonos adicionales.'
    },
    
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIcon, setActiveIcon] = useState('dollar-sign');

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);

    switch (index) {
      case 0:
        setActiveIcon('dollar-sign');
        break;
      case 1:
        setActiveIcon('calculator');
        break;
      case 2:
        setActiveIcon('gift');
        break;
      default:
        setActiveIcon('');
        break;
    }

  };

  return (
    <View style={ onboardingAppStyles.container }>
      <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <HomeOnboarding/>
        <Slide data={data}
        currentIndex={currentIndex}
        onIndexChanged={handleIndexChanged} 
        onPress={() => navigation.navigate('Profile')} 
        />
        <BottomTab activeIcon={activeIcon}/>
    </View>
  )
}
