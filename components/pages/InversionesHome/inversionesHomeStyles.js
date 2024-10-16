import { StyleSheet } from "react-native";
import { Circle } from "react-native-svg";

export const inversionesHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },

  h2: {
    paddingVertical: 17,
  },  

  circleGreen: {
    position: 'absolute',
    top: '0%',
    left: '55%',
    opacity: 0.2
  },

  circleBlue: {
    position: 'absolute',
    top: '12%',
    right: '45%'
  },

  amounts: {
    width: '80%',
    height: '22%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    backgroundColor: '#FFFFFF33',
    gap: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
    marginBottom: 16
  },

  buttonImage: {
    width: 56,
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonImageDisabled: {
    width: 56,
    height: 56,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  investmentInfo: {
    height: 'auto',
    gap: 12,
    width: '100%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },

  titulosBotones:{
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    
  },
  interno: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },

  slide: {
    flex: 1,
    paddingTop: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center'
  },
})