import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { newInvestmentStyles } from './newInvestmentStyles'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import RangeInput from '../../organisms/RangeInput'
import Checkbox from 'expo-checkbox'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API_BASE } from '@env'
import { useHeaderHeight } from '@react-navigation/elements'
import { useFetch } from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { Modals } from '../../molecules/Modals'
import { Modal } from 'react-native'
import { RadioButton } from '../../molecules/RadioButton'

export const NewInvestment = ({navigation}) => {

 const headerHeight = useHeaderHeight()
 const tokenRedux = useSelector((state) => state.session.token)

  const [ numericValue, setNumericValue ] = useState('10000');
  const [ formattedValue, setFormattedValue ] = useState('10,000');
  const [ selectedValue, setSelectedValue ] = useState(1);
  const [ isChecked1, setIsChecked1 ] = useState(true);
  const [ isChecked2, setIsChecked2 ] = useState(false);
  const [ isCheckedTC, setIsCheckedTC ] = useState(false);
  const [ isCheckedContrato, setIsCheckedContrato ] = useState(false);

  const [ modalVisibleErrorContrato, setModalVisibleErrorContrato ] = useState(false)
  const [ modalVisiblePlazoAnual, setModalVisiblePlazoAnual ] = useState(false)

  const [modalVisibleInversionCreada, setModalVisibleInversionCreada] = useState(false);
  const [inversionId, setInversionId] = useState('');

  const [ contratoError, setContratoError ] = useState('')

  const handleValueInversionChange = (newValue) => {
    const numericValue = newValue.replace(/,/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setFormattedValue(formattedValue);
    setNumericValue(numericValue);
  };

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  const handleCheckboxPress1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
    handleValueChange(1);
  }
  
  const handleCheckboxPress2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
    handleValueChange(2);
  }

  const handleCheckboxTC = () => {
    setIsCheckedTC(!isCheckedTC);
  }

  const handleCheckboxContrato = () => {
    setIsCheckedContrato(!isCheckedContrato);
  }

  const handleNewInvestment = async() => {
    const apiBase = API_BASE
    const endPoint = '/inversiones/store'
    const token = tokenRedux.access_token

    const newInvestment = {
      monto: numericValue,
      tipo_rendimiento: isChecked1 ? 'mensual' : isChecked2 ? 'anual' : '',
      plazo_inversion: selectedValue,
    }

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${token}`)

    const fetchResponse = await useFetch(apiBase + endPoint, headers, 'POST', newInvestment, 'normal');

    if (fetchResponse.message.includes('contrato') || fetchResponse.message.includes('verificado')) {
      setContratoError(fetchResponse.message)
      setModalVisibleErrorContrato(true)
    }

    if (fetchResponse.message === 'Inversion Creada Correctamente') {
      setInversionId(fetchResponse.data.id_inversion);
      setModalVisibleInversionCreada(true);
    }

    console.log(fetchResponse)
  }

  useEffect(() => {
    if (isChecked1) {
      setSelectedValue(1);
    }
  }, [isChecked1])

  const rendimientosMensuales = (numericValue*0.02).toFixed(2)
  const rendimientosAnuales = (numericValue*0.24).toFixed(2)

  const rendimientosTotalesAnuales = (numericValue*0.24*selectedValue).toFixed(2)

  const formattedRendimientosMensuales = parseFloat(rendimientosMensuales).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const formattedRendimientosAnuales = parseFloat(rendimientosAnuales).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const formattedRendimientosTotalesAnuales = parseFloat(rendimientosTotalesAnuales).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return(

    <SafeAreaView style={[newInvestmentStyles['container'], {paddingTop: headerHeight - 40 }]}>

      <ScrollView>

        <Texts type='h2' extraStyles={{color: '#FFF', marginBottom: 10}}>Monto a invertir</Texts>

        <View style={newInvestmentStyles.input}>
            <Texts type='pLarge' extraStyles={newInvestmentStyles.black}>$</Texts>
            <View style={newInvestmentStyles.row}>
              <TextInput
                style={numericValue < 10000 ? newInvestmentStyles.inputNumberInvalid : newInvestmentStyles.inputNumber}
                valuePrefix="$"
                value={formattedValue}
                keyboardType="numeric"
                onChangeText={handleValueInversionChange}
                placeholder='0'
              />
              <Texts type='pLarge' extraStyles={{fontSize: 24, color: '#2B2B2B', alignItems:'center', paddingTop: 10}} > MXN</Texts>
            </View>
          </View>

          
            <Texts type='pSmall' extraStyles={{ paddingTop: 10, color: numericValue<10000 ? '#FF5959' : '#D9D9D9' }}>Inversión mínima de $ 10,000 MXN</Texts>

            <RangeInput
              title='Plazo'
              min={1} 
              max={5}
              step={1}
              initialValue={selectedValue}
              onValueChange={handleValueChange}
              colorBar='#14DA13'
              colorThumb={isChecked1 ? "#FFFFFF" : "#14DA13"}
              colorBackBar={isChecked1 ? "#757575" : "#FFFFFF"}
              disabled={isChecked1 ? true : false}
            />


          <View style={[newInvestmentStyles.inputContainer, {marginLeft: 10}]}>

            <Texts type='h3' extraStyles={newInvestmentStyles.inputLabel}>Pago de rendimientos</Texts> 

            <View style={{flexDirection:'row', marginTop: 10}}>
              <View style={newInvestmentStyles.checkboxGap}>
                <RadioButton extraStyles={{gap: 10}} value={isChecked1} isChecked={isChecked1} onPress={handleCheckboxPress1}>
                  <Texts type='pLarge' extraStyles={newInvestmentStyles.checkboxText}>Mensuales</Texts>
                </RadioButton>

              </View>

              {
                numericValue < 100000 ?

                <Pressable style={newInvestmentStyles.checkboxGap} onPress={() => setModalVisiblePlazoAnual(true)}>
                    <RadioButton disabled={true} onPress={() => setModalVisiblePlazoAnual(true)}>
                      <Texts type='pLarge' extraStyles={[newInvestmentStyles.checkboxText, {color: '#828282'}]}>Anuales</Texts>
                    </RadioButton>
                </Pressable>

                :

                <View style={newInvestmentStyles.checkboxGap}>
                  <RadioButton extraStyles={{gap: 10}} value={isChecked2} isChecked={isChecked2} onPress={handleCheckboxPress2}>
                    <Texts type='pLarge' extraStyles={newInvestmentStyles.checkboxText}>Anuales</Texts>
                  </RadioButton>
                </View>
                
              }
            </View>

          </View>

        <View style={newInvestmentStyles['investmentReturns']}>
          <Texts type='p' extraStyles={{color: isChecked1 ? '#FFF' : '#4F4F4F'}}>Rendimientos netos / mes</Texts>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Texts type='h3' extraStyles={{textAlign: 'right', color: isChecked1 ? '#14DA13' : '#4F4F4F'}}>{formattedRendimientosMensuales}</Texts>
            <Texts type='h3' extraStyles={{color: isChecked1 ? '#828282' : '#4F4F4F'}}>MXN</Texts>
          </View>
        </View>

        <View style={newInvestmentStyles['investmentReturns']}>
          <Texts type='p' extraStyles={{color: isChecked2 ? '#FFF' : '#4F4F4F'}}>Rendimientos netos / año</Texts>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Texts type='h3' extraStyles={{ textAlign: 'right' ,color: isChecked2 ? '#14DA13' : '#4F4F4F'}}>{formattedRendimientosAnuales}</Texts>
            <Texts type='h3' extraStyles={{color: isChecked2 ? '#828282' : '#4F4F4F'}}>MXN</Texts>
          </View>
        </View>

        <View style={newInvestmentStyles['resultLine']}></View>

        <View style={newInvestmentStyles['investmentReturns']}>
          <Texts type='p' extraStyles={{color: '#FFF'}}>Rendimientos netos totales</Texts>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Texts type='h3' extraStyles={{textAlign: 'right', color: '#14DA13'}}>{formattedRendimientosTotalesAnuales}</Texts>
            <Texts type='h3' extraStyles={{color: '#828282'}}>MXN</Texts>
          </View>
        </View>

          <View style={newInvestmentStyles.inputContainer}>

            <View style={{flexDirection:'column', marginTop: 10, gap: 20}}>
              <View style={newInvestmentStyles.checkboxGap}>
                <Checkbox style={newInvestmentStyles.checkbox} color={isCheckedTC && '#14da13'} value={isCheckedTC} onValueChange={handleCheckboxTC} />

                <Texts type='pLarge' extraStyles={newInvestmentStyles.checkboxText}>Acepto <Texts type='pLarge' extraStyles={[newInvestmentStyles.checkboxText, {textDecorationLine: 'underline'}]}>Términos y Condiciones</Texts></Texts>
              </View>

              <View style={[newInvestmentStyles.checkboxGap, {marginLeft: 10}]}>
                <Checkbox style={newInvestmentStyles.checkbox} color={isCheckedContrato && '#14da13'} value={isCheckedContrato} onValueChange={handleCheckboxContrato} />

                <Texts type='pLarge' extraStyles={newInvestmentStyles.checkboxText}>He leído y acepto el <Texts type='pLarge' extraStyles={[newInvestmentStyles.checkboxText, {textDecorationLine: 'underline'}]}>Contrato de mandato de inversión</Texts></Texts>
              </View>

          </View>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20,}}>
          { numericValue >= 10000 && isCheckedTC && isCheckedContrato ? 
            <Button extraStylesShadow={{borderRadius: 8, elevation: 2, shadowColor: '#000000', shadowOffset: { width: 0, height: -1 }, shadowOpacity: 0.25, shadowRadius: 4,}} type='secondary' textColor='#2B2B2B' size='btnLarge' extraStyles={{alignSelf: 'center'}}  onPress={handleNewInvestment}>Generar Pedido</Button> 
            : 
            <Button type='inactive' size='btnLarge' extraStyles={{alignSelf: 'center'}}>Generar Pedido</Button> 
          }
        </View>

      </ScrollView> 

      <Modals
        visible={modalVisibleErrorContrato}
        icon='info-circle'
        description={contratoError}
        onClose={() => setModalVisibleErrorContrato(false)}
      /> 

      <Modals
        visible={modalVisiblePlazoAnual}
        icon='info-circle'
        description='Invierte un mínimo de $100 mil para elegir un plazo mayor y cobrar tus rendimientos de forma anual'
        onClose={() => setModalVisiblePlazoAnual(false)}
      />

      
      <Modal
        animationType="fade" 
        transparent={true}
        visible={modalVisibleInversionCreada}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <Texts type='h2' extraStyles={{ color: '#14DA13', marginBottom: 10}}>Pedido generado con éxito</Texts>
            <Texts type='p' extraStyles={{ color: '#2B2B2B', marginBottom: 20 }}>Tu número de pedido es <Texts type='p' extraStyles={{ fontFamily: 'Poppins-Bold' }}>{inversionId}</Texts></Texts>
            <Texts type='p' extraStyles={{ marginBottom: 20, textAlign: 'center' }}>Realiza tu depósito colocando el número bajo el concepto.</Texts>
            <View style={[newInvestmentStyles.row, {width: 260, gap: 5}]}>
              <Button type='secondary' size='btnSmall' onPress={() => navigation.navigate('Depositar', {idInvesment: inversionId})}>DEPOSITAR</Button>
              <Button type='primary' size='btnSmall' onPress={() => navigation.navigate('InversionesStack', {deposit: true})}>VOLVER</Button>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}