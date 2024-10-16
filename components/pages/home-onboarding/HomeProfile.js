import React, { useCallback, useEffect, useState } from 'react'
import { Image, Modal, TouchableOpacity, View } from 'react-native'
import { API_BASE } from '@env';
import { Texts } from '../../atoms/Texts'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavBarOnboarding } from '../../templates/NavBarOnboarding'
import { homeProfStyle } from './homeProfStyle'
import { CardHomeOnboarding } from '../../molecules/CardHomeOnboarding'
import { Button } from '../../atoms/Button'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Modals } from '../../molecules/Modals'
import useDocumentValidation from '../../functions/validateDocumentos';
import { LinearGradient } from 'expo-linear-gradient';
import { useFetch } from '../../../hooks/useFetch';
import { useFocusEffect } from '@react-navigation/native';

export const HomeProfile = ({navigation}) => {

  const userData = useSelector((state) => state.user.userData)
  const tokenRedux = useSelector((state) => state.session.token)


  const [ modalDocsVisible, setModalDocsVisible ] = useState(false);
  const [ modalFailedVisible, setModalFailedVisible ] = useState(false)
  const [ modalSuccessVisible, setModalSuccessVisible ] = useState(false)
  const [ modalContratoVisible, setModalContratoVisible ] = useState(false)
  const [ conError, setConError ] = useState(false)

  const [dataUser, setDataUser] = useState([])

  const docs = require('../../../assets/images/oficial-docs.png');

  if(userData.documentacion !== null ) {
    const resultado = useDocumentValidation();
    console.log(resultado);
    useEffect(() => {
      if (resultado.conError === true) {
        setModalFailedVisible(true)
        setConError(true)        
      } else {
        if(resultado.validados === true) {
          setModalSuccessVisible(true)
        }
      }
    }, [resultado.conError]);
  }
  
  const userDatas = async () => {
    const apiBase = API_BASE;
    const endPoint = '/perfil';
    const token = tokenRedux.access_token

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const fetchResponse = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');
    
    setDataUser(fetchResponse.data[0].perfil)
  }

  useFocusEffect(
    useCallback(() => {
      userDatas();
    }, [])
  );

  const handleTypePerson = () => {
    setModalDocsVisible(false)
    const stepProgress = userData.perfil.steps_progress || '1'
    
    if (userData.person_type === 'persona_fisica_sf') {
      switch (stepProgress) {
        case '1':
          navigation.navigate('DatosInversionista');
          break;
        case '2':
          navigation.navigate('Documentacion');
          break;
        default:
          setModalDocsVisible(false);
          break;
      }
    } else {
      switch (stepProgress) {
        case '1':
          navigation.navigate('Datos-inversionista-moral');
          break;
        case '2':
          navigation.navigate('Documentos-moral');
          break;
        default:
          setModalDocsVisible(false);
          break;
      }
    }
  };  

  //console.log(dataUser);

  const handleContrato = () => {
    setModalSuccessVisible(false)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Correo-firmamex' }],
    })
  }
  return (
    <View style={ homeProfStyle.container }>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <NavBarOnboarding/>
      <CardHomeOnboarding extraStyles={{ marginTop: 144 }}/>
      <View style={homeProfStyle.container}>

        {
          dataUser.documents_completed === true ? 
            <>
              <Texts type='p' extraStyles={{ color: '#D9D9D9',marginTop: 83, marginHorizontal: 50, marginBottom: 6 }} >Aún no cuentas con inversiones.</Texts>
              <Button type={'inactive'} size={'btnSmall'} disabled={true} >Comenzar</Button>
              {modalFailedVisible === true || modalSuccessVisible === true || conError === true ? 
              <></>
              :
              <View style={homeProfStyle.slide}>
                <Texts type='h2' extraStyles={[homeProfStyle.title, { marginBottom: 10 }] }>Tus datos están siendo verificados.</Texts>
                <Texts type='p' extraStyles={[homeProfStyle.title, { marginHorizontal: 25}]}>Mientras esperas, puedes calcular los rendimientos de tu próxima inversión.</Texts>
              </View> }
            </>
            :
            <>
              <Texts type='p' extraStyles={{ color: '#2B2B2B',marginTop: 83, marginHorizontal: '25%', marginBottom: 6, textAlign: 'center' }} >Completa tus documentos para comenzar a invertir</Texts>
              <Button type={'secondary'} size={'btnSmall'} onPress={() => setModalDocsVisible(true)} >¡vamos!</Button>
            </>

        }
      </View>

      <Modals
        visible={modalFailedVisible}
        title='Verificación fallida'
        colorTitle='#C20000'
        description='Se ha detectado un error en tu documentación.'
        buttonText='Ok'
        gap= {25}
        onButtonPress={() => setModalFailedVisible(false)}
      />

      <Modals
        visible={modalSuccessVisible}
        title='Verificación exitosa'
        subtitle='¡Estás a un paso de invertir!'
        description='Tus datos han sido validados correctamente.'
        buttonText='ir a firmar contrato'
        typeButton='secondary'
        gap= {10}
        onButtonPress={handleContrato}
      />

      <Modal
      animationType="fade"
      transparent={true}
      visible={modalDocsVisible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <Texts type='p' extraStyles={{marginBottom: 25}} >Prepara los siguientes documentos:</Texts>
            <Image 
              source={docs}
              style={{marginBottom: 25}}
            />
            {
              userData.person_type === 'persona_fisica_sf' ? 

              <FlatList 
                data={[
                  { key: 'INE' },
                  { key: 'Estado de cuenta bancario actual' },
                  { key: 'Constancia de situación fiscal / Comprobante de domicilio' },
                  { key: 'RFC' },
                  { key: 'CURP' }
                ]}
                renderItem={({item}) => {
                  return(
                  <Texts type='p'>{`\u2022 ${item.key}`}</Texts>
                  );
                }}
              />

              :

              <FlatList 
                data={[
                  { key: 'Acta constitutiva' },
                  { key: 'RFC de la empresa' },
                  { key: 'Carátula de edo. de cuenta' },
                  { key: 'Comprobante de domicilio de la empresa' },
                  { key: 'Poder notarial' },
                  { key: 'Identificación del representante legal' },
                  { key: 'Comprobante de domicilio  del representante' },
                ]}
                renderItem={({item}) => {
                  return(
                  <Texts type='p'>{`\u2022 ${item.key}`}</Texts>
                  );
                }}
              />
            }
            <Button type='primary' size='btnModal' extraStyles={{marginTop: 25}} onPress={handleTypePerson} >ok</Button>
          </View>
        </View>
      </Modal>
    </View>
  )
}
