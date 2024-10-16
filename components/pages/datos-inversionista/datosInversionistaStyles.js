import { StyleSheet } from 'react-native';

export const datosInversionistaStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  textContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fila: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  h1: {
    marginBottom: 25,
  },
  h1Light: {
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  h2: {
    marginBottom: 56,
  },
  pSmall: {
    marginBottom: 8,
  },
  p: {
    marginHorizontal: 60,
    textAlign: 'justify',
  },
  errorMessage: {
    color: "#c20000",
    fontSize: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  forwardButton: {
    width: '100%',
    alignItems: 'flex-end',
    marginRight: '20%',
    marginBottom: '5%',
    marginTop: '10%',
  },
})