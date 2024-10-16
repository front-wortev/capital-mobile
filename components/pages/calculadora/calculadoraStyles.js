import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  containerTexts:{
    alignItems: "center",
    marginBottom: -26,
    marginTop: -30,
  },
  containerTexts2:{
    alignItems: "flex-start",
    width: '100%',
    paddingHorizontal: 20
  },
  InputNumberContainer:{
    alignItems: "center"
  },
  plazoContainer:{
    marginTop: "5%",
    alignItems: "center",
    height: 'auto'
  },
  InputRangeContainer:{
    width: "100%",
    paddingHorizontal: 5
  },
  pieContainer: {
    marginTop: 0,
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDesglose: {
    position: 'relative',
    width: '100%',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal:20
  },
  title: {
    color: '#2B2B2B',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  spanInput:{
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  input: {
    width: '100%',
    color: '#2B2B2B',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'right',
  },
  message:{
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  inversionText: {
    color: '#2B2B2B',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',

  },
  inversionQuantity: {
    color: '#2B2B2B',
    fontFamily: 'Poppins',
    fontSize: 25,
    fontStyle: 'normal',
  },
  inversionRendimientos: {
    color: '#14DA13',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
  },
  inversionRendimientosQuantity: {
    color: '#14DA13',
    fontFamily: 'Poppins',
    fontSize: 25,
    fontStyle: 'normal',
  },
  rendimientosContainer: {
    position: 'relative',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textRendimientos: {
    color: '#2B2B2B',
    fontSize: 14,
    fontFamily: 'Poppins',
    lineHeight: 25
  }
})

export default Styles
