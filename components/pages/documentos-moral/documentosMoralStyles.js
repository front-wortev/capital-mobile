import { StyleSheet } from 'react-native';

export const documentosMoralStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer:{
    marginHorizontal: '5%',
  },
  cardsContainer: {
    gap: 15,
    marginTop: 15,
    marginBottom: 15,
    width: '90%'
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
  cardColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 100,
  },
  fila:{ 
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: '90%',
    height: '60%',
    backgroundColor: '#FFFFFF',
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
    width: '90%',
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