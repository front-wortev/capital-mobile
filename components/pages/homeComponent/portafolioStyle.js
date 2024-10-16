import { StyleSheet } from "react-native"

export const portafolioStyles = StyleSheet.create({

    container: {
        position: 'relative',
        height: 177,
        width: '100%',
        paddingHorizontal: 0,
        zIndex: 0,
    },
    flatlist: {
        width: '100%',
        height: '90%',
        paddingTop: 10,
        paddingLeft: 20
    },
    item: {
        width: 136,
        height: 127,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 0,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        paddingLeft: 20
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Light'
    },
})