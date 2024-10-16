import { StyleSheet } from 'react-native'

export const datosMoralStyles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginHorizontal: 20,
        gap: 20,
        height: '150%',
        width: '90%'
    },

    inputContainer: {
        marginVertical: 30,
        gap: 10,
        width:'90%',
    },

    input: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        backgroundColor: '#FFFFFF', 
        borderRadius: 8,
        height: 48,
        paddingLeft: 12,
        fontSize: 16,
    },

    focusedInput: {
        borderColor: '#14da13',
        borderWidth: 2
    },

    invalidInput: {
        borderColor: '#c20000',
        borderWidth: 2,
    },

    errorMessage: {
        color: "#c20000",
    },
    forwardButton: {
        alignItems: 'flex-end',
        marginTop: '30%',
        marginBottom: 10,
        marginRight: 16,
        width: '100%',
        height: 100
    }
})
