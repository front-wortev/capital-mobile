import { StyleSheet } from 'react-native';

export const datosInversionistaMoralStyles = StyleSheet.create({
  logoContainer: {
    paddingTop: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: '10%'
  },
  inputContainer: {
    gap: 12,
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
    marginRight: '10%',
    gap: 10
  },
  sizeSamll: {
    width: '31%'
  },
  checkbox: {
    borderRadius: 4,
    borderColor: '#2B2B2B'
  },
  forwardButton: {
    alignItems: 'flex-end',
    marginRight: '10%',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  errorMessage: {
    color: "#c20000",
    fontSize: 10,
  },
})