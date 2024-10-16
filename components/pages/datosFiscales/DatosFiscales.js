import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Texts } from "../../atoms/Texts"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation  } from '@react-navigation/native'
import Checkbox from "expo-checkbox"
import { DropdownDatos } from "../../organisms/DropdownDatos"
import { InputsDatos } from "../../organisms/InputsDatos"
import { Edit } from "../../atoms/Edit"
import { Button } from "../../atoms/Button"

export const DatosFiscales = () => {

    const [editFlag, setEditFlag] = useState(false)
    const [modal, setModal] = useState(false)

    const navigation = useNavigation()

    const DATA = {
        checked: true,
        recursosInversion: 'ahorros',
        rfc: '888888888888888',
        clabe: '8888 8888 8888 8888',
        ocupacion: 'Estudiante',
        estado: 'Querétaro',
        calle: 'Blvd. Bernardo Quintana',
        exterior: '526',
        interior: 'N/A',
        cp: '76140',
        colonia: 'Arboledas',
        municipio: 'Santiago de Querétaro'
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.containerHeader}>
                {
                    !editFlag && <TouchableOpacity style={styles.arrow} onPress={ () => navigation.goBack()}>
                        <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#000'} />
                    </TouchableOpacity>
                }
                    
                <Texts type={'h4'} extraStyles={styles.titleHeader}>Datos Fiscales</Texts>

            </View>

            <View style={styles.form}>

                <View style={styles.containerInputCheckbox}>
                    <Checkbox requireValue={true} color={'#14DA13'} disabled={!editFlag} value={DATA.checked}></Checkbox>
                    <Texts type={'p'} extraStyles={styles.textCheckbox}>Manifiesto bajo protesta de decir verdad, que el domicilio señalado es el actualmente registrado ante el Servicio de Administración Tributaria (SAT).</Texts>
                </View>

                <View style={[styles.containerInput, {zIndex: 101}]}>
                    
                    {

                        editFlag ? <DropdownDatos editable={editFlag} placeholder={'Selecciona una opción'} requireValue={true} valueDefault={DATA.recursosInversion}>Fuente de recursos para inversión</DropdownDatos>
                        :
                        <InputsDatos
                            placeholder={'Selecciona una opción'}
                            secureTextEntry={false}
                            value={DATA.recursosInversion}
                            requireValue={true}
                            inputMode={'text'}  
                            editable={editFlag}
                            keyboard={'default'}
                        >Fuente de recursos para inversión</InputsDatos>

                    }

                </View>

                {/* CAMPO DE RFC , SE OCULTA CUANDO SE EDITA, ASI ESTABA EN DISEÑO */}
                {

                    editFlag ? <></>
                    :
                    <View style={[styles.containerInput, {zIndex: 100}]}>
                        <InputsDatos
                            placeholder={'Selecciona una opción'}
                            secureTextEntry={false}
                            value={DATA.recursosInversion}
                            requireValue={true}
                            inputMode={'text'}  
                            editable={editFlag}
                            keyboard={'default'}
                        >RFC</InputsDatos>
                    </View>

                }

                <View style={[styles.containerInput, {zIndex: 99}]}>
                    
                    {

                        editFlag ? <DropdownDatos editable={editFlag} placeholder={'Selecciona una opción'} requireValue={true} valueDefault={DATA.recursosInversion}>Ocupación</DropdownDatos>
                        :
                        <InputsDatos
                            placeholder={'Selecciona una opción'}
                            secureTextEntry={false}
                            value={DATA.ocupacion}
                            requireValue={true}
                            inputMode={'text'}  
                            editable={editFlag}
                            keyboard={'default'}
                        >Ocupación</InputsDatos>

                    }

                </View>

                <View style={[styles.containerInput, {zIndex: 98}]}>
                    
                    

                    {

                        editFlag ? <DropdownDatos editable={editFlag} placeholder={'Selecciona una opción'} requireValue={true}>Estado</DropdownDatos>
                        :
                        <InputsDatos
                            placeholder={'Selecciona una opción'}
                            secureTextEntry={false}
                            value={DATA.estado}
                            requireValue={true}
                            inputMode={'text'}  
                            editable={editFlag}
                            keyboard={'default'}
                        >Estado</InputsDatos>

                    }

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe el nombre de tu calle'}
                        secureTextEntry={false}
                        value={DATA.calle}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Calle</InputsDatos>

                </View>

                <View style={styles.containerMultipleInput}>

                    <InputsDatos
                        placeholder={'Escribe el número exterior'}
                        secureTextEntry={false}
                        value={DATA.exterior}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                        size={'small'}
                        extraStyles={{width: 80}}
                    >Exterior</InputsDatos>

                    <InputsDatos
                        placeholder={'Escribe el número interior'}
                        secureTextEntry={false}
                        value={DATA.interior}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                        size={'small'}
                        extraStyles={{width: 80}}
                    >Interior</InputsDatos>

                    <InputsDatos
                        placeholder={'Escribe el código postal'}
                        secureTextEntry={false}
                        value={DATA.cp}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                        size={'small'}
                        extraStyles={{width: 80}}
                    >C.P.</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe el nombre de tu colonia'}
                        secureTextEntry={false}
                        value={DATA.colonia}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Colonia</InputsDatos>

                </View>

                <View style={styles.containerInput}>
                    
                    <InputsDatos
                        placeholder={'Escribe el nombre de tu Alcaldía/Municipio'}
                        secureTextEntry={false}
                        value={DATA.colonia}
                        requireValue={true}
                        inputMode={'text'}  
                        editable={editFlag}
                        keyboard={'default'}
                    >Alcaldía/Municipio</InputsDatos>

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
                            <Texts type='h2' extraStyles={{ color: '#040404' , marginBottom: 10, marginTop: 0, fontSize: 16, fontStyle: 'normal'}}>Advertencia</Texts>
                            <Texts type='p' extraStyles={{ color: '#2B2B2B', textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Light', lineHeight: 22 }}>Si modificas tus datos deberás actualizar tus documentos y esperar a que éstos sean validados.</Texts>
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
    container: {
        position: 'relative',
        backgroundColor: '#F2F5FA'
    },
    containerHeader: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
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
    form: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerInput: {
        flexDirection: 'column',
        paddingTop: 5,
    },
    containerInputCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        paddingHorizontal: 30
    },
    textCheckbox: {
        color: '#757575',
        fontFamily: 'Poppins',
        fontSize: 12,
        width: '90%'
    },
    containerBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    message: {
        color: '#2B2B2B',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        lineHeight: 22,
        textAlign: 'left',
        paddingHorizontal: 23
    },
    containerMultipleInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 32
    }
})