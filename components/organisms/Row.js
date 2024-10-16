import React from 'react'
import { Texts } from '../atoms/Texts'
import { StyleSheet, View } from 'react-native'

export const Row = ({valor, porcentaje}) => {

    const type = Math.sign(valor) == 1 ? Styles.positivos : Styles.negativos

    return (
        <View style={Styles.row}> 
            <Texts type='p'>{Math.sign(valor) === 1 ? '' : '-'}${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format((valor < 0 ? valor * -1 : valor))}</Texts>
            {
                 Math.sign(valor) === 1 
                 ? 
                 <Texts type='p' extraStyles={Styles.positivos}>  {porcentaje}%</Texts>
                 :
                 <Texts type='p' extraStyles={Styles.negativos}>  {porcentaje}%</Texts>
            }
        </View>
           
    )
}

const Styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    positivos: {
        color: '#14DA13',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 30
    },
    negativos: {
        color: '#757575',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 30
    }
  })