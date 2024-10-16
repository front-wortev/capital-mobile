import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Texts } from '../../atoms/Texts'
import Styles from './referidosStyles'
import { RadioButton } from '../../molecules/RadioButton'
import { reusableStyles } from '../../reusableStyles'
import { LinearGradient } from 'expo-linear-gradient'

export default function Referidos() {

  return (

    <View style={Styles.container}>
      <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={reusableStyles.background}
      />
      <Texts type='h1'  extraStyles={[Styles.title, {textAlign:'center', justifyContent: 'center', marginTop: 95, width: '100%'}]} >Recomienda y gana</Texts>

      <Texts type='p' extraStyles={Styles.text}>Disfruta de bonos adicionales al recomendarnos como parte de tus beneficios de inversionista.</Texts>

      <Texts type='p' extraStyles={Styles.textLg}>Por cada persona que realice su primera inversión por recomendación, <Texts type='p' extraStyles={Styles.bold}>recibe $2,000.00 MXN</Texts> y le bonificaremos <Texts type='p' extraStyles={Styles.bold}>$1,000.00 MXN*</Texts> a tu referido.</Texts>

      <View style={Styles.containerCode}>

        <View style={Styles.code}>
          <Texts type='p' extraStyles={Styles.input}>INV456789</Texts>
        </View>
        
        <TouchableOpacity style={Styles.boton}>
          <Texts type='h1' extraStyles={Styles.textoBoton} >COPIAR CÓDIGO</Texts>
        </TouchableOpacity>

        <View style={Styles.radioContainer}>
          <RadioButton requireValue={true} extraStyles={''} ><Texts extraStyles={Styles.textoRadio}>Acepto los <Texts extraStyles={{textDecorationLine: 'underline'}}>Términos y condiciones</Texts></Texts></RadioButton>
        </View>

      </View>

      <Texts type='p' extraStyles={Styles.textSm}>Al finalizar cada mes, se realiza un corte para depositar tus bonificaciones.</Texts>
      <Texts type='p' extraStyles={Styles.message}>Como inversionista activo de WORTEV CAPITAL, apoyas el crecimiento de emprendimientos mexicanos de alto impacto a la vez que recibes excelente rendimientos mensuales.</Texts>
      
    </View>

  )

}