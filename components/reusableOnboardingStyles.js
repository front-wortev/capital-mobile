import { StyleSheet } from 'react-native';

export const reusableOnboardingStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  bottomBar: {
    height: 78,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  dollarIcon: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
    paddingLeft: 13,
  },
  cardHome: {
    width: '90%',
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: 420,
    paddingHorizontal: 10
  }
});