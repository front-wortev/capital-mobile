import React from 'react';
import { Text } from 'react-native';
import { reusableStyles } from '../reusableStyles';

export const Texts = (props) => {

  /* Type: h1, h2, h3, p, pSmall, pLarge.*/ 
  const { type, extraStyles, numberOfLines } = props;

  return(
    <Text style={[reusableStyles[type], extraStyles]} numberOfLines={numberOfLines} >{props.children}</Text>
  );
}