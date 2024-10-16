import React, { useEffect, useState } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Texts } from "../atoms/Texts"
import  * as DocumentPicker from 'expo-document-picker'

export const InputDocument = ({validate = false, extraStyles, document, onUpload}) => {

    const [uri, setUri] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [flagButton, setFlagButton] = useState(false)

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ['image/*', 'application/pdf']
        });
        setUri(result.uri);
        setFileName(result.name);
        setFlagButton(true);
        if (onUpload) {
            onUpload(result);
        }
    };

    useEffect(() => {
        if(uri != null) 
            setFlagButton(true) 
        else 
            setFlagButton(false) 
    }, [uri])

    

    return (
        <View style={[styles.container, extraStyles, validate ? { backgroundColor: '#FFFFFF' } : flagButton ? { backgroundColor: '#F4FFF4', paddingLeft: 12 } : null ]}>
            {
                validate ? 

                <>
                    <View style={styles.fila}>
                        <FontAwesome5 style={{paddingLeft: 10}} name='paperclip' size={ 20 } color ='#C20000' />
                        <View>
                            <Texts type='h3' > {document} </Texts>
                            <View style={[styles.fila, {gap: 5}]}>
                                <Texts numberOfLines={1} type='pSmall' extraStyles={{color: '#757575'}}>{fileName}</Texts>
                                <FontAwesome name="times-circle" size={12} color ='#C20000' />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonDoc} onPress={() => pickDocument()}>
                        <Ionicons name="share-outline" size={24} color="white" />
                    </TouchableOpacity>
                </>

                
                : flagButton ?

                <>
                    <TouchableOpacity onPress={() => pickDocument()} style={[styles.fila, {gap: 12}]}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="file" size={24} color="#14DA13" />
                        </View>
                        <View>
                            <Texts type='h3' extraStyles={{color: '#14DA13'}} > {document} </Texts>
                            <Texts numberOfLines={1} type='pSmall' extraStyles={{color: '#757575', width: '95%'}}>{fileName}</Texts>
                        </View>
                    </TouchableOpacity> 
                </>
                

                :

                <>
                    <View style={styles.fila}>
                        <FontAwesome5 style={{paddingLeft: 10}} name='paperclip' size={ 20 } color ='#14DA13' />
                        <Texts type='h3' numberOfLines={1} extraStyles={{width: '80%'}} > {document} </Texts>
                    </View>
                    <TouchableOpacity style={styles.buttonDoc} onPress={() => pickDocument()}>
                        <Ionicons name="share-outline" size={24} color="white" />
                    </TouchableOpacity>
                </>
            }

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 65,
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: '8%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    buttonDoc: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 8,        
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fila: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#14DA131A',
        padding: 12,
        borderRadius: 8,        
        alignItems: 'center',
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