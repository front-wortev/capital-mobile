import { StyleSheet } from 'react-native'

export const archivosStyle = StyleSheet.create({
    container: {
        padding: 40,
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        gap: 70
    },
    row1: {
        width: '10%',
    },

    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%'
    },

    textsContainer: {
        marginVertical: 30,
        gap: 20
    },

    shadowProp: {
        width: '85%', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10, 
        padding: 15, 
        alignItems: 'center',        
        shadowColor: '#000000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 8,
        shadowColor: '#000000',
    },

    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: 10,
    },
    

})