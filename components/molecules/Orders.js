import React from 'react'
import { View } from 'react-native'
import { Texts } from '../atoms/Texts'
import { Image } from 'react-native'
import { reusableStyles } from '../reusableStyles'

export const Orders = (props) => {

  /**
   * Props used in this component:
   * @id (integer)
   * @terms (string)
   * @extraStyles (object)
   */

  const { id, terms, extraStyles } = props

  const ellipsis = require('../../assets/images/ellipsis.png')

  return(
    <View style={[reusableStyles['ordersContainer'], extraStyles]}>

      <Texts type='h3' extraStyles={reusableStyles['ordersId']}>{id}</Texts>

      <Texts type='h3' extraStyles={reusableStyles['ordersTerms']}>{terms}</Texts>

      <Image 
        source={ellipsis}
      />

    </View>
  )
}