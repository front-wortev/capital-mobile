import { StyleSheet } from 'react-native';

export const reusableStyles = StyleSheet.create({
  // Font Types Styles
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#2b2b2b',
    letterSpacing: 0.02
  },
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 28,
    color: '#2b2b2b'
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 28,
    color: '#2b2b2b'
  },
  p: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    color: '#2b2b2b'
  },
  pSmall: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: '#2b2b2b'
  },
  pLarge: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#2b2b2b'
  },
  hyperLink: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#14da13'
  },
  
  // Logo styles
  logo: {
    width: 118,
    height: 48,
  },

  // Button styles
  primary: {
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactive: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSmall: {
    width: 128,
    height: 32,
    paddingVertical: 10,
    borderRadius: 6
  },
  btnLarge: {
    width: 328,
    height: 48,
    borderRadius: 8,
  },
  btnModal: {
    width: 264,
    height: 41,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 16,
    letterSpacing: 1.25,
  },

  // Input Styles
  inputContainer: {
    width: 327,
    height: 'auto',
  },
  inputLabel: {
    width: 327,
    height: 28,
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 28,
    textAlign: 'justify',
    color: '#757575',
    marginBottom: 8
  },
  inputText: {
    height: 48,
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#2b2b2b',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#FFFFFF', 
    borderRadius: 8,
    height: 48,
    paddingLeft: 12,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  focusedInput: {
    borderColor: '#14da13',
    borderWidth: 2
  },
  invalidInput: {
    height: 48,
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#2b2b2b',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#c20000',
    borderWidth: 2
  },

  inputPhoneContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },


  // Card Styles
  card: {
    width: 328,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5
  },
  cardImage: {
    marginLeft: 24,
    marginRight: 16,
  },

  // Checkbox Styles
  checkbox: {
    borderRadius: 50,
    backgroundColor: '#f2f5fa'
  },
  checkboxText: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    lineHeight: 30,
    color: '#2b2b2b',
  },
  checkboxGap: {
    gap: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },

  // Date Picker Styles
  datePicker: {
    width: 327,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 180,
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 2,
  },
  
  // Dropdown Styles
  dropdownContainer: {
    width: 327,
    height: 94,
  },
  dropdownContainerList: {
      width: 325,
      marginBottom: 45,
      borderWidth: 0,
      backgroundColor: "#fff",
      shadowColor: "#000",
      borderStartWidth: 0,
      borderRadius: 8,
      shadowOffset: {
        height: 0.5,
      },
      shadowOpacity: 0.22, 
      shadowRadius: 2,
      elevation: 3,
      zIndex: 5
  },
  textItemDropdown: {    
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 30,
    color: '#2B2B2B',
  },
  textSelectedDropdown: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 30,
    color: '#2B2B2B',
  },
  dropdown: {
    width: 327,
    minHeight: 40,
    marginTop: 8,
    paddingLeft: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 2
  },
  dropdownPlaceholder: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 30,
    color: '#828282',
    marginLeft: 8
  },
  dropdowLabel: {
    
  },

  // Go Back Button
  backButtonContainer: {
    flex: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 17
  },

  backArrowContainer: {
    flex: 1,
    marginLeft: 32,
    justifyContent: 'center',
  },

  // GoForward Button
  goForward: {
    backgroundColor: "#2B2B2B",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 48,
    maxHeight: 48,
    borderRadius: 50,
    paddingLeft: 5
  },

  //Nav Bar
  navBarHome: { 
    flexDirection: 'row', 
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20
  },
  envelopeContainer: {
    flex: 1,
    width: 32,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  //InvestmentInfo Styles
  investmentContainer: {
    width: '90%',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },

  investmentId: {
    borderRadius: 360,
    width: 12,
    height: 12,
    borderWidth: 0,
    overflow: 'hidden'
  },

  completado: {
    backgroundColor: '#14DA13'
  },

  pendiente: {
    backgroundColor: '#C20000'
  },

  retiro: {
    backgroundColor: '#040404'
  },

  reembolsado: {
    backgroundColor: '#D9D9D9'
  },

  // Orders Styles
  ordersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ordersId: {
    marginRight: 52
  },

  ordersTerms: {
    marginRight: 80
  },
  //input desactivated
  des: {
    fontSize: 16,
    fontStyle: 'normal',
    color: '#828282',
    height: 40,
    fontFamily: 'Poppins'
  },
  //edit button
  edit:{
    position: 'absolute',
    bottom: 180,
    right: 0,
    borderRadius: 360,
    width: 70,
    height: 70,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  //input labe datos
  inputLabelDatos: {
      width: 327,
      height: 25,
      fontFamily: 'Poppins',
      fontSize: 12,
      lineHeight: 28,
      textAlign: 'justify',
      color: '#757575',
      marginBottom: 0
  },
  //input with icon
  paddingIcon: {
    paddingLeft: 45
  },
  //radio button text
  radiobuttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 30,
    color: '#757575',
    fontFamily: 'Poppins'
  },
  //dropdowndatos styles
   dropdownContainerDatos: {
    width: 327,
    height: 74,
  },
  dropdownDatos: {
    width: 327,
    minHeight: 40,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  id:{
    color: '#040404',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  }, 
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  // Step  Indicator
  containerSteps: {
    height: 160,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 8
  },
  stepContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleStep: {
    width: 12,
    height: 12,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 5,
  },
  filledCircle: {
    backgroundColor: '#14DA13',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeBorder: {
    borderColor: '#14DA13',
  },
  inactiveBorder: {
    borderColor: '#FFFFFF', 
  },
  line: {
    width: 3,
    height: 40,
    backgroundColor: '#D9D9D9',
  },
  filledLine: {
    backgroundColor: '#14DA13',
  },
});