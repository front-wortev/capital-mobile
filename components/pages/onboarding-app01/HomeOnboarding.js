import React from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { reusableOnboardingStyles } from '../../reusableOnboardingStyles'
import { NavBarOnboarding } from '../../templates/NavBarOnboarding'
import { CardHomeOnboarding } from '../../molecules/CardHomeOnboarding'

export const HomeOnboarding = () => {

    return (
        <View style={ reusableOnboardingStyles.container }>
            <NavBarOnboarding disabled={true}/>
            <CardHomeOnboarding extraStyles={{ marginTop: 144 }}/>
            <Texts type='p' extraStyles={{ color: '#D9D9D9',marginTop: 83, marginHorizontal: 50, marginBottom: 6 }} >Aún no cuentas con inversiones.</Texts>
            <Button type={'inactive'} size={'btnSmall'} disabled={true} >Comenzar</Button>
        </View>
    )
}