import { StyleSheet } from "react-native"

export const inversionesStyles = StyleSheet.create({

    container: {
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%'
    }, 
    header:{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    subtitle: {
        fontSize: 12,
        fontStyle: 'normal',
        fontFamily: 'Poppins-Light',
    },
    black: {
        color: '#040404'
    },
    gray: {
        color: '#757575',
    },
    listContainer: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 35, 
        borderColor: '#ECECEC'
    },
    left: {
        width: 50,
        justifyContent: 'space-between',
        alignItems: 'center', 
        flexDirection: 'row'
    },
    circle: {
        borderWidth: 0,
        width: 12,
        height: 12,
        borderRadius: 360
    },
    right: {
        width: 100,
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },
    number: {
        position: 'relative',
        textAlign: "left",
        fontSize: 14,
        fontFamily: 'Poppins',
        color: 'black'
    },
    quantity: {
        textAlign: 'right',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
        width: 80
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -35,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 30,
        paddingHorizontal: 20,
        zIndex: 100,
        right: 25, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    completado: {
        backgroundColor: '#14DA13'
    },
    pendiente: {
        backgroundColor: '#C20000'
    },
    retiro: {
        backgroundColor: '#040404'
    },
    reembolsado: {
        backgroundColor: '#D9D9D9'
    }
})