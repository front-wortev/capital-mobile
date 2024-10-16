import { StyleSheet } from 'react-native'

export const forgotPasswordStyles = StyleSheet.create({
    container: {
        marginVertical: 100,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    containerReset: {
        height: '100%',
        alignItems: 'center',
        paddingTop: 100,
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
    text: {
        width: '70%',
        alignItems: 'center',
    },
    inputs: {
        width: '90%',
        paddingTop: 50,
        justifyContent: 'space-around'
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
    }
})
