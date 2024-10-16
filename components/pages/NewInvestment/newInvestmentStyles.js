import { StyleSheet } from "react-native";

export const newInvestmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2B2B2B', 
    paddingHorizontal: 20,
  },

  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#14DA13',
    backgroundColor: '#FFFFFF'
  },

  inputContainer: {
    marginTop: 20, 
    marginBottom: 50
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  inputNumber: {
    width: '80%',
    fontSize: 24,
    color: '#2B2B2B',
    textAlign: 'right'
  },

  inputNumberInvalid: {
    width: '80%',
    fontSize: 24,
    color: '#E20000',
    textAlign: 'right'
  },

  black: {
    color: '#2B2B2B'
  },

  investmentReturns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10.
  },

  resultLine: {
    width: '95%',
    height: 1,
    backgroundColor: '#828282',
    marginHorizontal: 10,
  },

  checkbox: {
    borderRadius: 5,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent'
  },
  inputLabel: {
      color: '#FFFFFF',
      fontFamily: 'Poppins-Bold'
  },
  checkboxText: {
      color: '#FFFFFF'
  },
  checkboxGap: {
      gap: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 55,
  },
})