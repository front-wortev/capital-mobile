import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { Texts } from "../atoms/Texts"
import * as DocumentPicker from 'expo-document-picker'
import { Button } from "../atoms/Button"

export const InputFile = ({ file = 'Seleccionar archivo', extraStyles, onFileSelect, onPressButton }) => {
    const [uri, setUri] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [flagButton, setFlagButton] = useState(false)

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        setUri(result.uri)
        setFileName(result.name)
        console.log(result);

        if (result.type === 'success') {
            onFileSelect(result); 
        }
    }

    useEffect(() => {
        if (uri != null)
            setFlagButton(true)
        else
            setFlagButton(false)
    }, [uri])

    return (
        <View style={[styles.container, extraStyles]}>
            <FontAwesome5 style={{ paddingLeft: 10 }} name='paperclip' size={20} color={flagButton ? '#13DA13' : '#C20000'} />
            <TouchableOpacity onPress={() => pickDocument()}>
                <Texts numberOfLines={1} type={'p'} extraStyles={{ textDecorationLine: 'underline', width: 160, color: flagButton ? '#13DA13' : '#C20000' }}>
                    {
                        uri != null ? fileName : file
                    }
                </Texts>
            </TouchableOpacity>

            {
                flagButton ? <Button type='secondary' disable={false} size='btnSmall' onPress={onPressButton} extraStyles={{height: 46}} >ENVIAR</Button> : <Button type='inactive' disable={true} size='btnSmall' extraStyles={{height: 46}} disabled={true}>ENVIAR</Button>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'relative',
        width: '100%',
        height: 65,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
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
    invalid: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 11.54,
        paddingVertical: 15,
        borderRadius: 8,
        pointerEvents: 'none'
    },
    valid: {
        backgroundColor: '#13DA13',
        paddingHorizontal: 11.54,
        paddingVertical: 15,
        borderRadius: 8,
        pointerEvents: 'normal'
    },
    white: {
        color: '#fff'
    },
    green: {
        color: '#13DA13'
    }
})
