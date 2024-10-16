import { StyleSheet } from "react-native";

export const reinversionesStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    paddingBottom: 120
  },
  white: {
    color: '#FFFFFF'
  },
  green: {
    color: '#14DA13'
  },
  black: {
    color: '#000'
  },
  ligthGrey: {
    color: '#D9D9D9'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '80%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#14DA13',
    backgroundColor: '#fff'
  },
  inputNumber: {
    fontSize: 24,
    color: '#000',
    backgroundColor: '#fff'
  },
  titleHeader: {
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Poppins-SemiBold',
    color: '#757575', 
  },
  containerHeader: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2B2B2B'
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 100,
  },
  points: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100,
  },
});