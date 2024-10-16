import { StyleSheet } from 'react-native';

export const onboardingslideStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingTop: 100,
  },
  containerSlide: {
    position: 'absolute',
    top: '72%',
    left: '50%',
    marginLeft: -175,
    height: 160,
    width: 350,
    borderRadius: 50,
  },
  slide: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
  },
  title: {
    color: 'white',
  },
  sliderContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  dot: {
    backgroundColor: '#757575',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 18.5,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  paginationContainer: {
    position: 'absolute',
    top: '72%',
    left: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  finishButton: {
    position: 'absolute',
    top: '72%',
    right: 35,
    alignSelf: 'flex-end',
  },
  finishButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 22,
  },
});