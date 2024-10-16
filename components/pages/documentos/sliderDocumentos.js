import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Texts } from '../../atoms/Texts';
import { SvgUri } from 'react-native-svg';

const SliderDocumentos = ({ data, currentIndex, onIndexChanged }) => {
  const renderSlides = () => {
    return data.map((item, index) => (
      <View key={index} style={styles.slide}>
        <Texts type='h3' extraStyles={styles.title}>{item.title1}</Texts>
        {item.mime1 === 'image/svg+xml'  ? (
          <SvgUri width={item.width} height={item.height} uri={`https://strapi.wortev.com${item.image1}`} />
        ) : item.image1 ? (
          <Image
            source={{ uri: `https://strapi.wortev.com${item.image1}` }}
            alt={item.alt}
            style={inicioStyles.image}
          />
        ) : null}
        
        <Texts type='h3' extraStyles={styles.title}>{item.title2}</Texts>
        {item.mime2 === 'image/svg+xml'  ? (
          <SvgUri width={item.width} height={item.height} uri={`https://strapi.wortev.com${item.image2}`} />
        ) : item.image2 ? (
          <Image
            source={{ uri: `https://strapi.wortev.com${item.image2}` }}
            alt={item.alt}
            style={inicioStyles.image}
          />
        ) : null}
        <Texts type='h3' extraStyles={styles.description}>{item.description}</Texts>
      </View>
    ));
  };

  return (
    <Swiper
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      containerStyle={styles.sliderContainer}
      index={currentIndex}
      onIndexChanged={onIndexChanged}
    >
      {renderSlides()}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    marginHorizontal: '20%',
    marginBottom: 50,
  },
  sliderContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    width: '90%',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center'
  },
  image:{
  },
  description: {
    textAlign: 'center',
    width: 500
  },
  dot: {
    backgroundColor: '#D9D9D9',
    width: 16,
    height: 16,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  activeDot: {
    backgroundColor: '#2B2B2B',
    width: 16,
    height: 16,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SliderDocumentos;
