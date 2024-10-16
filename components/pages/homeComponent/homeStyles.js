import { StyleSheet } from "react-native"

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
        gap: 20
    },
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    headerContainer: {
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    iconMenu: {
        width: 22,
        height: 17,
        resizeMode: 'contain'
    }, 
    cardHome: {
        width: 358,
        height: 178,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        elevation: 5,
      },
      baseCard: {
        flexDirection: 'row',
        marginTop: 30,
      },
      textBaseCard: {
        marginRight: 90,
      },
      rendimientos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 10,
      },
      slide: {
        flex: 1,
        paddingTop: '5%',
        marginTop: '10%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 160,
        width: '100%',
      },
      title: {
        color: '#FFFFFF',
        textAlign: 'center'
      },
})