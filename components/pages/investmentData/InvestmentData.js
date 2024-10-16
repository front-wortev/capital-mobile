import React, { useEffect, useState } from "react"
import { Texts } from "../../atoms/Texts"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation  } from '@react-navigation/native'
import { investmentDataStyles } from './investmentDataStyles'
import { View, TouchableOpacity, Modal, ToastAndroid } from "react-native"
import { FontAwesome5, Entypo, AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux'
import { changePath } from "../../../redux/path/pathName"
import { useRoute } from "@react-navigation/native"
import { API_BASE } from '@env'
import { reusableStyles } from "../../reusableStyles"
import { useFetch } from "../../../hooks/useFetch"
import { InputFile } from "../../organisms/InputFile"
import { Pressable } from "react-native"
import FileDownloader from "../../functions/FileDownloader"
import { Buffer } from 'buffer';
import { LinearGradient } from "expo-linear-gradient"


export const InvestmentData = ({route}) => {

    const [ modalVisibleDownload, setModalVisibleDownload ] = useState(false)
    
    const ruta = useRoute()

    const tokenRedux = useSelector((state) => state.session.token)
    const [rendimientos, setRendimientos] = useState(null)
    const [total, setTotal] = useState(null)

    const [invertido, setInvertido] = useState(null)
    const [rendimientoInvertido, setRendimientoInvertido] = useState(null)
    const [porcentaje, setPorcentaje] = useState(null)

    const [fileUrl, setFileUrl] = useState(null)
    const [comprobante, setComprobante] = useState({})
    const [uploadComprobante, setUploadComprobante] = useState(false)
    const [fileName, setFileName] = useState('')

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const globalReturns = async (id) => {

        const apiBase = API_BASE
        const endPoint = `/inversion/rendimiento/global/${id}`
        const token = tokenRedux.access_token
    
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "application/json")
        headers.append("Authorization", `Bearer ${token}`)
    
        const fetch = await useFetch(apiBase+endPoint, headers, 'GET', 'normal')
      
        if(fetch.message === 'Rendimientos Globales'){

            let aux1 = parseFloat(fetch.data.rendimiento_global.replace(/\$|,/g, ''))
            let aux2 = parseFloat(fetch.data.total_invertido.replace(/\$|,/g, ''))
           
            setInvertido(parseInt(aux2))
            setRendimientoInvertido(parseInt(aux1))
            setPorcentaje((aux1/aux2).toFixed(2)*100)
            
            setRendimientos(fetch.data.rendimiento_global)
            setTotal(fetch.data.total_invertido)
    
        }
    }

    const comprobantePago = async (id) => {
        const apiBase = API_BASE;
        const endPoint = `/inversion/comprobantePago/${id}`;
        const token = tokenRedux.access_token;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const response = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');

        if (response.message === 'ok') {

            const [prefix, base64Data] = response.data.split(',');

            const contentTypeMatch = prefix.match(/data:(.*);base64/);
            const contentType = contentTypeMatch ? contentTypeMatch[1] : 'application/octet-stream';

            const fileExtension = contentType.split('/')[1];
            const fileName = `comprobante_pago.${fileExtension}`;

            const base64ToBlob = (base64, contentType) => {
                const byteArray = Buffer.from(base64, 'base64');
                return new Blob([byteArray], { type: contentType });
            };

            const blob = base64ToBlob(base64Data, contentType);
            const file = new File([blob], fileName, { type: contentType });

            setFileName(file.name)

        } 
    };

    useEffect(() => {
        dispatch(changePath(ruta.name))
        globalReturns(route.params.id)
        if(route.params.comprobante || uploadComprobante) {
            comprobantePago(route.params.id)
            setUploadComprobante(true)
        }
    }, [])

    const downloadEstadoDeCuenta = async () => {
        const apiBase = API_BASE;
        const endPoint = `/inversion/estado-cuenta/${route.params.id}`;
        const token = tokenRedux.access_token;
    
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
    
        try {
            const response = await fetch(apiBase + endPoint, {
                method: 'GET',
                headers: headers,
            });
    
            if (response.ok) {
                const data = await response.json();
                const url = data.data.url;
                setFileUrl(url)
                ToastAndroid.show('Descargando archivo', ToastAndroid.SHORT)
            } else {
                console.error("Error al obtener la URL del estado de cuenta");
            }
        } catch (error) {
            console.error("Error al descargar el estado de cuenta:", error);
        }        
    };

    const handleDocs = async() => {
        const apiBase = API_BASE
        const endPoint = `/inversion/upload/comprobantePago/${route.params.id}`
        const token = tokenRedux.access_token
    
        const formData = new FormData();
        formData.append('comprobante', { 
          uri: 
            Platform.OS === 'android'
            ? comprobante.uri
            : comprobante.uri.replace('file://', ''),
          name: comprobante.name,
          type: comprobante.mimeType,
        });
    
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
    
        if ( result && result.message === 'Comprobante cargado correctamente') {
            setUploadComprobante(true)
            ToastAndroid.show('Comprobante cargado correctamente', ToastAndroid.SHORT)
        } else {
            ToastAndroid.show('Error al subir el comprobante', ToastAndroid.SHORT)
        }
    }
      
    const priceFormat = (price) => {
        return new Intl.NumberFormat().format(price)
    }

    const onFileSelect = (file) => {
        setComprobante(file)
    };

    const onPressButton = () => {
        handleDocs()
    };

    return (
        <SafeAreaView style={investmentDataStyles.container}>
            <LinearGradient
          colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={reusableStyles.background}
      />

            <View style={investmentDataStyles.containerHeader}>
               
                <TouchableOpacity style={investmentDataStyles.arrow} onPress={ () => navigation.navigate('InversionesStack', {comprobante: uploadComprobante}) }>
                    <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#000'} />
                </TouchableOpacity>
               
                <Texts type={'h2'} extraStyles={investmentDataStyles.titleHeader}>Mis inversiones</Texts>
                {
                    route.params.type === 'retiro' || route.params.type === 'completado' || route.params.type === 'reembolsado' ? 
                        <TouchableOpacity style={investmentDataStyles.points} onPress={() => setModalVisibleDownload(true)}>
                            <Entypo name='dots-three-vertical' size={ 20 } color = { '#14DA13'} />
                        </TouchableOpacity>
                    :
                    <></>
                }
                
            </View>

            <View style={investmentDataStyles.containerData}>
                <Texts extraStyles={investmentDataStyles.id}>{route.params.id}</Texts>
                <View style={[reusableStyles.row, {width: 'auto', paddingBottom: 20}]}>
                    <View style={[reusableStyles[route.params.type],  {width: 16, height: 16, borderRadius: 180, right: 8}]}></View>
                    <Texts type='p' extraStyles={investmentDataStyles.normal}>
                        {
                            route.params.type === 'completado' && 'Activa' ||
                            route.params.type === 'pendiente' && 'Incompleta' ||
                            route.params.type === 'reembolsado' && 'Finalizada' ||
                            route.params.type === 'retiro' && 'Retiro solicitado'
                        }
                    </Texts>
                </View>

                <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%'}]}>
                    <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>Fecha inicio </Texts>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>{route.params.type === 'pendiente' ? 'NA' : `${route.params.startDate}`}</Texts>
                    </View>
                </View>

                <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%'}]}>
                    <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>Finalización </Texts>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>{route.params.type === 'pendiente' ? 'NA' : `${route.params.endDate}`}</Texts>
                    </View>
                </View>

                <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                    <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>Monto inicial</Texts>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                        {total && <Texts type='p' extraStyles={[investmentDataStyles.money, {color: route.params.type === 'pendiente' && '#757575'}]}>{route.params.type === 'pendiente' ? `$${route.params.amount}.00` : total}</Texts>} 
                    </View>
                </View>

                <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                    <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                        <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>Rendimiento</Texts>
                    </View>
                    <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 5}}>
                            <Texts type='p' extraStyles={[investmentDataStyles.money, {color: route.params.type === 'pendiente' && '#757575'}]}>{route.params.type === 'pendiente' ? '0' : rendimientos}</Texts>
                            {
                                route.params.type != 'pendiente' && <Texts extraStyles={investmentDataStyles.porcentage}>+{(rendimientoInvertido/invertido).toFixed(2)*100}%</Texts>
                            } 
                        </View> 
                    </View>
                </View>

                {
                    route.params.type != 'retiro' && <>
                       <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                            <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                                <Texts type='p' extraStyles={[investmentDataStyles.normal, {color: route.params.type === 'pendiente' && '#757575'}]}>Pago</Texts>
                            </View>
                            <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                                <Texts type='p' extraStyles={[investmentDataStyles.money, {color: route.params.type === 'pendiente' && '#757575'}]}>mensual</Texts>
                            </View>
                        </View>
                    </>
                }

                {
                    route.params.type != 'pendiente' && 
                    <>
                        <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                            <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                                <Texts type='p' extraStyles={investmentDataStyles.grayText}>Tasa mensual</Texts>
                            </View>
                            <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                                <Texts type='p' extraStyles={investmentDataStyles.grayText}>2%</Texts>
                            </View>
                        </View>

                        <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                            <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                                <Texts type='p' extraStyles={investmentDataStyles.grayText}>IVA del 16% (del 2%)</Texts>
                            </View>
                            <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                                <Texts type='p' extraStyles={investmentDataStyles.grayText}>$32.00</Texts>
                            </View>
                        </View>

                        <View style={investmentDataStyles.hr}></View>

                        <View style={[reusableStyles.row, {justifyContent: 'center', width: '100%'}]}>
                            <View style={{alignItems: 'flex-end', justifyContent:'center', width:'50%'}}>
                                <Texts type='p' extraStyles={investmentDataStyles.normal}>Total</Texts>
                            </View>
                            <View style={{alignItems: 'flex-start', justifyContent:'center', width:'50%', paddingLeft: 5}}>
                                <Texts type='p' extraStyles={route.params.type === 'reembolsado' ? investmentDataStyles.textGray : investmentDataStyles.textGreen}>${priceFormat(parseInt(invertido) + parseInt(rendimientoInvertido))} MXN</Texts>
                            </View>
                        </View>
                    </>
                }


                {
                    route.params.type === 'pendiente' && 
                    <>
                        { !uploadComprobante ?  
                        <>
                            <View style={investmentDataStyles.contCol}>
                                <FontAwesome6 name="exclamation" size={48} color="#C20000" />
                                <Texts type='p' extraStyles={investmentDataStyles.alert}>Adjunta tu comprobante de pago para activar esta inversión</Texts>
                            </View>
                            <View style={investmentDataStyles.cont}>                        
                                <InputFile
                                    file='Seleccionar archivo'
                                    onFileSelect={onFileSelect}
                                    onPressButton={onPressButton}
                                />
                            </View>
                        </>
                        :
                        <>
                            <View style={investmentDataStyles.contCol}>
                                <FontAwesome5 name="clock" size={48} color="#D9D9D9" />
                                <Texts type='p' extraStyles={[investmentDataStyles.alert, {color: '#D9D9D9'}]}>Tu comprobante está en proceso de validación</Texts>
                            </View>
                            <View style={investmentDataStyles.cardButton}>
                                <FontAwesome5 name="paperclip" size={24} color="#D9D9D9" />
                                <Texts type='p' extraStyles={{color: '#D9D9D9'}}>c{fileName}</Texts>
                            </View>
                        </>
                        }
                        <View style={investmentDataStyles.cont}>
                            <Texts type='p' extraStyles={investmentDataStyles.msg}>Tus rendimientos comenzarán cuando tu comprobante sea validado.</Texts>
                        </View>
                        <TouchableOpacity style={[reusableStyles.row, {width: '50%'}]} onPress={() => navigation.navigate('Depositar', {idInvesment: route.params.id})}>
                            <Texts type='p' extraStyles={investmentDataStyles.textLink}>Datos para depositar</Texts>
                            <FontAwesome  name='external-link' size={ 20 } color = { '#000'} />
                        </TouchableOpacity>
                </>
                }

                {
                    route.params.type === 'retiro' && <>
                        <View style={investmentDataStyles.cont}>
                            <Texts type='p' extraStyles={investmentDataStyles.process}>Tu solicitud de retiro está siendo procesada</Texts>
                        </View>
                        <View style={reusableStyles.row}>
                            <Texts type='p' extraStyles={investmentDataStyles.info}>Tu saldo será depositado en 2 dias hábiles después de la solicitud, posterior a la fecha de finalización.</Texts>
                        </View>
                    </>
                }


            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleDownload}
            >
                <Pressable onPress={() => setModalVisibleDownload(false)} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: '12%', right: 20}}>
                    <View style={investmentDataStyles.shadowProp}>
                        <Pressable onPress={downloadEstadoDeCuenta} style={{flexDirection: 'row', gap: 10}}>
                            <AntDesign name="download" size={24} color="#14DA13" />
                            <Texts type='h2' extraStyles={{color: '#14DA13'}}>Estado de cuenta</Texts>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

            {fileUrl && (
                <FileDownloader url={fileUrl} fileName={`estado-de-cuenta-${route.params.id}.pdf`} />
            )}

        </SafeAreaView>
    )
}