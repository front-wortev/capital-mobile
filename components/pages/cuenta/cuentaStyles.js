import { StyleSheet } from "react-native"

export const cuentaStyles = StyleSheet.create({
    screen: {
        height: '100%',
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

    row: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },

    cardsContainer: {
        alignItems: 'center',
        marginTop: 40,
        gap: 20
    },

    card: {
        width: '90%',
        height: 48,
        backgroundColor: '#FFFFFF',
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: "center",
        borderRadius: 12,
        elevation: 5, 
        shadowColor: '#000000',
        shadowOffset: { 
            width: 0, 
            height: 4 
        },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    
})