import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { reusableStyles } from '../reusableStyles'

export const RadioButtons = (props) => {

  const { requireValue, extraStyles, option1, option2, editable = true, value } = props

  const [ isRequired, setIsRequired ] = useState(false)
  const [ isChecked1, setIsChecked1 ] = useState(false)
  const [ isChecked2, setIsChecked2 ] = useState(false)

  useEffect(() => {
    // setIsRequired(requireValue)
    // console.log(value)
    value === 1 ? handleCheckboxPress1() : handleCheckboxPress2()
  })

  const handleCheckboxPress1 = () => {
    setIsChecked1(true)
    setIsChecked2(false)
  }

  const handleCheckboxPress2 = () => {
    setIsChecked1(false)
    setIsChecked2(true)
  }

  return(
    <View style={[reusableStyles.inputContainer, extraStyles]}>

        <Text style={reusableStyles.inputLabelDatos}>{props.children}{isRequired && <Text style={[reusableStyles.inputLabel, {color: '#14da13'}]}>*</Text>}</Text> 

        <View style={{flexDirection:'row'}}>

            <View style={styles.box}>
                <TouchableOpacity style={styles.outter} onPress={handleCheckboxPress1} disabled={!editable}>
                    { isChecked1 && <View style={[styles.inner, { backgroundColor: editable ? '#14da13' : '#757575' }]}></View> }
                </TouchableOpacity>
                <Text style={[reusableStyles.radiobuttonText, extraStyles, {paddingLeft: 10, marginTop: 5}]}>{option1}</Text>
            </View>

            <View style={styles.box}>
                <TouchableOpacity style={styles.outter} onPress={handleCheckboxPress2} disabled={!editable}>
                { isChecked2 && <View style={[styles.inner, { backgroundColor: editable ? '#14da13' : '#757575' }]}></View> }
                </TouchableOpacity>
                <Text style={[reusableStyles.radiobuttonText, extraStyles, {paddingLeft: 10, marginTop: 5}]}>{option2}</Text>
            </View>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingRight: 20
    },
    inner: {
        width: 12,
        height: 12,
        borderRadius: 360
    },
    outter: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 360,
        justifyContent: 'center',
        alignItems: 'center'
    }
})