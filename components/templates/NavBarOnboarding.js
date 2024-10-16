import React from 'react'
import { View } from 'react-native'
import { Hamburger } from '../molecules/hamburger'
import { Envelope } from '../molecules/Envelope'
import { reusableOnboardingStyles } from '../reusableOnboardingStyles'

export const NavBarOnboarding = ({disabled}) => {
  return (
    <View style={ reusableOnboardingStyles.navBar } >
        <Hamburger disabled={disabled} />
        <Envelope disabled={disabled} extraStyles={{ justifyContent: 'flex-end' }} />
    </View>
  )
}
