import { StyleSheet } from 'react-native';

export const onboardingAppStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 70,
    width: 118,
    height: 48,
  },
  forwardButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 250,
  }
});