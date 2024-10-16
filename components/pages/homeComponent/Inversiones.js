import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { inversionesStyles } from './inversionesStyle'
import { Texts } from '../../atoms/Texts'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation  } from '@react-navigation/native'
import { Feather, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'

export const Inversiones = ({data}) => {

    const navigation = useNavigation()

    const priceFormat = (price) => {
        return new Intl.NumberFormat().format(price)
    }

    const typeText = (type) => {

        switch(type){
          case 1:
            return 'pendiente'
          case 2:
            return 'completado'
          case 3:
            return 'retiro'
          case 4:
            return 'reembolsado'
          default:
            
        }

    }

    const IconRen = (type) => {

        if(type.type === 'pendiente'){
            return <FontAwesome6 name="minus" size={12} color="#D9D9D9" />
        }

        if(type.type === 'completado'){
            return <Feather name="chevrons-up" size={14} color="#14DA13" />
        }

        if(type.type === 'retiro'){
            return <FontAwesome5 name="chevron-up" size={12} color="#D9D9D9" />
        }

        if(type.type === 'reembolsado'){
            return <FontAwesome5 name="chevron-up" size={12} color="#D9D9D9" />
        }

    }

    return (

        <View style={inversionesStyles.container}>

            <View style={inversionesStyles.header}>
                <Texts type={'h3'} extraStyles={[inversionesStyles.black, inversionesStyles.title]}>Inversiones</Texts>
                <Texts type={'p'} extraStyles={[inversionesStyles.gray, inversionesStyles.subtitle, {paddingRight: 12}]}>Rendimientos</Texts>
            </View>

            <ScrollView persistentScrollbar={true} style={inversionesStyles.listContainer}>

                {
                    data.slice(-5).reverse().map((item, index) => {

                        let type = typeText(item.estatus_inv_id)

                        return  <View style={[inversionesStyles.row]} key={index}>
                                    <View style={inversionesStyles.left}>
                                        <View style={[inversionesStyles['circle'], inversionesStyles[type]]}></View>
                                        <Texts type={'p'} style={inversionesStyles.number}>{item.id_inversion}</Texts>
                                    </View>
                    
                                    <View style={inversionesStyles.right}>
                                        <Texts type={'p'} extraStyles={inversionesStyles.quantity}>${priceFormat(item.monto)}</Texts>
                                        <IconRen type={typeText(item.estatus_inv_id)} />
                                    </View>
                                </View>
                    })

                }

            </ScrollView>

            <View style={inversionesStyles.buttonContainer} onPress={()=> console.log('clic')}>
                <TouchableOpacity style={{width: '100%', height: '100%', zIndex: 3}} onPress={() => navigation.navigate('InversionesStack')}>
                    <Image source={require('../../../assets/images/arrow.png')}/>
                </TouchableOpacity>
            </View>

        </View>

    )

}