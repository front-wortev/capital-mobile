import React, { useEffect, useState } from 'react'
import { View, ScrollView, Modal, Pressable, Platform } from 'react-native'
import { API_BASE } from '@env'
import { Header } from '../reusable-invesionista/Header'
import { Checkboxes } from '../../molecules/Checkboxes'
import { Texts } from '../../atoms/Texts'
import { documentosStyles } from './DocumentosStyles'
import Icon from 'react-native-vector-icons/Feather'
import SliderDocumentos from './sliderDocumentos'
import { Button } from '../../atoms/Button'
import { DropdownPicker } from '../../organisms/Dropdown'
import { InputDocument } from '../../organisms/InputDocument'
import { countries } from '../../constants/contextualData'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome6 } from '@expo/vector-icons'

export const Documentos = ({navigation}) => { 

  const tokenRedux = useSelector((state) => state.session.token)
  const slideDocsImages = useSelector((state) => state.data.slideImages.data.attributes.slideImages.data);
  const docsImages = slideDocsImages.map((item) => {
    return {
      url: item.attributes.url,
      name: item.attributes.name,
      alternativeText: item.attributes.alternativeText,
      mime: item.attributes.mime,
    };
})
  
  const data = [
    {
      title1: 'INE - Cara frontal',
      mime1: docsImages[0]?.mime,
      image1: docsImages[0]?.url,
      alt: docsImages[0]?.alternativeText,
      title2: 'INE - Cara frontal',
      mime2: docsImages[1]?.mime,
      image2: docsImages[1]?.url,
      alt: docsImages[1]?.alternativeText,
      width: '184',
      height: '122',
    },
    {
      title1: 'Carátula del estado de cuenta bancario',
      mime1: docsImages[3]?.mime,
      image1: docsImages[3]?.url,
      alt: docsImages[3]?.alternativeText,
      width: '177',
      height: '266',
    },
    {
      title1: 'Comprobante de domicilio',
      mime1: docsImages[2]?.mime,
      image1: docsImages[2]?.url,
      alt: docsImages[2]?.alternativeText,
      description: 'Antigüedad máxima de 3 meses',
      width: '250',
      height: '124',
    },
  ]

  const [ currentIndex, setCurrentIndex ] = useState(0)
  const [ isFocusDropdown, setIsFocusDropdown ] = useState(false)
  const [ countrySelected, setCountrySelected ] = useState('')
  const [ modalVisible, setModalVisible ] = useState(true)
  const [ modalVisibleNotif, setModalVisibleNotif ] = useState(false)
  const [ personaExtranjera, setPersonaExtranjera ] = useState(0)
  const [ caratulaEstadoCuenta, setCaratulaEstadoCuenta ] = useState({})
  const [ comprobanteDomicilio, setComprobanteDomicilio ] = useState({})
  const [ anversoID, setAnversoID ] = useState({})
  const [ reversoID, setReversoID ] = useState({})
  const [ curp, setCURP ] = useState({})
  const [ rfc, setRFC ] = useState({})
  const [ anversoFormaMigratoria, setAnversoFormaMigratoria ] = useState({})
  const [ reversoFormaMigratoria, setReversoFormaMigratoria ] = useState({})
  const [ caratulaPasaporte, setCaratulaPasaporte ] = useState({})

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handleExtranjero = () => {
    setPersonaExtranjera(1)
    setAnversoID({})
    setReversoID({})
    setCaratulaEstadoCuenta({})
    setComprobanteDomicilio({})
    setCountrySelected('')
  }

  const handleNoExtranjero = () => {
    setPersonaExtranjera(0)
    setAnversoID({})
    setReversoID({})
    setCURP({})
    setRFC({})
    setAnversoFormaMigratoria({})
    setReversoFormaMigratoria({})
    setCaratulaPasaporte({})
    setCaratulaEstadoCuenta({})
    setComprobanteDomicilio({})
  }

  const handleUploadCaraturalEstadoCuenta = (datos) => {
    setCaratulaEstadoCuenta(datos);
  };

  const handleUploadComprobanteDom = (datos) => {
    setComprobanteDomicilio(datos);
  };

  const handleUploadAnversoID = (datos) => {
    setAnversoID(datos);
  };


  const handleUploadReversoID = (datos) => {
    setReversoID(datos);
  };

  const handleUploadCURP = (datos) => {
    setCURP(datos)
  };

  const handleUploadRFC = (datos) => {
    setRFC(datos)
  };

  const handleUploadAnversoFormaMigratoria = (datos) => {
    setAnversoFormaMigratoria(datos)
  };

  const handleUploadReversoFormaMigratoria = (datos) => {
    setReversoFormaMigratoria(datos)
  };

  const handleUploadCaratulaPasaporte = (datos) => {
    setCaratulaPasaporte(datos)
  };


  const isValid = () => {
    const isExtranjeroValid = personaExtranjera === 1 && 
      anversoID.uri && 
      reversoID.uri && 
      curp.uri && 
      rfc.uri && 
      caratulaEstadoCuenta.uri && 
      comprobanteDomicilio.uri &&
      anversoFormaMigratoria.uri && 
      reversoFormaMigratoria.uri && 
      caratulaPasaporte.uri;
  
    const isNoExtranjeroValid = personaExtranjera !== 1 && 
      anversoID.uri && 
      reversoID.uri && 
      caratulaEstadoCuenta.uri && 
      comprobanteDomicilio.uri;
  
    return isExtranjeroValid || isNoExtranjeroValid;
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
    formData.append('anverso_identificacion', { 
      uri: 
        Platform.OS === 'android'
        ? anversoID.uri
        : anversoID.uri.replace('file://', ''),
      name: anversoID.name,
      type: anversoID.mimeType,
      });
    formData.append('reverso_identificacion', {
      uri: 
        Platform.OS === 'android'
        ? reversoID.uri
        : reversoID.uri.replace('file://', ''),
      name: reversoID.name,
      type: reversoID.mimeType,
    });
    formData.append('comprobante_domicilio', {
      uri: 
        Platform.OS === 'android'
        ? comprobanteDomicilio.uri
        : comprobanteDomicilio.uri.replace('file://', ''),
      name: comprobanteDomicilio.name,
      type: comprobanteDomicilio.mimeType,
    });
    if ( personaExtranjera === 0 ) {
      formData.append('caratula_estado_cuenta', {
        uri: 
          Platform.OS === 'android'
          ? caratulaEstadoCuenta.uri
          : caratulaEstadoCuenta.uri.replace('file://', ''),
        name: caratulaEstadoCuenta.name,
        type: caratulaEstadoCuenta.mimeType,
      });      
    } else {
      formData.append('imagen_curp', {
        uri: 
          Platform.OS === 'android'
          ? curp.uri
          : curp.uri.replace('file://', ''),
        name: curp.name,
        type: curp.mimeType,
      });
      formData.append('imagen_rfc', {
        uri: 
          Platform.OS === 'android'
          ? rfc.uri
          : rfc.uri.replace('file://', ''),
        name: rfc.name,
        type: rfc.mimeType,
      });
      formData.append('anverso_forma_migratoria', {
        uri: 
          Platform.OS === 'android'
          ? anversoFormaMigratoria.uri
          : anversoFormaMigratoria.uri.replace('file://', ''),
        name: anversoFormaMigratoria.name,
        type: anversoFormaMigratoria.mimeType,
      });
      formData.append('reverso_forma_migratoria', {
        uri: 
          Platform.OS === 'android'
          ? reversoFormaMigratoria.uri
          : reversoFormaMigratoria.uri.replace('file://', ''),
        name: reversoFormaMigratoria.name,
        type: reversoFormaMigratoria.mimeType,
      });
      formData.append('caratula_pasaporte', {
        uri: 
          Platform.OS === 'android'
          ? caratulaPasaporte.uri
          : caratulaPasaporte.uri.replace('file://', ''),
        name: caratulaPasaporte.name,
        type: caratulaPasaporte.mimeType,
      });
    }
    formData.append('extranjero', personaExtranjera);
    if(personaExtranjera === 1) {
      formData.append('pais', countrySelected);
    }

    const response = await fetch(apiBase + endPoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization':  `Bearer ${token}`,
      },

      body: formData
    });
    const result = await response.json();
    console.log(result)

    if ( result && result.message === 'Archivos cargados correctamente') {
      console.log(result);
      setModalVisibleNotif(true);
    }
  }
    
  
  return (
    <ScrollView style={{height: '100%'}}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <Header currentPage={3} />
      <View style={ documentosStyles.container }>
          <Checkboxes 
            option1={'No'} 
            option2={'Si'}
            onOption1Select={handleNoExtranjero}
            onOption2Select={handleExtranjero}
            preselectedValue="No"
          >
            <Texts type='h2' extraStyles={{ fontFamily: 'Poppins-Bold' }}>¿Eres de nacionalidad extranjera?</Texts>
          </Checkboxes>
          { personaExtranjera === 1  && 
          
            <DropdownPicker
                extraStyles={isFocusDropdown && { borderColor: '#14DA13' }}
                requireValue={true} 
                placeholder={'Selecciona tu país'} 
                data={countries}
                value={countrySelected}
                onFocus={() => setIsFocusDropdown(true)}
                onBlur={() => setIsFocusDropdown(false)}
                onChange={item => {
                    setCountrySelected(item.value)
                    setIsFocusDropdown(false)
                }}
                dropdownPosition='auto'
              >
                ¿Cuál es tu nacionalidad?
              </DropdownPicker>
          }
          <View style={ documentosStyles.textContainer } >
            <Texts type='h2' extraStyles={{ fontFamily: 'Poppins-Bold' }} >Documentación</Texts>
            <Texts type='pSmall'>Formatos aceptados jpeg, jpg, png, pdf, gif, tiff, bmp. Peso máximo 3 MB.</Texts>
          </View>
          
          {
              personaExtranjera === 0 ? 
              <>
                <View style={ documentosStyles.cardsContainer } >
                  <InputDocument document='INE-Frontal' onUpload={handleUploadAnversoID} />
                  <InputDocument document='INE-Reverso' onUpload={handleUploadReversoID} />
                  <InputDocument document='Carátula del estado de cuenta' onUpload={handleUploadCaraturalEstadoCuenta} />
                  <InputDocument document='Comprobante de domicilio' onUpload={handleUploadComprobanteDom} />
                </View>              
              </>

              :
              
              <View style={ documentosStyles.cardsContainer } >
                <InputDocument document='Anverso ID del país de origen' onUpload={handleUploadAnversoID} />
                <InputDocument document='Reverso ID del país de origen' onUpload={handleUploadReversoID} />
                <InputDocument document='CURP emitido por RENAPO' onUpload={handleUploadCURP} />
                <InputDocument document='RFC emitido por el SAT' onUpload={handleUploadRFC} />
                <InputDocument document='Anverso forma migratoria' onUpload={handleUploadAnversoFormaMigratoria} />
                <InputDocument document='Reverso forma migratoria' onUpload={handleUploadReversoFormaMigratoria} />
                <InputDocument document='Carátula del pasaporte' onUpload={handleUploadCaratulaPasaporte} />
                <InputDocument document='Carátula del estado de cuenta' onUpload={handleUploadCaraturalEstadoCuenta} />
                <InputDocument document='Comprobante de domicilio' onUpload={handleUploadComprobanteDom} />
              </View>
          }
          <View style={ [documentosStyles.fila, {marginBottom: 20}] }>
            <TouchableOpacity style={{flexDirection: 'row', gap: 15, alignItems: 'center'}} onPress={() => setModalVisible(true)}>
              <FontAwesome6 name="question-circle" size={20} color="black" />
              <Texts type='h3'>Ayuda</Texts>
            </TouchableOpacity>
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
        style={ documentosStyles.modalView }
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={ documentosStyles.overlay } >
          <View style={documentosStyles.modalContent}>
            <Pressable
              style={ documentosStyles.close }
              onPress={() => setModalVisible(false)}>
                <Icon name='x' size={30} />
            </Pressable>
            <SliderDocumentos data={data} currentIndex={currentIndex} onIndexChanged={handleIndexChanged} />

          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleNotif}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleNotif(!modalVisibleNotif);
        }}>
        <View style={ documentosStyles.overlay } >
          <View style={documentosStyles.centeredView}>
            <View style={documentosStyles.modalView}>
              <Texts type='h2' extraStyles={[documentosStyles.modalText, {color: '#14DA13', fontFamily: 'Poppins-Bold'}]}>¡Listo!</Texts>
              <Texts type='h2' extraStyles={[documentosStyles.modalText, {fontFamily: 'Poppins-Bold'}]}>Tus datos serán verificados!</Texts>
              <Texts type='p' extraStyles={documentosStyles.modalText}>Te notificaremos en un plazo de 24-48 hrs cuando puedas comenzar a invertir.</Texts>
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
