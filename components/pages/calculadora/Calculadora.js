import { View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Styles from './calculadoraStyles'
import { InputsDatos } from '../../organisms/InputsDatos'
import { Texts } from '../../atoms/Texts'
import InputRange from '../../organisms/InputRange'
import { CircleGraphic } from '../../organisms/CircleGraphic'
import { Accordion } from '../../organisms/Accordion'
import { Desglose } from '../../organisms/Desglose'
import { useEffect, useRef } from 'react'

export const Calculadora = () => {

  {/*Campo numerico*/}
  const [numericValue, setNumericValue] = useState('10,000')
  const [toggle, setToggle] = useState(false)
  const scrollRef = useRef(null)

  const data = [
    {
      color: 'black',
      percent: 1
    },
    {
      color: '#14DA13',
      percent: 0.35
    },
    {
      color: '#D9D9D9',
      percent: 0.10
    }
  ]

  const dataDesglose = {
    'monto': 10000,
    'rendimiento': 200,
    'rpor': 2,
    'iva': 32,
    'ivapor': 16,
    'retencionIva': -21.32,
    'retivapor': 10.66,
    'retencionIsr': -40,
    'retisrpor': 20,
    'rendimientoNetoMes': 170.68,
    'rendimientoNetoAño': 2048.16
  }
  

  const changeQuantity = (value) => {

    let newValue = value
    newValue = value.replace(/\D/g,'').toString()

    if(newValue === '' || newValue === 'Nan'){
      setNumericValue('0.00')
    }else{
      setNumericValue(priceFormat(newValue))
    }

  }

  const priceFormat = (price) => {
    return new Intl.NumberFormat().format(price)
  }

  useEffect(() => {
    scrollRef.current.scrollEnabled = toggle
    scrollRef.current.scrollToEnd({animated: true})
    // console.log(scrollRef.current)
  }, [toggle])

  return (

    
    <ScrollView 
    ref={scrollRef}
    scrollEnabled={false}
    nestedScrollEnabled={false}
    >
        

      <Texts type='h1'  extraStyles={[{textAlign:'center', justifyContent: 'center', marginTop: 95, width: '100%'}]} >Calculadora</Texts>

      <View style={Styles.containerTexts}>
        <Texts type="p" extraStyles={[Styles.spanInput,{ marginTop: 40, width: '100%', paddingHorizontal: 20}]} > Monto de inversión</Texts>
      </View>
      
      <View style={Styles.InputNumberContainer}>
          <InputsDatos
              extraStyles={[Styles.input,{justifyContent: "center", width: '100%', paddingHorizontal: 20 }]}    
              value={numericValue}
              onChangeText={changeQuantity}
              inputMode="numeric"
              currency= {true}
            />
            <Texts type="p" extraStyles={{ position: 'absolute', left: 30, top:35}} >$</Texts>
      </View> 

      <View style={Styles.containerTexts2}>
        <Texts type="p" extraStyles={[Styles.message,{textAlign:'left', width: "82%", marginTop: "1%", opacity: 0.5}]} >Inversión mínima de $ 10,000 MXN</Texts>
      </View>

      <View style={Styles.plazoContainer}>

        <Texts type="h2" extraStyles={{paddingHorizontal: 20, width: "100%", color: "#000" }} >Plazo</Texts>
          
        <View style={Styles.InputRangeContainer}>
          <InputRange />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 20}}>
          <Texts type="p" extraStyles={{color: "#828282"}}> 1 año</Texts>
          <Texts type="p" extraStyles={{color: "#828282"}}> 10 años</Texts>
        </View>

        <View style={Styles.rendimientosContainer}>
          <Texts type='p' extraStyles={Styles.textRendimientos}>Rendimientos del </Texts><Texts type='p' extraStyles={[Styles.textRendimientos, {color: '#14DA13'}]}>24% anual bruto</Texts>
        </View>

        <View style={Styles.pieContainer}>

          <Texts type='p' extraStyles={[Styles.inversionText, {position: 'absolute', top: 50}]}>Inversión</Texts>
          <Texts type='h1' extraStyles={[Styles.inversionQuantity, {position: 'absolute', top: 70}]}>$10,000.00</Texts>
          <Texts type='p' extraStyles={[Styles.inversionRendimientos, {position: 'absolute', top: 140}]}>Rendimientos totales</Texts>
          <Texts type='h1' extraStyles={[Styles.inversionRendimientosQuantity,{position: 'absolute', top: 160}]}>$4,096.00</Texts>

          <CircleGraphic data={data}></CircleGraphic>

        </View>


        <View style={Styles.containerDesglose}>
          <Accordion title={'Desglose de rendimientos'} toggle={setToggle}>
            <Desglose data={dataDesglose}/>
          </Accordion>
        </View>
        
      </View>

  
      </ScrollView>
       
  )
}