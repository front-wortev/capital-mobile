import React, { useState } from 'react'
import { View, ScrollView, Modal } from 'react-native'
import { Header } from '../reusable-invesionista/Header'
import { Texts } from '../../atoms/Texts'
import Icon from 'react-native-vector-icons/Feather'
import { API_BASE } from '@env'
import { Button } from '../../atoms/Button'
import { InputDocument } from '../../organisms/InputDocument'
import { documentosMoralStyles } from './documentosMoralStyles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useFetch } from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

export const DocumentosMoral = ({navigation}) => {

  const headerHeigth = useHeaderHeight()
  const tokenRedux = useSelector((state) => state.session.token)
  
  const [ modalVisibleNotif, setModalVisibleNotif ] = useState(false)
  const [ actoConstitutiva, setActaConstitutiva ] = useState(null)
  const [ rfcMoral, setRFCMoral ] = useState(null)
  const [ caratulaEstadoCuenta, setCaratulaEstadoCuenta ] = useState(null)
  const [ comprobanteDomicilioFiscal, setComprobanteDomicilioFiscal ] = useState(null)
  const [ poderNotarial, setPoderNotarial ] = useState(null)
  const [ identificacionFrente, setIdentificacionFrente ] = useState(null)
  const [ identificacionReverso, setIdentificacionReverso ] = useState(null)
  const [ comprobanteDomicilio, setComprobanteDomicilio ] = useState(null)

  const handleUploadActaConstitutiva = (uri) => {
    setActaConstitutiva(uri)
  };

  const handleUploadRFCMoral = (uri) => {
    setRFCMoral(uri)
  };

  const handleUploadCaraturalEstadoCuenta = (uri) => {
    setCaratulaEstadoCuenta(uri)
  };

  const handleUploadComprobanteDomFiscal = (uri) => {
    setComprobanteDomicilioFiscal(uri)
  };

  const handleUploadComprobanteDom = (uri) => {
    setComprobanteDomicilio(uri)
  };

  const handleUploadPoderNotarial = (uri) => {
    setPoderNotarial(uri)
  };

  const handleUploadIDFrente = (uri) => {
    setIdentificacionFrente(uri)
  };

  const handleUploadIDReverso = (uri) => {
    setIdentificacionReverso(uri)
  };

  const documentEmpresaInputs = [
    { document: 'Acta constitutiva', onUpload: handleUploadActaConstitutiva },
    { document:'RFC persona moral', onUpload: handleUploadRFCMoral },
    { document:'Carátula del estado de cuenta', onUpload: handleUploadCaraturalEstadoCuenta },
    { document: 'Comprobante de domicilio fiscal', onUpload: handleUploadComprobanteDomFiscal },
  ]

  const documentRepresentanteInputs = [
    { document: 'Poder Notarial', onUpload: handleUploadPoderNotarial },
    { document:'INE o Pasaporte (frente)', onUpload: handleUploadIDFrente },
    { document:'INE o Pasaporte (reverso)', onUpload: handleUploadIDReverso },
    { document: 'Comprobante de domicilio', onUpload: handleUploadComprobanteDom },
  ]

  const isValid = () => {
    return actoConstitutiva && rfcMoral && caratulaEstadoCuenta && comprobanteDomicilioFiscal && poderNotarial && identificacionFrente && identificacionReverso && comprobanteDomicilio;
  };

  const renderButtonType = () => {
    return isValid() ? 'secondary' : 'inactive';
  };

  const renderButtonDisabled = () => {
    return !isValid();
  };

  const handleDocs = async() => {
    const apiBase = API_BASE
    const endPoint = '/perfil/documentacion/update'
    const token = tokenRedux.access_token

    const formData = new FormData();
    formData.append('acta_constitutiva', {
      uri: 
        Platform.OS === 'android'
        ? actoConstitutiva.uri
        : actoConstitutiva.uri.replace('file://', ''),
      name: actoConstitutiva.name,
      type: actoConstitutiva.mimeType,
    });
    formData.append('imagen_rfc', {
      uri: 
        Platform.OS === 'android'
        ? rfcMoral.uri
        : rfcMoral.uri.replace('file://', ''),
      name: rfcMoral.name,
      type: rfcMoral.mimeType,
    });
    formData.append('caratula_estado_cuenta', {
      uri: 
        Platform.OS === 'android'
        ? caratulaEstadoCuenta.uri
        : caratulaEstadoCuenta.uri.replace('file://', ''),
      name: caratulaEstadoCuenta.name,
      type: caratulaEstadoCuenta.mimeType,
    });
    formData.append('comprobante_domicilio', {
      uri: 
        Platform.OS === 'android'
        ? comprobanteDomicilioFiscal.uri
        : comprobanteDomicilioFiscal.uri.replace('file://', ''),
      name: comprobanteDomicilioFiscal.name,
      type: comprobanteDomicilioFiscal.mimeType,
    });
    formData.append('poder_notarial', {
      uri: 
        Platform.OS === 'android'
        ? poderNotarial.uri
        : poderNotarial.uri.replace('file://', ''),
      name: poderNotarial.name,
      type: poderNotarial.mimeType,
    });
    formData.append('anverso_identificacion', {
      uri: 
        Platform.OS === 'android'
        ? identificacionFrente.uri
        : identificacionFrente.uri.replace('file://', ''),
      name: identificacionFrente.name,
      type: identificacionFrente.mimeType,
    });
    formData.append('reverso_identificacion', {
      uri: 
        Platform.OS === 'android'
        ? identificacionReverso.uri
        : identificacionReverso.uri.replace('file://', ''),
      name: identificacionReverso.name,
      type: identificacionReverso.mimeType,
    });
    formData.append('comprobante_domicilio_rep_legal', {
      uri: 
        Platform.OS === 'android'
        ? comprobanteDomicilio.uri
        : comprobanteDomicilio.uri.replace('file://', ''),
      name: comprobanteDomicilio.name,
      type: comprobanteDomicilio.mimeType,
    });
    
    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Authorization", `Bearer ${token}`)

    const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', formData, 'formData');

    if ( fetchResult && fetchResult.message === 'Archivos cargados correctamente') {
      console.log(fetchResult);
      setModalVisibleNotif(true);
    }
  }

  return (
    <ScrollView >
      <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
      <Header currentPage={3} />
      <View style={ documentosMoralStyles.container }>

          <View style={ documentosMoralStyles.textContainer } >
            <Texts type='h2' extraStyles={{ fontFamily: 'Poppins-Bold' }} >Documentos de la empresa</Texts>
            <Texts type='pSmall'>Formatos aceptados jpeg, jpg, png, pdf, gif, tiff, bmp. Peso máximo 3 MB.</Texts>
          </View>
          <View style={ documentosMoralStyles.cardsContainer } >
            {documentEmpresaInputs.map((input, index) => (
              <InputDocument key={index} document={input.document} onUpload={input.onUpload} />
            ))}
          </View>
          <View style={ [documentosMoralStyles.textContainer, {marginTop: 25}] } >
            <Texts type='h2' extraStyles={{ fontFamily: 'Poppins-Bold' }} >Documentos del representante legal</Texts>
            <Texts type='pSmall'>Formatos aceptados jpeg, jpg, png, pdf, gif, tiff, bmp. Peso máximo 3 MB.</Texts>
          </View>
          <View style={ documentosMoralStyles.cardsContainer } >
            {documentRepresentanteInputs.map((input, index) => (
              <InputDocument key={index} document={input.document} onUpload={input.onUpload} />
            ))}
          </View>
          <View style={ documentosMoralStyles.fila }>
            <Icon name='help-circle' size={20}> <Texts type='h2' extraStyles={{ fontFamily: 'Poppins-Bold' }}>Ayuda</Texts> </Icon>
            <Button
              type={renderButtonType()}
              size="btnSmall"
              onPress={handleDocs}
              disabled={renderButtonDisabled()}
            >
              TERMINAR
            </Button>
          </View>
          
      </View>      

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleNotif}
        onRequestClose={() => setModalVisibleNotif(!modalVisibleNotif)}>
        <View style={ documentosMoralStyles.overlay } >
          <View style={documentosMoralStyles.centeredView}>
            <View style={documentosMoralStyles.modalView}>
              <Texts type='h2' extraStyles={[documentosMoralStyles.modalText, {color: '#14DA13', fontFamily: 'Poppins-Bold'}]}>¡Listo!</Texts>
              <Texts type='h2' extraStyles={[documentosMoralStyles.modalText, {fontFamily: 'Poppins-Bold'}]}>Tus datos serán verificados!</Texts>
              <Texts type='p' extraStyles={documentosMoralStyles.modalText}>Te notificaremos en un plazo de 24-48 hrs cuando puedas comenzar a invertir.</Texts>
              <Button 
                type={'primary'} 
                extraStyles={{width: 264, height: 46, borderRadius: 8}}           
                onPress={() => navigation.navigate('OnboardingApp')}>
                OK
              </Button>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  ) 
}
