import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  h1: {
    marginBottom: 25,
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
  logo: {
    backgroundColor: 'black',
  },

  cardHome: {
    width: 328,
    height: 178,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 5,
    marginTop: 30,
  },
  baseCard: {
    flexDirection: 'row',
    marginTop: 30,
  },
  textBaseCard: {
    marginRight: 90,
  },
  rendimientos: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
});