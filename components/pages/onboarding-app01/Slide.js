import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Texts } from '../../atoms/Texts';
import { onboardingslideStyles } from './onboardingApp01Styles'; 

const Slide = ({ data, currentIndex, onIndexChanged, onPress }) => {
  
    const renderSlides = () => {
      return data.map((item, index) => (
        <View key={index} style={onboardingslideStyles.slide}>
          <Texts type='h2' extraStyles={[onboardingslideStyles.title, { fontFamily: 'Poppins-Bold', marginBottom: 10 }] }>{item.title}</Texts>
          <Texts type='p' extraStyles={[onboardingslideStyles.title, { marginHorizontal: 25}]}>{item.description}</Texts>
        </View>
      ));
    };
  
    
  
    return (
      <View style={onboardingslideStyles.containerSlide}>
        <Swiper
          showsPagination={false}
          dotStyle={onboardingslideStyles.dot}
          activeDotStyle={onboardingslideStyles.activeDot}
          containerStyle={onboardingslideStyles.sliderContainer}
          onIndexChanged={onIndexChanged}
        >
          {renderSlides()}
        </Swiper>
        {currentIndex === data.length - 1 && (
          <TouchableOpacity style={onboardingslideStyles.finishButton} onPress={onPress}>
            <Texts extraStyles={[onboardingslideStyles.finishButtonText, {textDecorationLine: 'underline'}]} >Terminar</Texts>
          </TouchableOpacity>
        )}
        <View style={onboardingslideStyles.paginationContainer}>
          <View style={onboardingslideStyles.paginationDots}>
            {data.map((item, index) => (
              <View
                 key={index}
                style={[onboardingslideStyles.dot, currentIndex === index && onboardingslideStyles.activeDot]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  };

export default Slide;
  