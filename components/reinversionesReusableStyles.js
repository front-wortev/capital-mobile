import { StyleSheet } from 'react-native';

export const reinversionesReusableStyles = StyleSheet.create({

    row: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    column: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    checkboxConteinerEncuesta: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 10,
    },
    //CheckBox Styles
    checkbox: {
        borderRadius: 50,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
    inputLabel: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold'
    },
    checkboxText: {
        color: '#FFFFFF'
    },
    checkboxGap: {
        gap: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 55,
    },

    // InpurRange Styles
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 15,
        color: '#FFFFFF',
      },
      slider: {
        width: '100%',
        color: '#14DA13',
        marginTop: 20,
      },
      value: {
        position: 'absolute',
        fontSize: 18,
        color: '#14DA13',
      },

      buttonlink: {
        color: '#FFFFFF',
        textDecorationLine: 'underline'
      },

      rowSpace: {
        gap: 260

      },

      inputText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'justify',
        color: '#2b2b2b',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        paddingVertical: 10,
      },

      //Rating Stars

      containerStars: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        gap: 10,
      },
      star: {
        marginRight: 5,
      },
});