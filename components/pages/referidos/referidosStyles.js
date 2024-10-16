import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#14DA13',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        paddingVertical: 10
    },
    text: {
        width: '100%',
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 12,
        paddingVertical: 10
    },
    textLg: {
        width: '100%',
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 16,
        paddingVertical: 10
    },
    bold: {
        color: '#2B2B2B',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    textSm: {
        width: '100%',
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 14,
        paddingVertical: 10,
        textAlign: 'center'
    },
    message: {
        width: '100%',
        color: '#757575',
        fontFamily: 'Poppins',
        fontSize: 12,
        paddingVertical: 10
    },
    containerCode: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 10
    },
    code: {
        display: 'flex',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: '#BAFFBA',
        marginVertical: 10
    },
    input: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 18,
        lineHeight: 45
    },
    radioContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    textoRadio: {
        color: '#2B2B2B',
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 30,
        paddingLeft: 10
    },
    boton: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        backgroundColor: '#040404',
        borderRadius: 4
    },
    textoBoton: {
        color: '#fff',
        width: '100%',
        paddingHorizontal: 50,
        height: 41,
        flexShrink: 0,
    }
})

export default Styles
