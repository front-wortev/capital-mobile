import { StyleSheet } from "react-native"

export const documentosStyles =StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#F2F5FA',
        height: '100%'
    },
    containerHeader: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        marginBottom: 50,
        paddingTop: 10
    },
    arrow: {
        position: 'absolute',
        left: 40,
        top: 20
    },
    title: {
        color: '#14DA13',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        paddingVertical: 10
    },
    textTypeFormat: {
        color: '#828282',
        fontFamily: 'Poppins',
        paddingHorizontal: 25,
        fontSize: 12,
        lineHeight:20
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        width: '90%',
        height: '60%',
        backgroundColor: '#FFFFFF',
        paddingTop: 10
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        paddingTop: 10,
        paddingStart: '85%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },  
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})