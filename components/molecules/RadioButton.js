import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const RadioButton = (props) => {

  const { extraStyles, value, disable, children, onPress, isChecked  } = props

  const handleCheckboxPress1 = () => {
    !disable && onPress && onPress(value);
  };

  return(
    <View style={[styles.inputContainer, extraStyles]}>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.outter}
          onPress={handleCheckboxPress1}
          disabled={disable}
        >
          {isChecked && (
            <View
              style={[
                styles.inner,
                { backgroundColor: disable ? '#757575' : '#14da13' },
              ]}
            ></View>
          )}
        </TouchableOpacity>
        {children}
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputLabelDatos: {
        width: 327,
        height: 25,
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 28,
        textAlign: 'justify',
        color: '#757575',
        marginBottom: 0
    },
    radiobuttonText: {
        fontSize: 16,
        lineHeight: 30,
        color: '#757575',
        fontFamily: 'Poppins'
    },
    inputLabel: {
        width: 327,
        height: 28,
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 28,
        textAlign: 'justify',
        color: '#757575',
        marginBottom: 8
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingRight: 0,
        gap: 10
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