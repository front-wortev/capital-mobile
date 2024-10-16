import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { reinversionesStyles } from '../../pages/reinversiones/reinversionesStyles'
import RangeInput from '../../organisms/RangeInput'
import { Button } from '../../atoms/Button'
import { reinversionesReusableStyles } from '../../reinversionesReusableStyles'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native'
import { Modals } from '../../molecules/Modals'
import { Pressable } from 'react-native'
import { ModalEncuesta } from '../../molecules/ModalEncuesta'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { API_BASE } from '@env'
import { useFetch } from "../../../hooks/useFetch"
import { useNavigation  } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export const Reinversiones = ({route}) => {

  const navigation = useNavigation()

  const [selectedValue, setSelectedValue] = useState(1);
  const [ isChecked1, setIsChecked1 ] = useState(true);
  const [ isChecked2, setIsChecked2 ] = useState(false);

  const [modalVisiblerReinvertirMenos, setModalVisibleReinvertirMenos] = useState(false);
  const [modalVisiblerReinvertirMas, setModalVisibleReinvertirMas] = useState(false);
  const [modalVisibleBack, setModalVisibleBack] = useState(false)
  const [modalVisibleRetiro, setModalVisibleRetiro] = useState(false)
  const [modalVisibleEncuesta, setModalVisibleEncuesta] = useState(false)
  const [valueInversion, setValueInversion] = useState(17346)

  const tokenRedux = useSelector((state) => state.session.token)

  const handleCheckboxPress1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
    if (isChecked1 === false) {
      handleValueChange(1);
    } else {
      handleValueChange(newValue)
    }
  }

  const handleCheckboxPress2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
  }

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  const downloadEstadoDeCuenta = async() => {
    const apiBase = API_BASE
    const endPoint = `/inversion/estado-cuenta/${route.params.id}`
    const token = tokenRedux.access_token

    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)

    const fetch = await useFetch(apiBase+endPoint, headers, 'GET', 'normal')

    console.log(fetch)
  }

  const enviarEncuesta = () => {
    console.log('se manda encuesta, falta endpoint')
  }

  // const valueInversion = '17346'

  return (
    <SafeAreaView>

      <View style={reinversionesStyles.containerHeader}>
               
        <TouchableOpacity style={reinversionesStyles.arrow} onPress={ () => navigation.navigate('Inversiones') }>
            <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#fff'} />
        </TouchableOpacity>
      
        <Texts type={'h4'} extraStyles={reinversionesStyles.titleHeader}>Mis inversiones</Texts>
        
        <TouchableOpacity style={reinversionesStyles.points} onPress={downloadEstadoDeCuenta}>
            <Entypo name='dots-three-vertical' size={ 20 } color = { '#14DA13'} />
        </TouchableOpacity>
        
    </View>

    <ScrollView style={{backgroundColor: '#2B2B2B'}}>
      <View style={reinversionesStyles.container} >
        <Texts type='h1' extraStyles={[ reinversionesStyles.white, {marginTop: 30} ]} >465</Texts>
        <Texts type='h1' extraStyles={[reinversionesStyles.green, {fontSize: 16}]}>¡Plazo concluido con éxito!</Texts>
        
        <View style={reinversionesStyles.row}>
          <View style={{paddingRight: 25}}>
            <Texts type='pLarge' extraStyles={[reinversionesStyles.ligthGrey, {textAlign: 'right'}]} >Plazo</Texts>
            <Texts type='pLarge' extraStyles={[reinversionesStyles.ligthGrey, {textAlign: 'right'}]} >Finalización</Texts>
            <Texts type='pLarge' extraStyles={[reinversionesStyles.ligthGrey, {textAlign: 'right'}]} >Monto Inicial</Texts>
          </View>

          <View>
            <Texts type='pLarge' extraStyles={reinversionesStyles.ligthGrey} >5 años</Texts>
            <Texts type='pLarge' extraStyles={reinversionesStyles.ligthGrey} >03/04/23</Texts>
            <Texts type='pLarge' extraStyles={reinversionesStyles.ligthGrey} >$15,000.00</Texts>
          </View>
          
        </View>

        <View style={[reinversionesStyles.row, {marginTop: 20}]}>
          <Texts type='pLarge' extraStyles={[reinversionesStyles.white, {paddingRight: 25}]} >Total</Texts>
          <Texts type='h2' extraStyles={reinversionesStyles.green} >$17,346.00</Texts>
        </View>

        <Texts type='p' extraStyles={[reinversionesStyles.white, {paddingHorizontal: 50, marginTop: 20}]} >Reinvierte y continúa generando rendimientos del <Texts type='p' extraStyles={reinversionesStyles.green}>24% anual bruto.</Texts></Texts>

        <View style={reinversionesStyles.input}>
          <Texts type='pLarge' extraStyles={reinversionesStyles.black}>$</Texts>
          <View style={reinversionesStyles.row}>
            <TextInput
              style={reinversionesStyles.inputNumber}
              valuePrefix="$"
              value={`${valueInversion}`}
              keyboardType="numeric"
            />
            <Texts type='pLarge' extraStyles={{fontSize: 24, color: '#000', alignItems:'center', paddingTop: 10}} > MXN</Texts>
          </View>
        </View>
        <Texts type='pSmall' extraStyles={{color: '#757575', paddingRight: 125}} >Inversión mínima de $ 10,000 MXN</Texts>

        
          <RangeInput 
            title='Plazo'
            min={1}
            max={10}
            step={1}
            initialValue={selectedValue}
            onValueChange={handleValueChange}
            colorBar='#14DA13'
            colorThumb={isChecked1 ? "#FFFFFF" : "#14DA13"}
            colorBackBar={isChecked1 ? "#757575" : "#FFFFFF"}
            disabled={isChecked1 ? true : false}
          />

          <Texts type='h3' extraStyles={reinversionesStyles.white}>Valor seleccionado: {selectedValue}</Texts>
      

        <View style={{marginTop: 20}}>
          <View style={reinversionesReusableStyles.inputContainer}>

            <Texts type='h3' extraStyles={reinversionesReusableStyles.inputLabel}>Pago de redndimientos</Texts> 

            <View style={{flexDirection:'row', marginTop: 10}}>
              <View style={reinversionesReusableStyles.checkboxGap}>
                <Checkbox style={reinversionesReusableStyles.checkbox} color={isChecked1 && '#14da13'} value={isChecked1} onValueChange={handleCheckboxPress1} />

                <Texts type='pLarge' extraStyles={reinversionesReusableStyles.checkboxText}>Mensuales</Texts>
              </View>

              <View style={reinversionesReusableStyles.checkboxGap}>
                <Checkbox style={reinversionesReusableStyles.checkbox} color={isChecked2 && '#14da13'} value={isChecked2} onValueChange={handleCheckboxPress2} />

                <Texts type='pLarge' extraStyles={reinversionesReusableStyles.checkboxText}>Anuales</Texts>
              </View>
            </View>

          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Texts type='p' extraStyles={reinversionesStyles.white}>Nueva fecha de finalización:  18/04/2026</Texts>
        </View>

        <Button type='secondary' size='btnLarge' textColor='#2B2B2B' extraStyles={{marginTop: 20}} onPress={() => { valueInversion >= 17346 ? setModalVisibleReinvertirMas(true) : setModalVisibleReinvertirMenos(true)}} >REINVERTIR</Button>

        <Pressable onPress={() => setModalVisibleEncuesta(true)} >
          <Texts type='pLarge' extraStyles={{color: '#FFFFFF', textDecorationLine: 'underline', marginTop: 20}}>Retirar inversión</Texts>
        </Pressable>

      </View>

      <Modals
        visible={modalVisiblerReinvertirMenos}
        title='Nuevo pedido generado: 123'
        subtitle='Fecha de inicio: 09/06/23'
        description='Tu saldo será depositado 2 días hábiles después de la solicitud, posterior a la fecha de finalización.'
        buttonText='OK'
        onButtonPress={() => setModalVisibleReinvertirMenos(false)}
      />

      <Modals
        visible={modalVisiblerReinvertirMas}
        title='Nuevo pedido generado: 888'
        subtitle='Monto pendiente: $1,646.00'
        description='Recuerda depositar en la fecha de vencimiento de tu inversión o máximo dos días después de esta solicitud, dentro del mismo mes.'
        buttonText='OK'
        onButtonPress={() => setModalVisibleReinvertirMas(false)}
      />

      <Modals
        visible={modalVisibleBack}
        vectoricon='info-circle'
        description='El retiro estará disponible en un plazo de 5 días hábiles anteriores y/o posteriores a la fecha de expiración. Después, se reinvertirá automáticamente.'
        buttonText='OK'
        onButtonPress={() => setModalVisibleBack(false)}
      />

      <Modals
        visible={modalVisibleRetiro}
        vectoricon='comment-dollar'
        description='Gracias por confiar en nosotros. Esperamos tenerte de vuelta para seguir evolucionando juntos la economía del país.'
        buttonText='CERRAR'
        onButtonPress={() => {
          setModalVisibleRetiro(false)
          navigation.navigate('InversionData')
        }}
      />

      <ModalEncuesta
        visible={modalVisibleEncuesta}
        onClose={() => {
          setModalVisibleEncuesta(false)
          enviarEncuesta()
          setModalVisibleRetiro(true)
        }}
      />
      

    </ScrollView>
    </SafeAreaView>
  )
}
