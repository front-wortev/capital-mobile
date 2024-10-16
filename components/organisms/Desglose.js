import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Texts } from '../atoms/Texts'
import { Row } from './Row'


export const Desglose = ({data}) => {

    const {monto, rendimiento, rpor, iva, ivapor, retencionIva, retivapor, retencionIsr, retisrpor, rendimientoNetoMes, rendimientoNetoAño} = data

    return (
        <View style={Styles.body}>
            <View style={[Styles.row, {paddingBottom: 20}]}>
                <Texts type='p' extraStyles={[Styles.elementList]}>Monto de inversion</Texts>
                <Texts type={'h2'} extraStyles={[Styles.inversion]}>${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format(monto)}</Texts>
            </View>

            <View style={{paddingVertical: 20}}>
                <View style={Styles.row}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>Rendimiento mensual</Texts>
                    <View style={Styles.row}>
                        {/* se importa componente fila para el desglose */}
                        <Row valor={rendimiento} porcentaje={rpor}/> 
                    </View>
                </View>
                <View style={[Styles.row, Styles.borderBottom]}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>IVA sobre rendimiento</Texts>
                    <View style={Styles.row}>
                        <Row valor={iva} porcentaje={ivapor}/>
                    </View>
                </View>
                <View style={Styles.totalContainer}>
                    <Texts type='p' extraStyles={[Styles.sumaTotales]}>${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format(rendimiento + iva)} /mes</Texts>
                </View>
            </View>

            <View style={{paddingVertical: 20}}>
                <View style={Styles.row}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>Retención IVA</Texts>
                    <View style={Styles.row}>
                        <Row valor={retencionIva} porcentaje={retivapor}/>
                    </View>
                </View>
                <View style={[Styles.row, Styles.borderBottom]}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>Retención ISR</Texts>
                    <View style={Styles.row}>
                        <Row valor={retencionIsr} porcentaje={retisrpor}/>
                    </View>
                </View>
                <View style={Styles.totalContainer}>
                    <Texts type='p' extraStyles={[Styles.sumaTotales]}>{Math.sign(retencionIva + retencionIsr) === 1 ? '' : '-'}${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format(((retencionIva + retencionIsr) < 0 ? (retencionIva + retencionIsr) * -1 : (retencionIva + retencionIsr)))} /mes</Texts>
                </View>
            </View>

            <View style={{paddingVertical: 20}}>
                <View style={[Styles.row, Styles.borderBottom]}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>Rendimientos netos / mes</Texts>
                    <View style={Styles.row}>
                        <Texts type='p' extraStyles={[Styles.totalesPositivos]}>${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format(rendimientoNetoMes)}</Texts>
                        <Texts type='p' extraStyles={Styles.moneda}>  MXN</Texts>
                    </View>
                </View>
                <View style={Styles.row}>
                    <Texts type='p' extraStyles={[Styles.elementList]}>Rendimientos netos / año</Texts>
                    <View style={Styles.row}>
                        <Texts type='p' extraStyles={[Styles.totalesPositivos]}>${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, currency: 'MXN'}).format(rendimientoNetoAño)}</Texts>
                        <Texts type='p' extraStyles={Styles.moneda}>  MXN</Texts>
                    </View>
                </View>
           </View>

        </View>
    )

}

const Styles = StyleSheet.create({
    body: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        paddingBottom: 50,
        top: 10,
        left: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#828282'
    },
    elementList: {
        color: '#2B2B2B',
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        lineHeight: 30
    },
    totales: {
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 30
    },
    sumaTotales: {
        color: '#757575',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Poppins-Light',
        lineHeight: 30
    },
    inversion: {
        color: '#2B2B2B',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        lineHeight: 30
    },
    porcentajes: {
        color: '#14DA13',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 30
    },
    totalContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    moneda: {
        color: '#757575',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        lineHeight: 30
    },
    totalesPositivos: {
        color: '#14DA13',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 30
    },
    totalesNegativos: {
        color: '#757575',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 30
    }
  })