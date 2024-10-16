import React, { useState, useEffect, useCallback} from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import { homeStyles } from './homeStyles'
import { useHeaderHeight } from '@react-navigation/elements'
import { FontAwesome5 } from '@expo/vector-icons'
import { CardHome } from './CardHome'
import { Inversiones } from './Inversiones'
import { PortafolioWcapital } from './PortafolioWcapital'
import { Texts } from '../../atoms/Texts'
import { Button } from '../../atoms/Button'
import { API_BASE } from '@env'
import { useFetch } from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { GradientCircle } from '../InversionesHome/GradientCircle'
import { SvgUri } from 'react-native-svg'
import { useFocusEffect } from '@react-navigation/native'

export const Home = ({navigation}) => {

    const tokenRedux = useSelector((state) => state.session.token)
    const modalData = useSelector((state) => state.data.modalFirmamex.data.attributes)

    const modalImage = modalData.image.data.attributes
    const uriImage = modalImage ? 'https://strapi.wortev.com' + modalImage.url : null;

    const headerHeight = useHeaderHeight()
    const [modalSuccess, setModalSuccess] = useState(false)
    const [inversiones, setInversiones] = useState([])
    
    const [rendimientos, setRendimientos] = useState(null)

    const chargeData = async() => {

        const apiBase = API_BASE
        const endPoint = '/inversiones'
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${tokenRedux.access_token}`)
    
        const fetch = await useFetch(apiBase+endPoint, headers, 'GET', 'normal')
      
        if(fetch.data.length > 0){
    
          setInversiones(fetch.data)
    
        }else{
          console.log('lista vacia')
        }
      
    }

    const globalReturns = async () => {

        const apiBase = API_BASE
        const endPoint = '/inversion/rendimiento/global'
        const token = tokenRedux.access_token
    
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "application/json")
        headers.append("Authorization", `Bearer ${token}`)
    
        const fetch = await useFetch(apiBase+endPoint, headers, 'GET', 'normal')
      
        if(fetch.message === 'Rendimientos Globales'){
            
            console.log(fetch.data)
            setRendimientos(fetch.data)
    
        }else{
          console.log('error en consulta de rendimientos globales')
        }
    
    }

    useEffect(() => {
        if(inversiones.length === 0) {
            setModalSuccess(true)
        }
      }, []);
    
      const closeModal = () => {
        setModalSuccess(false);
      };

      useFocusEffect(
        useCallback(() => {
          chargeData();
          globalReturns();
        }, [])
      );

    return (
        
        <View style={ homeStyles.container }>

        <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: '1000%'}}
        />
        {
           inversiones.length > 0 && rendimientos && 
            <View style={{position: 'absolute', top: '80%',right: '50%'}}>
                <GradientCircle extraStyles={{opacity: 1}} color='#C2E0F6' />
            </View>
        }
            {

                rendimientos && <CardHome extraStyles={{ marginTop: headerHeight }} total={rendimientos.total_invertido} global={rendimientos.rendimiento_global}/> 
            
            }
            {
                
                inversiones.length > 0 && rendimientos ? 
                    <View style={{ width: '100%', height: '65%', justifyContent: 'space-between'}}>
                        <Inversiones data={inversiones} /> 
                        <PortafolioWcapital />
                    </View>
                    : 
                    <View style={{marginTop: '5%'}} >
                        <Texts type='h3' extraStyles={{marginLeft: '3%'}}>Inversiones</Texts>
                        <View style={{alignItems: 'center', marginVertical: 60}}>
                            <Texts type='p' extraStyles={{ marginHorizontal: 50, marginBottom: 6 }} >Aún no cuentas con inversiones.</Texts>
                            <Button type='primary' size={'btnSmall'} onPress={() => navigation.navigate('InversionesStack')}>Comenzar</Button>
                        </View>
                        <View style={homeStyles.slide}>
                            <View>
                                <Texts type='h2' extraStyles={[homeStyles.title, { marginBottom: 10 }] }>Pssst...</Texts>
                                <Texts type='p' extraStyles={[homeStyles.title, { marginHorizontal: 25}]}>Activa una inversión para desbloquear más beneficios.</Texts>
                                <View style={{marginTop: '5%', alignItems: 'flex-end', marginRight: '8%'}}>
                                    <FontAwesome5 name="lock" size={20} color="#14DA13" />
                                </View>
                            </View>
                        </View>
                    </View>

            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalSuccess}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: '#FFFFFF', borderRadius: 10, paddingVertical: 20, alignItems: 'center', gap: 10, paddingHorizontal: 30, paddingTop: 50 }}>
                        <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                            <FontAwesome5 name="times" size={24} color="black" />
                        </TouchableOpacity>
                        {modalImage.mime === 'image/svg+xml' && uriImage ? (
                            <SvgUri width='156' height="166" uri={uriImage} />
                        ) : uriImage ? (
                            <Image
                            source={{ uri: uriImage }}
                            alt={modalImage.alternativeText}
                            style={{marginVertical: 25}}
                            />
                        ) : null}
                        <Texts type='h2' extraStyles={{ color: '#14DA13' }}>{modalData.title}</Texts>
                        <Texts type='p' extraStyles={{marginBottom: 25, textAlign: 'center'}} >{modalData.text_descrip}</Texts>
                    </View>
                    </View>
                </Modal>
        </View>
        
    )

}