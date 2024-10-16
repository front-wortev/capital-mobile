import { StyleSheet } from 'react-native';

export const reusableHeaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  progressBar: {
    height: 8,
    width: '80%',
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    marginBottom: 30,
  },
  progress: {
    height: 8,
    backgroundColor: '#14DA13',
    borderRadius: 4,
  },
  fila: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
});