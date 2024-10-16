import React from 'react'
import { View } from 'react-native'
import { Texts } from '../atoms/Texts'
import { reusableOnboardingStyles } from '../reusableOnboardingStyles'
import { Button } from '../atoms/Button'

export const CardHomeOnboarding = () => {
  return (
    <View style={ reusableOnboardingStyles.cardHome }>
        <Texts type='pSmall' extraStyles={{ color: '#757575' }} >Rendimientos</Texts>
        
        <View style={ reusableOnboardingStyles.rendimientos } >
            <Texts type='pLarge' extraStyles={{fontFamily: 'Poppins-Light', color: '#757575', paddingTop: 20}}>$</Texts>
            <Texts type='pLarge' extraStyles={{fontSize: 32, color: '#757575', paddingTop: 20}}>0</Texts>
            <Texts type='pLarge' extraStyles={{fontFamily: 'Poppins-Light', color: '#757575', paddingTop: 20}}>MXN</Texts>
        </View>

        <View style={ reusableOnboardingStyles.baseCard }>
            <View style={ reusableOnboardingStyles.textBaseCard }>
                <Texts type='pLarge' extraStyles={{fontSize: 16, color: '#757575'}} > 0 MXN </Texts>
                <Texts type='pSmall'> invertidos </Texts>
            </View>

            <Button type={'inactive'} size={'btnSmall'} disabled={true}>Invertir</Button>

        </View>

    </View>
  )
}