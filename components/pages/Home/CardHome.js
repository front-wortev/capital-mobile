import React from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { homeStyles } from './homeStyles'
import { Button } from '../../atoms/Button'

export const CardHome = () => {
  return (
    <View style={ homeStyles.cardHome }>
        <Texts type='pSmall'>Rendimientos</Texts>
        
        <View style={ homeStyles.rendimientos } >
            <Texts type='pLarge' extraStyles={{fontFamily: 'Poppins-Light'}}>$</Texts>
            <Texts type='pLarge' extraStyles={{fontSize: 32}}>0</Texts>
            <Texts type='pLarge' extraStyles={{fontFamily: 'Poppins-Light'}}>MXN</Texts>
        </View>

        <View style={ homeStyles.baseCard }>
            <View style={ homeStyles.textBaseCard }>
                <Texts type='pLarge' extraStyles={{fontSize: 16}} > 0 MXN </Texts>
                <Texts type='pSmall'> invertidos </Texts>
            </View>

            <Button type={'secondary'} size={'btnSmall'}>Invertir</Button>

        </View>

    </View>
  )
}
