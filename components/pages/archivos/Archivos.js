import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { archivosStyle } from './archivosStyles'
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements'
import { Modal } from 'react-native';
import { API_BASE } from '@env'
import { Pressable } from 'react-native';
import {  useSelector } from 'react-redux';
import { selectInversiones } from '../../../redux/async-slices/inversionSlice';
import FileDownloader from '../../functions/FileDownloader';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../../atoms/Button';
import { useFetch } from '../../../hooks/useFetch';

export const Archivos = () => {

    const headerHeight = useHeaderHeight()

    const inversiones = useSelector(selectInversiones);

    const tokenRedux = useSelector((state) => state.session.token)

    const [iconIdInversion, setIconIdInversion] = useState(null);

    const [anexoUrl, setAnexoUrl] = useState(null)

    const [iconColors, setIconColors] = useState({});
    const [ modalVisibleDownloadDocs, setModalVisibleDownloadDocs ] = useState(false);
    const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
    const iconRef = useRef(null);

    
    const updateIconColor = (id) => {
      setIconColors((prevColors) => {
        return {
          [id]: '#14DA13',
          ...prevColors,
        };
      });
    };
    
    const dotsFunction = (id, event) => {
      updateIconColor(id);
      const { pageY } = event.nativeEvent;
      setIconPosition({ top: pageY });
      setIconIdInversion(id);
      setModalVisibleDownloadDocs(true);
    }

    const resetAllIconColors = () => {
      setIconColors({});
    };

    const closeModal = () => {
      resetAllIconColors();
      setModalVisibleDownloadDocs(false);
    };
    

    const downloadAnexoContrato = async () => {
      const apiBase = API_BASE;
      const endPoint = `/inversion/anexo-contrato/${iconIdInversion}`;
      const token = tokenRedux.access_token;
    
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
    
      const fetchResponse = await useFetch(apiBase + endPoint, headers, 'GET', null, null);
    
      console.log(fetchResponse)
      if (!fetchResponse.error) {
        const url = fetchResponse.data.url;
        setAnexoUrl(url);
      } else {
        console.error("Error al obtener la URL del anexo de contrato:", fetchResponse.message);
      }
    };


  return (
    <ScrollView style={[archivosStyle.container, {marginTop: headerHeight, marginBottom: 20}]} >

        <View style={archivosStyle.title} >
            <Texts type='h1'>Archivos</Texts>
        </View>

        <View style={archivosStyle.textsContainer}>
            <Texts type='h2' >Contrato vigente</Texts>
            <Texts type='p' >Este documento te protege a ti como inversionista, plantea el funcionamiento, derechos y obligaciones de ambas partes. Este contrato digital tiene la misma validez que un contrato físico.</Texts>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button type='primary' size='btnLarge'>Ver contrato</Button>
            </View>
        </View>

        <View>
          <Texts type='h2' >Inversiones recientes</Texts>

          <View style={[archivosStyle.row, {marginTop: 15}]}>
            <Texts type='h3' >Pedido</Texts>
            <Texts type='h3'  >Estado</Texts>
          </View>

          <View>
            {inversiones
              .filter((inversion) => inversion.estatus_inversion.id_estatus_inv === 2 || inversion.estatus_inversion.id_estatus_inv === 3 || inversion.estatus_inversion.id_estatus_inv === 4)
              .map((inversion) => {
                return (
                  <View key={inversion.id_inversion} style={[archivosStyle.row, { marginTop: 15}]}>
                    <View style={archivosStyle.row1}>
                      <Texts type='p'>{inversion.id_inversion}</Texts>
                    </View>
                    <View style={archivosStyle.row2}>
                      <Texts type='p'>{inversion.estatus_inversion.estatus_name}</Texts>
                      <Entypo name="dots-three-vertical" size={24} color={iconColors[inversion.id_inversion] || '#000000'} onPress={(event) => dotsFunction(inversion.id_inversion, event)} ref={iconRef} />
                    </View>
                  </View>
                );
              })
            }
          </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleDownloadDocs}
            >
                <Pressable onPress={closeModal} style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <View style={[archivosStyle.shadowProp, { justifyContent: 'flex-start', alignItems:'flex-start', top: iconPosition.top - 20 , left: '5%' }]}>
                        <TouchableOpacity onPress={() => console.log('presio')} >
                          <View style={{flexDirection: 'row', width: 320, height: 30, gap: 10, alignItems: 'center'}} >
                            <FontAwesome name="envelope" size={24} color="#14DA13" />
                            <Texts type='h3' extraStyles={{color: '#14DA13'}}>Constancia retención de impuestos</Texts>
                          </View>
                        </TouchableOpacity>
                        <View style={archivosStyle.line}></View>                 
                        <TouchableOpacity onPress={downloadAnexoContrato} android_ripple={{ color: '#D9D9D9' }}>
                          <View  style={{flexDirection: 'row', gap: 10, height: 35, width: 320, alignItems: 'center'}}>
                            <Feather name="download" size={24} color="#14DA13" />
                            <Texts type='h3' extraStyles={{color: '#14DA13'}}>Anexo de contrato </Texts>
                          </View>
                        </TouchableOpacity>                        
                    </View>
                </Pressable>
            </Modal>

            { anexoUrl && (
              <FileDownloader url={anexoUrl} fileName={`anexo-contrato-${iconIdInversion}.pdf`} />
            )}

        </View>      

    </ScrollView>
  )
  }
