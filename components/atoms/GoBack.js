import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { reusableStyles } from '../reusableStyles';

export const GoBack = (props) => {

  const { onPress } = props


  return (
    <TouchableOpacity style={[reusableStyles.backButtonContainer]} onPress={onPress} >
      <FontAwesome name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );
}