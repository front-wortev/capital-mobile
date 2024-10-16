import { StyleSheet } from 'react-native';

export const datosBeneficiarioStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingTop: 15,
  },
  textContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  margin15: {
    marginBottom: 15,
    marginTop: 15,
  },
  errorMessage: {
    color: "#c20000",
  },
  forwardButton: {
    width: '100%',
    alignItems: 'flex-end',
    marginRight: '20%',
    marginBottom: '5%',
    marginTop: '10%',
  },
})