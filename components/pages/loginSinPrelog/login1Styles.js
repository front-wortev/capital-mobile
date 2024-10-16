import { StyleSheet } from "react-native"

export const login1Styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    conteiner: {
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 150,
        height: 62.5,
        marginBottom: 80
    },

    inputsContainer: {
        marginVertical: 50,
        gap: 20,
        width:'85%',
    },

    input: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        backgroundColor: '#FFFFFF', 
        borderRadius: 8,
        height: 48,
        paddingLeft: 12,
        fontSize: 16,
        fontFamily: 'Poppins'
    },

    focusedInput: {
        borderColor: '#14da13',
        borderWidth: 2
    },

    invalidInput: {
        borderColor: '#c20000',
        borderWidth: 2,
    },

    hyperLink: {
        textAlign: 'right',
        fontSize: 14,
    },

    checkboxContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 0
    },

    checkbox: {
        borderRadius: 5,
        borderWidth: 1,
        color: '#FFFFFF',
    },

    errorMessage: {
        color: "#c20000",
    }
})