import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    black: {
        color: '#040404'
    }, 
    linkGreen: {
        color: '#14DA13'
    },
    left: {
        textAlign: 'left',
        left: -60
    },
    mainContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    logoContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '20%'
    },
    logo: {
        width: 170,
        height: 70,
        flexShrink: 0,
        maxWidth: 118,
        maxHeight: 48
    },
    nameContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        position: 'relative',
        paddingBottom: 40
    },
    textNormal: {
        color: '#222',
        fontSize: 24,
        fontFamily: 'Poppins'
    },
    textBold: {
        color: '#222',
        fontSize: 32,
        fontFamily: 'Poppins-Bold'
    },
    bottomContainer: {
        position: 'relative',
        alignItems: 'flex-end',
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        flexDirection: 'row',
        bottom: 0, 
    },
    inputContainer: {
        position: 'relative',
        height: 100, 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20

    },
    passwordContainer: {
        position: 'relative',
        width: '85%', 
    },
    inputPasswordContainer: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#222222',
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        position: 'relative',
        width: '90%',
        color: '#222222',
        fontFamily: 'Poppins',
        paddingVertical: 10,
        paddingLeft: 10,
        fontSize: 19,
        zIndex: 1
    },
    buttonLog: {
        backgroundColor: '#000',
        borderRadius: 360,
        height: 45,
        width: 45,
        justifyContent:'center',
        alignItems: 'center'
    },
    buttonContainer: {
        position: 'relative',
        width: '10%', 
        alignItems: 'center'
    },
    forgotPassword: {
        width: '100%',
        paddingHorizontal: 20
    },
    errorMessage: {
        color: "#c20000",
    }
})