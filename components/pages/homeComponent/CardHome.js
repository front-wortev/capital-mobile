import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { homeStyles } from './homeStyles'
import { Button } from '../../atoms/Button'
import { useNavigation  } from '@react-navigation/native'

export const CardHome = ({total, global}) => {

  const navigation = useNavigation()

  const [ sinInversiones, setSinInversiones ] = useState(true)

  useEffect(() => {
    if(total !== '$0.00' && global !== '$0.00' ) {
      setSinInversiones(false)
    }
  }, [])

  return (
    <View style={ [homeStyles.cardHome, {backgroundColor: sinInversiones ? "#FFFFFF" : "#2b2b2b"}] }>
        <Texts type='pSmall' extraStyles={{ color: sinInversiones ? '#2B2B2B' : '#14DA13' }}>Rendimientos</Texts>
        
        <View style={ homeStyles.rendimientos } >
        <Texts extraStyles={{fontSize: 16, fontFamily: 'Poppins-Light', color: sinInversiones ? '#2b2b2b' : '#FFFFFF'}}>$</Texts>
            <Texts extraStyles={{fontSize: 32, fontFamily: 'Poppins', color: sinInversiones ? '#2b2b2b' : '#FFFFFF'}}>{sinInversiones ? "0" : global.replace('$', '')}</Texts>
            <Texts extraStyles={{fontSize: 16, fontFamily: 'Poppins-Light', color: sinInversiones ? '#757575' : '#FFFFFF'}}>MXN</Texts>
        </View>

        <View style={ homeStyles.baseCard }>
            <View style={ homeStyles.textBaseCard }>
                <Texts type='pLarge' extraStyles={{ color: sinInversiones ? '#2b2b2b' : '#FFFFFF'}} > {sinInversiones ? "0" : total.replace('$', '')} MXN </Texts>
                <Texts type='pSmall' extraStyles={{ color: sinInversiones ? '#2b2b2b' : '#FFFFFF' }}> invertidos </Texts>
            </View>

            <View style={{justifyContent: 'center'}}>
              <Button 
                type={'secondary'} 
                size={'btnSmall'}
                onPress={() => navigation.navigate('Nueva-Inversion')}
              >
                Invertir
              </Button>
            </View>


        </View>

    </View>
  )
}
