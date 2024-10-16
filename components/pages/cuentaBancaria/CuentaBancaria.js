import React,  {useState} from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Texts } from "../../atoms/Texts"
import { FontAwesome5 } from "@expo/vector-icons"
import { Edit } from "../../atoms/Edit"
import { InputsDatos } from "../../organisms/InputsDatos"
import { Button } from '../../atoms/Button'
import { useNavigation  } from '@react-navigation/native'

export const CuentaBancaria = () => {

    const [editFlag, setEditFlag] = useState(false)
    const [modal, setModal] = useState(false)

    const navigation = useNavigation()

    const DATA = { 
        titularCuenta: 'Ana María Guadalupe',
        institucion: 'BANAMEX',
        clabe: '8888 8888 8888 8888',
        numCuenta: '8888 8888 8888 8888',
        yoSoyBeneficiario: true,
        beneficiario: 'Ana María Guadalupe',
        curp: '888888888888',
        correo: 'ana.colon@gmail.com',
        numTelefonico: '+52 4423658974',
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.containerHeader}>
                {
                    !editFlag && <TouchableOpacity style={styles.arrow} onPress={ () => navigation.navigate('Home')}>
                        <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#000'} />
                    </TouchableOpacity>
                }
                    
                <Texts type={'h4'} extraStyles={styles.titleHeader}>Cuenta bancaria</Texts>
            </View>

            <View style={styles.form}>
                
                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu nombre'}
                        secureTextEntry={false}
                        value={DATA.titularCuenta}
                        requireValue={true}
                        inputMode={'text'}
                        editable={editFlag}
                        keyboard={'default'}
                    >Titular de la cuenta</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos 
                        placeholder={'Escribe tus apellidos'}
                        secureTextEntry={false}
                        value={DATA.institucion}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Institución bancaria</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu fecha de nacimiento'}
                        secureTextEntry={false}
                        value={DATA.clabe}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        
                    >CLABE interbancaria</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu fecha de nacimiento'}
                        secureTextEntry={false}
                        value={DATA.numCuenta}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                    >Número de cuenta</InputsDatos>

                </View>

                <View style={styles.containerTitle}>
                    <Texts type={'h1'} extraStyles={styles.beneficiario}>Beneficiario</Texts>
                    {
                        editFlag && <Texts type={'p'} extraStyles={styles.text} >En caso de fallecimiento, esta persona será el beneficiario de tus rendimientos pendientes por cobrar.</Texts>
                    }
                </View>

                {/* <View style={styles.containerInput}>
                    <Checkbox editable={editFlag} value={DATA.yoSoyBeneficiario}></Checkbox>
                    <Texts>Yo soy el beneficiario</Texts>
                </View> */}

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe tu CURP'}
                        secureTextEntry={false}
                        value={DATA.beneficiario}
                        requireValue={false}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Beneficiario</InputsDatos>

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
                    
                    <InputsDatos
                        placeholder={'Escribe tu número telefónico'}
                        secureTextEntry={false}
                        value={DATA.numTelefonico}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'numeric'}
                    >Teléfono</InputsDatos>

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
        paddingBottom: 0,
    },
    containerTitle: {
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20
    },
    message: {
        color: '#2B2B2B',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        lineHeight: 22
    },
    beneficiario: {
        color: '#222',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        
    },
    text: {
        color: '#000',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        paddingBottom: 15,
        width: '90%'
    }
})