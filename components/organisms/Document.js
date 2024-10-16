import React from "react"
import { StyleSheet, View } from "react-native"
import { Texts } from "../atoms/Texts"
import { FontAwesome } from '@expo/vector-icons'
import { InputFile } from "./InputFile"
import useDocumentValidation from "../functions/validateDocumentos"

export const Document = ({ data, onFileSelect, onPressButton, isUploaded }) => {
    const { title, file, date, type, validate } = data

    return (
        <View style={Styles.containerHome}>
            <View>
                <Texts type='h3' >{title}</Texts>
            </View>
            {
                isUploaded  ?
                    <View style={Styles.containerWhite}>
                        <View style={Styles.row}>
                            <View style={[Styles.imgContainer, {marginHorizontal: 10}]}>
                                <FontAwesome name={'file'} size={16} color={'#C20000'} />
                            </View>
                            <Texts numberOfLines={1} extraStyles={{ width: '100%', color: '#C20000' }} type='pSmall' >{file}</Texts>
                        </View>
                    </View>
                :
                    file && validate ?
                        <View style={Styles.container}>
                            <View style={Styles.row}>
                                <View style={Styles.background}>
                                    <View style={Styles.imgContainer}>
                                        <FontAwesome name={'file'} size={16} color={'#D9D9D9'} />
                                    </View>
                                </View>
                                <Texts numberOfLines={1} extraStyles={{ width: 200 }} type='pSmall' >{file}</Texts>
                            </View>
                            <View>
                                <Texts type='h2' extraStyles={Styles.date}>{date}</Texts>
                            </View>
                        </View>
                    :
                        <InputFile file={(file == null ? undefined : file)} validate={validate} onPressButton={() => onPressButton(type)} onFileSelect={(file) => onFileSelect(type, file)} />
                

            }
        </View>
    )
}

const Styles = StyleSheet.create({
    containerHome: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    container: {
        backgroundColor: '#FFFFFF33',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 64,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8
    },
    containerWhite: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 64,
        paddingHorizontal: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    background: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 12,
        height: 16
    },
    file: {
        color: '#757575',
        fontFamily: 'Poppins',
        fontSize: 12,
        paddingLeft: 10
    },
    date: {
        color: '#828282',
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 30
    }
})
