import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { Orders } from '../../molecules/Orders'
import { filesStyles } from './filesStyles'

export const Files = () => {

  const fullScreen = require('../../../assets/images/full-screen.png')

  return(
    <View style={filesStyles['container']}>

      <View style={filesStyles['centerContainer']}>
        <Texts type='h1' extraStyles={filesStyles['h1']}>Archivos</Texts> 
      </View>

      <Texts type='h2' extraStyles={filesStyles['actualContract']}>Contrato vigente</Texts>

      <Texts type='p' extraStyles={filesStyles['termsExplanation']}>Este documento te protege a ti como inversionista, plantea el funcionamiento, derechos y obligaciones de ambas partes. Este contrato digital tiene la misma validez que un contrato físico.</Texts>

      <View style={filesStyles['centerContainer']}>
        <View style={filesStyles['pdfContainer']}></View>

        <View style={filesStyles['pdfButtons']}>
          <Texts type='p' extraStyles={{color: '#FFF'}}>Contrato 24687.pdf</Texts>
          <Image 
            source={fullScreen}
          />
        </View>
      </View>

      <Texts type='h2' extraStyles={filesStyles['recentInvestments']}>Inversiones recientes</Texts>

      <Texts type='p' extraStyles={filesStyles['yearlyContracts']}>Contratos del presente año</Texts>

      <View style={filesStyles['temsStatus']}>
        <Texts type='h3'>Pedido</Texts>
        <Texts type='h3'>Estado</Texts>
      </View>

      <Orders
        id={'19654'}
        terms={'Plazo completado'}
        extraStyles={filesStyles['ordersContainer']}
      />

       <Orders
        id={'19653'}
        terms={'Plazo completado'}
        extraStyles={filesStyles['ordersContainer']}
      />

    </View>
  )
}