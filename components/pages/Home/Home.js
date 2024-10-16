import React from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { homeStyles } from './homeStyles'
import { useHeaderHeight } from '@react-navigation/elements'
import { Button } from '../../atoms/Button'
import { CardHome } from './CardHome'
import { LinearGradient } from 'expo-linear-gradient'

export const Home = () => {

    const headerHeight = useHeaderHeight();

    return (
        <View style={ homeStyles.container }>
            <LinearGradient
                colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
            />
            <CardHome extraStyles={{ marginTop: 144 + headerHeight }}/> 
            <Texts type='p' extraStyles={{ marginTop: 83, marginHorizontal: 100, marginBottom: 30 }} >Completa tus documentos para comenzar a invertir</Texts>
            <Button type={'secondary'} size={'btnSmall'}>Comenzar</Button>
        </View>
    )
}
