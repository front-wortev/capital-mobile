import { StyleSheet } from 'react-native'

export const investmentDataStyles = StyleSheet.create({
    containerHeader: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      containerBottom: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
      },
      arrow: {
        position: 'absolute',
        left: 20,
        top: 20,
        zIndex: 100,
      },
      points: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 100,
      },
      titleHeader: {
        fontStyle: 'normal',
        color: '#222', 
      },
      container: {
        position: 'relative',
        backgroundColor: '#F2F5FA',
        flex: 1,
      },
      form: {
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
      },
      containerInput: {
          flexDirection: 'column',
          paddingBottom: 0
      },
      message: {
          color: '#2B2B2B',
          fontSize: 12,
          fontStyle: 'normal',
          fontFamily: 'Poppins-Light',
          textAlign: 'center',
          lineHeight: 22
      },
      containerData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      id: {
        color: '#2B2B2B',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        fontStyle: 'normal',
      },
      normal: {
        color: '#2B2B2B',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 30,
      },
      money: {
        color: '#2B2B2B',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        fontStyle: 'normal',
        
        paddingHorizontal: 5
      },
      porcentage: {
        color: '#14DA13',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 30,
        paddingHorizontal: 0
      },
      hr: {
        width: '90%',
        height: 5,
        backgroundColor: '#D9D9D9',
        marginVertical: 15
      },
      grayText: {
        color: '#757575',
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        fontStyle: 'normal',
        paddingHorizontal: 10
      },
      textGreen: {
        color: '#14DA13',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 20, 
      },

      shadowProp: {
        width: 210, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10, 
        padding: 15, 
        alignItems: 'center',        
        shadowColor: '##000000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 8,
        shadowColor: '#000000',
      },
      
      textGray: {
        color: '#757575',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 20, 
      },
      contCol: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        gap: 10
      },
      alert: {
        color: '#C20000',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        textAlign: 'center',
        paddingHorizontal: 40
      },
      cont: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      msg: {
        color: '#2B2B2B',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        paddingVertical: 20
      },
      textLink: {
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 15,
        fontStyle: 'normal',
        lineHeight: 25,
        textDecorationLine: 'underline',
        paddingRight: 10
      },
      info: {
        color: '#757575',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
      },
      process: {
        color: '#2B2B2B',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: 90,
        paddingHorizontal: 90
      },
      cardButton: {
        width: 328,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }
})