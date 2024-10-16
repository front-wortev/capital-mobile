import React,  { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Texts } from '../atoms/Texts'
import { reusableStyles } from '../reusableStyles'
import { useNavigation  } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';

export const InvestmentInfo = (props) => {

  /**
   * Props used for managing component's UI
   * @type -  1 pendiente,2 completado, 3 retiro, 4 reembolsado
   * @id - investment id
   * @daysPassed - number of days passed of the investment
   * @requiredDays - number of days required in order to request the money
   * @amount - whether it's a number or pending
   */

  const navigation = useNavigation()

  const { type, id, refundDay, dayCompleted, amount, dayPassed, comprobante } = props
  // const [status, setStatus] = useState(null)

 

  const priceFormat = (price) => {
    return new Intl.NumberFormat().format(price)
  }

  // 1) pendiente
  // 2) completado
  // 3) retiro
  // 4) reembolsado

  return(
    <TouchableOpacity style={[reusableStyles['investmentContainer'], (type === 'completado' && dayPassed >= (365 - 10)) ? {backgroundColor: '#CDFFCD'} : {backgroundColor: '#FFFFFF'}]} onPress={() => {
      type !== 'completado' && dayPassed >= (365 - 10) ? 
      navigation.navigate('Reinversiones',  {
          id: id,
          type: type,
          amount: priceFormat(amount),
          endDate: dayCompleted,
          startDate: refundDay
        }) : navigation.navigate('InversionData', {
          id: id,
          type: type,
          amount: priceFormat(amount),
          endDate: dayCompleted,
          startDate: refundDay,
          comprobante: comprobante
        })
    }}>

      <View style={[{borderRadius: 180}, reusableStyles['investmentId'], reusableStyles[type]]}></View>

      <Texts type='pSmall'>{id}</Texts>

      <Texts type='pSmall' extraStyles={[type === 'reembolsado' && {color: '#D9D9D9'}]}>{dayPassed === 0 && type === 'reembolsado' ? 365 : type !== 'pending' ? dayPassed : 0}/365</Texts>

      <Texts type='pSmall' extraStyles={[type === 'pendiente' && {color: '#C20000'}, type === 'reembolsado' && {color: '#D9D9D9'}]}>{type === 'pendiente' ? 'Pendiente' : `$ ${priceFormat(amount)}`}</Texts>

      
      <FontAwesome5 name="chevron-right" size={16} color={(type === 'completado' && dayPassed >= (365 - 10)) ? '#14DA13' : '#000000'} />

    </TouchableOpacity>
  )
}