import React, { useEffect } from 'react'
import { BackHandler, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../reusable-invesionista/Header'
import { GoForward } from '../../atoms/GoForward'
import { Texts } from '../../atoms/Texts'
import { Inputs } from '../../organisms/Inputs'
import { datosInversionistaStyles } from './datosInversionistaStyles'
import { ScrollView } from 'react-native'
import { useState } from 'react'
import { DropdownPicker } from '../../organisms/Dropdown';
import { InputPhone } from '../../organisms/InputPhone'
import { Modal } from 'react-native'
import { Button } from '../../atoms/Button'
import { estados } from '../../constants/contextualData';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export const DatosInversionista = ({navigation}) => {  

  const [selectedValue, setSelectedValue] = useState('')  
  const [ isFocusDropdown, setIsFocusDropdown ] = useState(false);
  const [ telFis, setTelFis ] = useState('')
  const [ rfc, setRfc ] = useState('')
  const [ curp, setCurp ] = useState('')
  const [ calle, setCalle ] = useState('')
  const [ numExterior, setNumExterior ] = useState('')
  const [ numInterior, setNumInterior ] = useState(' ')
  const [ codPost, setCodPost ] = useState('')
  const [ colonia, setColonia ] = useState('')
  const [ alcaldia, setAlcaldia ] = useState('')
  const [ modalVisibleAdvertencia, setModalVisibleAdvertencia ] = useState(false)

  const [errorTelFis, setErrorTelFis] = useState(false)
  const [errorFormatoTel, setErrorFormatoTel] = useState(false)
  const [errorRfc, setErrorRfc] = useState(false)
  const [errorCurp, setErrorCurp] = useState(false)
  const [errorEstado, setErrorEstado] = useState(false)
  const [errorCalle, setErrorCalle] = useState(false)
  const [errorNumExterior, setErrorNumExterior] = useState(false)
  const [errorCodPost, setErrorCodPost] = useState(false)
  const [errorColonia, setErrorColonia] = useState(false)
  const [errorAlcaldia, setErrorAlcaldia] = useState(false)
  const [errorLengthCurp, setErrorLengthCurp ] = useState(false)
  const [errorLengthRfc, setErrorLengthRfc ] = useState(false)
  const [errorLengthCodPost, setErrorLengthCodPost ] = useState(false)

  const esRfcValido = (rfc) => {
    return rfc.length === 13;
  };
  
  const esCurpValido = (curp) => {
    return curp.length === 18
  };

  const handleRfcChange = (text) => {
    setRfc(text.toUpperCase());
  };

  const handleCurpChange = (text) => {
    setCurp(text.toUpperCase());
  };  

  const validarCamposRequeridos = () => {
      
      let esValido = true;

      const rfcValido = esRfcValido(rfc);
      setErrorRfc(!rfcValido);
      esValido = esValido && rfcValido;

      const curpValido = esCurpValido(curp);
      setErrorCurp(!curpValido);
      esValido = esValido && curpValido;

      setErrorTelFis(telFis.trim() === '');
      esValido = esValido && telFis.trim() !== '';
    
      setErrorRfc(rfc.trim() === '');
      esValido = esValido && rfc.trim() !== '';
    
      setErrorCurp(curp.trim() === '');
      esValido = esValido && curp.trim() !== '';

      setErrorEstado(selectedValue.trim() === '');
      esValido = esValido && selectedValue.trim() !== '';
    
      setErrorCalle(calle.trim() === '');
      esValido = esValido && calle.trim() !== '';
    
      setErrorNumExterior(numExterior.trim() === '');
      esValido = esValido && numExterior.trim() !== '';
    
      setErrorCodPost(codPost.trim() === '');
      esValido = esValido && codPost.trim() !== '';
    
      setErrorColonia(colonia.trim() === '');
      esValido = esValido && colonia.trim() !== '';
    
      setErrorAlcaldia(alcaldia.trim() === '');
      esValido = esValido && alcaldia.trim() !== '';
  
    return esValido;
  }

  const handleCloseModal = () => {
    setModalVisibleAdvertencia(false);
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        setModalVisibleAdvertencia(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  const handleValidacion = () => {
    let esValido = validarCamposRequeridos();

    const errorLengthCurp = curp.length === 18;
    const errorLengthRfc = rfc.length === 13;
    const errorLengthCodPost = codPost.length === 5;
    const errorFormatoTel = /^\d+$/.test(telFis);

    setErrorLengthCurp(!errorLengthCurp);
    setErrorLengthRfc(!errorLengthRfc);
    setErrorLengthCodPost(!errorLengthCodPost);
    setErrorFormatoTel(!errorFormatoTel);

    esValido = esValido && errorLengthCurp && errorLengthRfc && errorLengthCodPost && errorFormatoTel;

    if (esValido) {

      
      navigation.navigate('DatosBeneficiario', {
        telFis,
        rfc,
        curp,
        selectedValue,
        calle,
        numExterior,
        numInterior, 
        codPost,
        colonia,
        alcaldia
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  return (
    <ScrollView>
        <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <Header currentPage={1} />
        <View style={ datosInversionistaStyles.container } >

          <View>
            <InputPhone
              requireValue={true}
              value={telFis}
              onChangeText={(text) => setTelFis(text)}
              maxLength={10}
            > 
              Número telefónico
            </InputPhone>
            { errorTelFis && <Texts type="pSmall" extraStyles={datosInversionistaStyles.errorMessage}>Este campo es obligatorio</Texts> }
            { errorFormatoTel && <Texts type="pSmall" extraStyles={datosInversionistaStyles.errorMessage}>El teléfono sólo debe contener números</Texts> }
          </View>

          <View style={ datosInversionistaStyles.fila }>
            <View style={{width: '40%'}}>
              <Inputs 
                extraStyles={{ width: '95%' }} 
                placeholder={'18 caracteres'}
                requireValue={true}
                inputMode='text'
                value={curp}
                onChangeText={handleCurpChange}
                autoCapitalize='characters'
                maxLength={18}
              >
                CURP
              </Inputs>
              { errorCurp && <Texts type="pSmall" extraStyles={datosInversionistaStyles.errorMessage}>Este campo es obligatorio</Texts> }
              { errorLengthCurp && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {width: '120%'}]}>El CURP debe ser de 18 caracteres</Texts> }
            </View>
            <View style={{width: '40%'}}>
              <Inputs 
                extraStyles={{ width: '95%', marginLeft: 10 }} 
                placeholder={'13 caracteres'}
                requireValue={true}
                inputMode='text'
                value={rfc}
                onChangeText={handleRfcChange}
                autoCapitalize='characters'
                maxLength={13}
              >
                RFC
              </Inputs>
              { errorRfc && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {marginLeft: 10}]}>Este campo es obligatorio</Texts> }
              { errorLengthRfc && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {marginLeft: 10, width: '120%'}]}>El RFC debe ser de 13 caracteres</Texts> }
            </View>
          </View>

          <View style={{justifyContent: 'flex-start', marginTop: 15}} >
            <Texts type='h2'>Datos fiscales</Texts>
            <Texts type='pSmall'>Por favor, llena los campos tal como se presenta en tu documentación oficial.</Texts>
          </View>

          <View>
            <DropdownPicker
              extraStyles={isFocusDropdown && { borderColor: '#14DA13' }}
              requireValue={true} 
              placeholder={'Selecciona tu estado'} 
              data={estados}
              value={selectedValue}
              onFocus={() => setIsFocusDropdown(true)}
              onBlur={() => setIsFocusDropdown(false)}
              onChange={item => {
                  setSelectedValue(item.value);
                  setIsFocusDropdown(false);
              }}
              dropdownPosition='auto'
            >
              Estado
            </DropdownPicker>         
            { errorEstado && <Texts type="pSmall" extraStyles={datosInversionistaStyles.errorMessage}>Este campo es obligatorio</Texts> } 
          </View>

          <View>
            <Inputs
              requireValue={true}
              inputMode='text'
              value={calle}
              onChangeText={(text) => setCalle(text)}
              autoCapitalize="words"
            >
              Calle
            </Inputs>
            { errorCalle && <Texts type="pSmall" extraStyles={datosInversionistaStyles.errorMessage}>Este campo es obligatorio</Texts> }
          </View>

          <View style={ datosInversionistaStyles.fila }>
            <View style={{width: '25%'}}>
              <Inputs 
                extraStyles={{ width: '100%' }}
                requireValue={true}
                inputMode='numeric'
                value={numExterior}
                onChangeText={(text) => setNumExterior(text)}
              >
                Exterior
              </Inputs>
              { errorNumExterior && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {width: '130%' }]}>Este campo es obligatorio</Texts> }
            </View>

            <Inputs 
              extraStyles={{ width: '25%', marginLeft: 10 }}
              requireValue={false}
              inputMode='numeric'
              value={numInterior}
              onChangeText={(text) => setNumInterior(text)}
            >
              Interior
            </Inputs>

            <View style={{width: '25%'}}>
              <Inputs 
                extraStyles={{ width: '100%', marginLeft: 10 }}
                requireValue={true}
                inputMode='numeric'
                value={codPost}
                onChangeText={(text) => setCodPost(text)}
                maxLength={5}
              >
                C.P.
              </Inputs>
              { errorCodPost && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {width: '130%', marginLeft: 10 }]}>Este campo es obligatorio</Texts> }
              { errorLengthCodPost && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, { width: '120%', fontSize: 8, marginLeft: 10}]}>El código postal debe contener 5 caracteres</Texts> }
            </View>
          </View>

          <View>
            <Inputs
              requireValue={true}
              inputMode='text'
              value={colonia}
              onChangeText={(text) => setColonia(text)}
              autoCapitalize="words"
            >
              Colonia
            </Inputs>
            { errorColonia && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {width: '130%' }]}>Este campo es obligatorio</Texts> }
          </View>

          <View>
            <Inputs 
              extraStyles={{marginTop: 15}}
              requireValue={true}
              inputMode='text'
              value={alcaldia}
              onChangeText={(text) => setAlcaldia(text)}
              autoCapitalize="words"
            >
              Alcaldía/Municipio
            </Inputs>
            { errorAlcaldia && <Texts type="pSmall" extraStyles={[datosInversionistaStyles.errorMessage, {width: '130%' }]}>Este campo es obligatorio</Texts> }
          </View>

          <View style={datosInversionistaStyles.forwardButton}>
            <GoForward onPress={handleValidacion} />
          </View>

        </View>

        <Modal
            animationType="fade" 
            transparent={true}
            visible={modalVisibleAdvertencia}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <FontAwesome5 name="info-circle" size={24} color="#14DA13" />
                <Texts type='h1' extraStyles={{ color: '#2B2B2B', marginVertical: 10, fontSize: 20}}>Advertencia</Texts>
                <Texts type='p' extraStyles={{ marginBottom: 20, textAlign: 'center' }}>Si abandonas esta sección, tendrás que llenar los datos de nuevo.</Texts>
                <View style={[datosInversionistaStyles.row, {width: 260, gap: 5}]}>
                <Button type='secondary' size='btnSmall' textColor='#2B2B2B' onPress={() => setModalVisibleAdvertencia(false)}>CANCELAR</Button>
                <Button type='primary' size='btnSmall' onPress={handleCloseModal}>SALIR</Button>
                </View>
            </View>
            </View>
        </Modal>

      </ScrollView>
  )
}
