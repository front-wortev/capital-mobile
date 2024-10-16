import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { reusableStyles } from '../reusableStyles'
import { MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'

export const Edit = (props) => {

  const { extraStyles, onPress, onPressCancel, status } = props

  return(

    <View style={{ position: 'absolute', right: 20, bottom: 0 }}>

        {
            status && 
                <TouchableOpacity style={
                    {
                        position: 'absolute',
                        bottom: 265,
                        right: 10,
                        borderRadius: 360,
                        width: 50,
                        height: 50,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: '#fff',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        // transform: [{translateY: translateY.value}]
                    }
                } onPress={onPressCancel}>
                    <MaterialIcons style={{paddingLeft: 0}} name='close' size={ 40 } color = { '#000' } />
                </TouchableOpacity>
        }
        

        <TouchableOpacity style={[reusableStyles.edit, extraStyles]} onPress={status ? onPressCancel : onPress}>
            {
                status ? <MaterialIcons style={{paddingLeft: 0}} name='check' size={ 40 } color = { '#fff' } /> : <MaterialIcons style={{paddingLeft: 0}} name='edit' size={ 40 } color = { '#14da13' } />
            }
            
        </TouchableOpacity>

    </View>

  );
}