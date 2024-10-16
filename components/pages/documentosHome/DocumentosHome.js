import { View, TouchableOpacity, Modal, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { API_BASE } from '@env'
import { Texts } from "../../atoms/Texts"
import { AntDesign, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { documentosStyles } from "./documentosStyles"
import { Document } from "../../organisms/Document"
import { useEffect, useState } from "react"
import { Logo } from '../../atoms/Logo';
import { Button } from '../../atoms/Button'
import { useHeaderHeight } from "@react-navigation/elements"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux";
import useDocumentValidation from '../../functions/validateDocumentos';
import SliderDocumentos from "../documentos/sliderDocumentos"

export const DocumentosHome = ({navigation, route}) => {

    const header = route.params?.header
    const slideDocsImages = useSelector((state) => state.data.slideImages.data);
    const userData = useSelector((state) => state.user.userData);
    const tokenRedux = useSelector((state) => state.session.token)

    const validateDocs = useDocumentValidation()
    const height = useHeaderHeight()

    const docsImages = slideDocsImages.map((item) => {
        return item.attributes.image_slide.data.map((image) => {
            return {
            url: image.attributes.url,
            name: image.attributes.name,
            alternativeText: image.attributes.alternativeText,
            mime: image.attributes.mime,
            };
        });
    }).flat()

    const docsHelp = [
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
    const [ modalHelpDocs, setModalHelpDocs ] = useState(false)
    const [modal, setModal] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState({})
    const [uploadedFiles, setUploadedFiles] = useState({})
    const [flag, setFlag] = useState(true)
    const [headerVisible, setHeaderVisible] = useState(true)

    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    };

    const data = validateDocs.data

    const documentoRevision = validateDocs.documentoRvesion;

    const handleFileSelect = (type, file) => {
        setSelectedFiles(prevState => ({ ...prevState, [type]: file }));
    }

    const handleDocs = async (type) => {
        const apiBase = API_BASE;
        const endPoint = '/perfil/documentacion/update';
        const token = tokenRedux.access_token;

        const formData = new FormData();
        const file = selectedFiles[type];

        if (file) {
            formData.append(type, {
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
            name: file.name,
            type: file.mimeType,
            });
        } else {
            console.log(`No se ha seleccionado ningún archivo para el tipo: ${type}`);
            return;
        }

        const response = await fetch(apiBase + endPoint, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        const result = await response.json();
        console.log(result);

        if (result && result.message === 'Archivos cargados correctamente') {
            setUploadedFiles(prevState => ({ ...prevState, [type]: true }));
        }
    }

    useEffect(() => {
        if (validateDocs.validados) {
            setFlag(false);
        }
    }, [validateDocs.validados]);

    useEffect(() => {
        if (!header) {
            setHeaderVisible(false);
        }
    }, [header]); 
    
    useEffect(() => {
        if (validateDocs.conError) {
            setModal(true);
        }
    }, []); 

    const dataMap = data.reduce((acc, item) => {
        acc[item.type] = item.title;
        return acc;
    }, {});

    return (
        <SafeAreaView style={[documentosStyles.container, { paddingTop: !headerVisible ? height : 0 }]}>
            <LinearGradient
                colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            {
                headerVisible &&
                <View style={documentosStyles.containerHeader} >
                    <TouchableOpacity style={documentosStyles.arrow} onPress={() => navigation.goBack()}>
                        <FontAwesome5 name='long-arrow-alt-left' size={32} color='#2B2B2B' />
                    </TouchableOpacity>
                    <Texts type='h2' extraStyles={{fontSize: 20}} >Documentación</Texts>
                </View>
            }
            <ScrollView>
                <View>
                    {
                        flag ? 
                        <>
                            <Texts type='h2' extraStyles={documentosStyles.textTypeFormat}>Formatos aceptados jpeg, jpg, png, pdf, git, tiff, bmp.</Texts>
                            <Texts type='h2' extraStyles={documentosStyles.textTypeFormat}>Peso máximo 3 MB.</Texts>
                        </> : 
                        <Texts type='h2' extraStyles={[documentosStyles.title, { textAlign: 'center', justifyContent: 'center', marginTop: 0, width: '100%' }]} >Tus documentos se encuentran al día.</Texts>
                    }
                </View>
                {
                    data.map((val, index) => {
                        const isUploaded = documentoRevision.includes(val.type) || uploadedFiles[val.type];
                        return <Document 
                                    data={val} 
                                    key={index} 
                                    onFileSelect={handleFileSelect} 
                                    onPressButton={handleDocs}
                                    isUploaded={isUploaded}
                                />
                    })
                }
                <View style={{ width: '100%',marginVertical: 30, justifyContent: 'center', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity style={{flexDirection: 'row', gap: 15, alignItems: 'center'}} onPress={() => setModalHelpDocs(true)}>
                        <FontAwesome6 name="question-circle" size={20} color="black" />
                        <Texts type='h3'>Ayuda</Texts>
                    </TouchableOpacity>
                    <View style={{ opacity: 0.3 }}>
                        <Logo />
                    </View>
                </View>
            </ScrollView>
            <Modal
                style={ documentosStyles.modalView }
                animationType="fade"
                transparent={true}
                visible={modalHelpDocs}>
                <View style={ documentosStyles.overlay } >
                    <View style={documentosStyles.modalContent}>
                        <Pressable
                        style={ documentosStyles.close }
                        onPress={() => setModalHelpDocs(false)}>
                            <FontAwesome5 name="times" size={24} color="black" />
                        </Pressable>
                        <SliderDocumentos data={docsHelp} currentIndex={currentIndex} onIndexChanged={handleIndexChanged} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: 310, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
                        <Texts type='h2' extraStyles={{ color: '#C20000', marginBottom: 20, marginTop: 0 }}>Documento rechazado</Texts>
                        <Texts type='p' extraStyles={{ textAlign: 'center', lineHeight: 22 }}>Tu documento no cumple con los requisitos.</Texts>
                        {
                            validateDocs.rejectedMessages && 
                            Object.entries(validateDocs.rejectedMessages).map(([key, message]) => (
                                
                                <View key={key} style={{ gap: 10, width: '100%', paddingHorizontal: 5, paddingVertical: 15 }}>
                                    <Texts type='h3'>{dataMap[key]}</Texts>
                                    <View style={{flexDirection: 'row', gap: 10,}}>
                                        <AntDesign name='closecircle' size={20} color={'#C20000'} />
                                        <Texts type='p' extraStyles={{ lineHeight: 22 }}>{message}</Texts>
                                    </View>
                                </View>
                            ))
                        }

                        <View style={{ position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
                            <Button type='primary' size='btnLarge' textColor='#FFF' onPress={() => {
                                setModal(false)
                            }} extraStyles={{ width: '100%', backgroundColor: '#040404' }}>REINTENTAR</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
