import { View } from 'react-native'
import React from 'react'
import { reusableOnboardingStyles } from '../reusableOnboardingStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';


export const BottomTab = ({ activeIcon }) => {
  return (
    <View style={ reusableOnboardingStyles.bottomBar }>
        <Icon name="home" size={32} color="#2B2B2B" />
        <Icon style={ [reusableOnboardingStyles.dollarIcon, {backgroundColor: activeIcon === 'dollar-sign' ? '#14DA13' : '#D9D9D9'}] } name="dollar-sign" size={25} color={ '#FFFFFF' }  />
        <Icon name="calculator" size={32} color={activeIcon === 'calculator' ? '#14DA13' : '#D9D9D9'} />
        <Icon name="gift" size={32} color={activeIcon === 'gift' ? '#14DA13' : '#D9D9D9'} />
      </View>
  )
}
