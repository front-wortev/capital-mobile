import React from 'react';
import { Pressable, Image } from 'react-native';
import { Texts } from '../atoms/Texts';
import { reusableStyles } from '../reusableStyles';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Cards = (props) => {

  const { extraStyles, image, handleChange, icon, color } = props;


  return(
    <Pressable style={[reusableStyles.card, extraStyles]} onPress={handleChange}>

      <FontAwesome 
        name={image} 
        size={32} 
        color={color}
        style={reusableStyles.cardImage}
      />
      

      <Texts type='pLarge' extraStyles={{width: 229}}>{props.children}</Texts>

      <View style={{marginRight: 10}}>{icon}</View>

    </Pressable>
  );
}