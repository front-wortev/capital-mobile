import React from 'react'
import { ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { depositStyles } from './depositStyles'
import { useSelector } from 'react-redux'
import * as Clipboard from 'expo-clipboard';
import { FontAwesome5 } from '@expo/vector-icons'

export const Deposit = ({route}) => {

  const { idInvesment } = route.params;

  const dataDeposito = useSelector((state) => state.data.datosDeposito.data.attributes);

  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
    ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT)
  };

  return(
    <View style={depositStyles['container']}>

      <View style={depositStyles['centerContainer']}>
        <Texts type='h1' extraStyles={depositStyles['h1']}>{dataDeposito.title_depositar}</Texts>
      </View>

      <View style={[depositStyles.rowContainer, {marginBottom: 20}]}>
        <Texts type='h3' extraStyles={{width: 250, marginLeft: 42}}>{dataDeposito.texto_nombreWortev}</Texts>
        <TouchableOpacity onPress={() => copyToClipboard(dataDeposito.texto_nombreWortev)}>
          <FontAwesome5 name="copy" size={24} color="#14DA13" />
        </TouchableOpacity>
      </View>


      <View style={depositStyles['titlesContainer']}>

        <View>
          <Texts type='pSmall' extraStyles={depositStyles['title']}>Banco</Texts>
          <Texts type='p'extraStyles={depositStyles['subTitle']}>{dataDeposito.texto_banco}</Texts>
        </View>

        <View style={depositStyles.rowContainer}>
          <View>
            <Texts type='pSmall' extraStyles={depositStyles['title']}>Número de cuenta</Texts>
            <Texts type='p' extraStyles={depositStyles['subTitle']}>{dataDeposito.texto_cuenta}</Texts>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(dataDeposito.texto_cuenta)}>
            <FontAwesome5 name="copy" size={24} color="#14DA13" />
          </TouchableOpacity>
        </View>

        <View style={depositStyles.rowContainer}>
          <View>
            <Texts type='pSmall' extraStyles={depositStyles['title']}>CLABE interbancaria</Texts>
            <Texts type='p' extraStyles={depositStyles['subTitle']}>{dataDeposito.texto_CLABE}</Texts>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(dataDeposito.texto_CLABE)}>
            <FontAwesome5 name="copy" size={24} color="#14DA13" />
          </TouchableOpacity>
        </View>

        <View style={depositStyles.rowContainer}>
          <View>
            <Texts type='pSmall' extraStyles={depositStyles['title']}>R.F.C</Texts>
            <Texts type='p' extraStyles={depositStyles['subTitle']}>{dataDeposito.texto_RFC}</Texts>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(dataDeposito.texto_RFC)}>
            <FontAwesome5 name="copy" size={24} color="#14DA13" />
          </TouchableOpacity>
        </View>

        <View style={depositStyles.rowContainer}>
          <View>
            <Texts type='pSmall' extraStyles={depositStyles['title']}>Referencia / Concepto</Texts>
            <Texts type='p' extraStyles={depositStyles['subTitle']}>{idInvesment ? idInvesment : dataDeposito.text_idinversion}</Texts>
          </View>
          {
            idInvesment &&
            <TouchableOpacity onPress={() => copyToClipboard(idInvesment.toString())}>
              <FontAwesome5 name="copy" size={24} color="#14DA13" />
            </TouchableOpacity>
          }
        </View>



      </View>

      <View style={depositStyles['cardPosition']}>
        <View style={depositStyles['cardContainer']}>

          <Texts type='h2' extraStyles={{color: '#FFF', marginTop: 16, marginBottom: 8}}>Pssst...</Texts>

          <Texts type='p' extraStyles={{color: '#FFF', textAlign: 'center'}}>Recuerda subir tu comprobante para comenzar a generar rendimientos.</Texts>

        </View>
      </View>
      
    </View>
  )
}