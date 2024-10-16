import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from '../reusable-invesionista/Header'
import { Modal, View, BackHandler } from 'react-native'
import { API_BASE } from '@env'
import { FontAwesome5 } from '@expo/vector-icons';
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { datosInversionistaMoralStyles } from './datosInversionistaMoralStyles'
import { DropdownPicker } from '../../organisms/Dropdown'
import { Inputs } from '../../organisms/Inputs'
import Checkbox from 'expo-checkbox'
import { Checkboxes } from '../../molecules/Checkboxes'
import { GoForward } from '../../atoms/GoForward';
import { useHeaderHeight } from '@react-navigation/elements'
import { useSelector } from 'react-redux'
import { Modals } from '../../molecules/Modals'
import { useFetch } from '../../../hooks/useFetch'
import { InputPhone } from '../../organisms/InputPhone'
import { estados } from '../../constants/contextualData'
import { useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

export const DatosInversionistaMoral = ({navigation}) => {

      const headerHeigth = useHeaderHeight()

      const tokenRedux = useSelector((state) => state.session.token)

      const [isCheckedManifiesto, setCheckedManifiesto] = useState(false)
      const [ modalVisibleAdvertencia, setModalVisibleAdvertencia ] = useState(false)
      const [ modalManifiesto, setModalManifiesto ] = useState(false)
      const [ personaPolitica, setPersonaPolitica ] = useState()
      const [ state, setState ] = useState('') 
      const [ isFocusDropdown, setIsFocusDropdown ] = useState(false)
      const [ calle, setCalle ] = useState('')
      const [ numExterior, setNumExterior ] = useState('')
      const [ numInterior, setNumInterior ] = useState('')
      const [ codPost, setCodPost ] = useState('')
      const [ colonia, setColonia ] = useState('')
      const [ alcaldia, setAlcaldia ] = useState('')
      const [ repLegalNombre, setRepLegalNombre ] = useState('')
      const [ repLegalApellido, setRepLegalApellido ] = useState('')
      const [ repLegalRfc, setRepLegalRfc ] = useState('')
      const [ repLegalEmail, setRepLegalEmail ] = useState('')
      const [ repLegalPhone, setRepLegalPhone ] = useState('')
      const [ errors, setErrors ] = useState('')

      const handlePersonaPolitica = () => {
        setPersonaPolitica(1)
      }
    
      const handleNoPersonaPolitica = () => {
        setPersonaPolitica(0)
      }

      const handleRfcChange = (text) => {
        setRepLegalRfc(text.toUpperCase());
      };

      const handleCloseModal = () => {
        setModalVisibleAdvertencia(false);
        navigation.goBack();
      };

      const handleManifiesto = () => {
        setModalManifiesto(true)
      }

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

      const handleUpdatePerfil = async() => {
        const apiBase = API_BASE
        const endPoint = '/perfil/create/step1'
        const token = tokenRedux.access_token

        const nombreRepLegalCompleto = repLegalNombre + ' ' + repLegalApellido;
    
        const investmentProfile = {
          estado: state,
          calle: calle,
          num_casa: numExterior,
          num_casa_int: numInterior,
          codigo_postal: codPost,
          colonia: colonia,
          municipio: alcaldia,
          nombre_rep_legal: nombreRepLegalCompleto,
          rfc_rep_legal: repLegalRfc,
          email_rep_legal: repLegalEmail,
          tel_rep_legal: repLegalPhone,
          persona_politica: personaPolitica,
          aceptacion_dir_fiscal: '1',
        }    
        
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json") 
        headers.append("Authorization", `Bearer ${token}`)
    
        const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', investmentProfile, 'normal');
    
        console.log(fetchResult, nombreRepLegalCompleto);
    
        if(fetchResult.message === 'success') {
          navigation.navigate('Datos-bancarios-moral')
        } else if (fetchResult.message === 'Error') {
          setErrors(fetchResult.data)
        }
      }

return (
    <ScrollView style={{marginTop: headerHeigth}}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View style={{marginBottom: '10%'}}>

      <Header currentPage={1} />
      <View style={datosInversionistaMoralStyles.container}>
          <View>
              <Texts type='h2'>Domicilio de la empresa</Texts>
              <Texts type='pSmall'>Por favor, llena los campos tal como se presenta en tu documentación oficial.</Texts>
          </View>
          <DropdownPicker
            extraStyles={isFocusDropdown && { borderColor: '#14DA13' }}
            requireValue={true} 
            placeholder={'Selecciona tu estado'} 
            data={estados}
            value={state}
            onFocus={() => setIsFocusDropdown(true)}
            onBlur={() => setIsFocusDropdown(false)}
            onChange={item => {
                setState(item.value);
                setIsFocusDropdown(false);
            }}
            dropdownPosition='auto'
          >
            Estado
          </DropdownPicker>
          {
            errors.estado && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.estado}</Texts>
          }
          <Inputs 
            inputMode='text'
            value={calle}
            onChangeText={(text) => setCalle(text)}
            autoCapitalize="words"
          >
            Calle
          </Inputs>
          {
            errors.calle && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.calle}</Texts>
          }

          <View style={datosInversionistaMoralStyles.fila}>
            <View style={{width: '35%'}}>
              <Inputs 
                requireValue={true} 
                extraStyles={[datosInversionistaMoralStyles.sizeSamll, {width: '100%'}]}
                inputMode='numeric'
                value={numExterior}
                onChangeText={(text) => setNumExterior(text)}
              >
                Exterior
              </Inputs>
              {
                errors.num_casa && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.num_casa}</Texts>
              }
            </View>
            <View style={{width: '35%'}}>
              <Inputs 
                extraStyles={[datosInversionistaMoralStyles.sizeSamll, {width: '100%'}]}
                inputMode='numeric'
                value={numInterior}
                onChangeText={(text) => setNumInterior(text)}
              >
                Interior
              </Inputs>
              {
                errors.num_casa_int && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.num_casa_int}</Texts>
              }
            </View>
            <View style={{width: '35%'}} >
              <Inputs 
                requireValue={true} 
                extraStyles={[datosInversionistaMoralStyles.sizeSamll, {width: '100%'}]}
                inputMode='numeric'
                value={codPost}
                onChangeText={(text) => setCodPost(text)}
                maxLength={5}
              >
                C.P.
              </Inputs>
              {
                errors.codigo_postal && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.codigo_postal}</Texts>
              }
            </View>
          </View>

          <Inputs 
            requireValue={true}
            inputMode='text'
            value={colonia}
            onChangeText={(text) => setColonia(text)}
            autoCapitalize="words"
            extraStyles={{marginBottom: 20}}
          >
            Colonia
          </Inputs>
          {
            errors.colonia && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.colonia}</Texts>
          }
          <Inputs 
            requireValue={true}
            inputMode='text'
            value={alcaldia}
            onChangeText={(text) => setAlcaldia(text)}
            autoCapitalize="words"
          >
            Alcaldía/Municipio
          </Inputs>
          {
            errors.municipio && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.municipio}</Texts>
          }

          <View style={datosInversionistaMoralStyles.fila}>
              <Checkbox value={isCheckedManifiesto} onValueChange={setCheckedManifiesto} color={isCheckedManifiesto ? '#14DA13' : undefined} style={datosInversionistaMoralStyles.checkbox} />
              <Texts type='pSmall'>Manifiesto bajo protesta de decir verdad, que el domicilio señalado es el actualmente registrado ante el Servicio de Administración Tributaria (SAT).</Texts>
          </View>

          <View style={datosInversionistaMoralStyles.inputContainer} >
              <Texts type='h2' >Representante legal</Texts>
              <Inputs 
                requireValue={true}
                inputMode='text'
                value={repLegalNombre}
                onChangeText={(text) => setRepLegalNombre(text)}
                autoCapitalize="words"
              >
                Nombre(s)
              </Inputs>
              {
                errors.nombre_rep_legal && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.nombre_rep_legal}</Texts>
              }
              <Inputs 
                requireValue={true}
                inputMode='text'
                value={repLegalApellido}
                onChangeText={(text) => setRepLegalApellido(text)}
                autoCapitalize="words"
              >
                Apellido(s)
              </Inputs>
              <Inputs 
                requireValue={true}
                inputMode='text'
                value={repLegalRfc}
                onChangeText={handleRfcChange}
                maxLength={12}
                autoCapitalize='characters'
              >
                RFC
              </Inputs>
              {
                errors.rfc_rep_legal && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.rfc_rep_legal}</Texts>
              }
              <Inputs 
                requireValue={true}
                inputMode='email'
                value={repLegalEmail}
                onChangeText={(text) => setRepLegalEmail(text)}
              >
                Correo electrónico
              </Inputs>
              {
                errors.email_rep_legal && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.email_rep_legal}</Texts>
              }
              <InputPhone 
                requireValue={true}
                value={repLegalPhone}
                onChangeText={(text) => setRepLegalPhone(text)}
                maxLength={10}
              >
                Número telefónico
              </InputPhone>
              {
                errors.tel_rep_legal && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.tel_rep_legal}</Texts>
              }
              <Checkboxes 
                  requireValue={true} 
                  option1={'Sí'} 
                  option2={'No'} 
                  onOption1Select={handlePersonaPolitica} 
                  onOption2Select={handleNoPersonaPolitica}
              >
                  ¿Eres una persona políticamente expuesta?
              </Checkboxes>
              {
                errors.persona_politica && <Texts type="pSmall" extraStyles={datosInversionistaMoralStyles.errorMessage}>{errors.persona_politica}</Texts>
              }
          </View>
        </View>
        <View style={datosInversionistaMoralStyles.forwardButton}>
            <GoForward onPress={ isCheckedManifiesto ? handleUpdatePerfil : handleManifiesto} />
        </View>
      </View>
        


        <Modals
          visible={modalManifiesto}
          onButtonPress={() => setModalManifiesto(false)}
          vectoricon='exclamation-circle'
          subtitle='Debes aceptar el manifiesto'
          buttonText='OK'
        />


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
                <View style={[datosInversionistaMoralStyles.row, {width: 260, gap: 5}]}>
                <Button type='secondary' size='btnSmall' textColor='#2B2B2B' onPress={() => setModalVisibleAdvertencia(false)}>CANCELAR</Button>
                <Button type='primary' size='btnSmall' onPress={handleCloseModal}>SALIR</Button>
                </View>
            </View>
            </View>
        </Modal>


    </ScrollView>
)}
