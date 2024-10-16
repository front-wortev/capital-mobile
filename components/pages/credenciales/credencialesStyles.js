import { StyleSheet } from 'react-native';

export const credencialesStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingTop: 5
  },
  h1: {
    marginTop: 28,
    marginBottom: 17
  },
  p: {
    width: 327,
    height: 56,
    textAlign: 'left',
    marginTop: 6,
    marginBottom: 17
  },
  inputs: {
    marginBottom: 19
  },
  checkbox: {
    marginVertical: 18,
    marginRight: 10,
    borderRadius: 5,
    color: '#fff'
  },terms: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#222'
  },
});