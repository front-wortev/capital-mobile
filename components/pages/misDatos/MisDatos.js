import React,  {useState} from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Texts } from "../../atoms/Texts"
import { FontAwesome5 } from "@expo/vector-icons"
import { Edit } from "../../atoms/Edit"
import { InputsDatos } from "../../organisms/InputsDatos"
import { RadioButtons } from '../../molecules/RadioButtons'
import { Button } from '../../atoms/Button'
import { useNavigation  } from '@react-navigation/native'

export const MisDatos = () => {

    const navigation = useNavigation()

    const [editFlag, setEditFlag] = useState(false)
    const [modal, setModal] = useState(false)

    const DATA = { 
        name: 'Ana María Guadalupe',
        apellidos: 'Colón López',
        fechaNacimiento: '11/01/1996',
        sexo: 1,
        curp: '888888888888',
        numTelefonico: '+52 4423654598',
        correo: 'hola@gmail.com',
        nacionalidadExtranjera: false,
        politicamenteExpuesta: false
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.containerHeader}>
                {
                    !editFlag && <TouchableOpacity style={styles.arrow} onPress={ () => navigation.navigate('Home')}>
                        <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#000'} />
                    </TouchableOpacity>
                }
                    
                <Texts type={'h4'} extraStyles={styles.titleHeader}>Mis datos</Texts>
            </View>

            <View style={styles.form}>
                
                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu nombre'}
                        secureTextEntry={false}
                        value={DATA.name}
                        requireValue={true}
                        inputMode={'text'}
                        editable={editFlag}
                        keyboard={'default'}
                    >Nombre</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos 
                        placeholder={'Escribe tus apellidos'}
                        secureTextEntry={false}
                        value={DATA.apellidos}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Apellidos</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu fecha de nacimiento'}
                        secureTextEntry={false}
                        value={DATA.fechaNacimiento}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        icon={'calendar-alt'}
                    >Fecha de nacimiento</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    <RadioButtons requireValue={true} option1={'Masculino'} option2={'Femenino'} extraStyles={''} editable={editFlag} value={DATA.sexo}>Sexo asignado al nacer</RadioButtons>
                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu CURP'}
                        secureTextEntry={false}
                        value={DATA.curp}
                        requireValue={false}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >CURP</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu número telefónico'}
                        secureTextEntry={false}
                        value={DATA.numTelefonico}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'numeric'}
                    >Número telefónico</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu correo electrónico'}
                        secureTextEntry={false}
                        value={DATA.correo}
                        requireValue={true}
                        inputMode={'text'} 
                        editable={editFlag}
                        keyboard={'email-address'}
                    >Correo electrónico</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    <RadioButtons requireValue={false} option1={'No'} option2={'Si'} extraStyles={''} editable={editFlag}>Nacionalidad extranjera</RadioButtons>
                </View>

                <View style={styles.containerInput}>
                    <RadioButtons requireValue={false} option1={'Si'} option2={'No'} extraStyles={''} editable={editFlag}>Personas politicamente expuesta</RadioButtons>
                </View>

                {
                    editFlag && 
                    <View style={styles.containerBottom}>
                        <Texts type={'p'} extraStyles={styles.message}>Si modificas tus datos deberás actualizar tus documentos y esperar a que éstos sean validados.</Texts>
                    </View>
                }

                {   <Edit onPress={() => setModal(!modal)} onPressCancel={() => setEditFlag(!editFlag)} extraStyles={[{backgroundColor: editFlag ? '#14da13' : '#fff' }]} status={editFlag}></Edit> }

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: 310, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
                            <Texts type='h1' extraStyles={{ color: '#040404' , marginBottom: 10, marginTop: 0, fontSize: 16, fontStyle: 'normal'}}>Advertencia</Texts>
                            <Texts type='h3' extraStyles={{ color: '#2B2B2B', textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Light', lineHeight: 22 }}>Si modificas tus datos deberás actualizar tus documentos y esperar a que éstos sean validados.</Texts>
                            <View style={{width: '100%', justifyContent:'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 20}}>
                                <Button  type='secondary' size='btnSmall' textColor='#2B2B2B' onPress={() => setModal(false)} >CANCELAR</Button>
                                <Button  type='primary' size='btnSmall' textColor='#FFF' onPress={() => {
                                    setModal(false)
                                    setEditFlag(!editFlag)
                                }}>MODIFICAR</Button>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>

        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    containerHeader: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
    },
    containerBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    arrow: {
      position: 'absolute',
      left: 40,
      top: 20
    },
    titleHeader: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: '#222'
    },
    container: {
      position: 'relative',
      backgroundColor: '#F2F5FA'
    },
    form: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerInput: {
        flexDirection: 'column',
        paddingBottom: 0
    },
    message: {
        color: '#2B2B2B',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        lineHeight: 22
    }
})