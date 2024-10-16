import { StyleSheet } from 'react-native';

export const datosBancariosMoralesStyles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    paddingTop: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoBackArrow:{
    marginRight: '25%'
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
    marginTop: 24,
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
    marginVertical: 50,
    top: '-2%'
  },
  errorMessage: {
    color: "#c20000",
    fontSize: 10,
  },
})