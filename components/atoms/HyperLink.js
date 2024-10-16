import React from 'react';
import { Text } from 'react-native';
import { reusableStyles } from '../reusableStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HyperLink = (props) => {

  const { extraStyles, onPress } = props;

  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[reusableStyles.hyperLink, extraStyles]}>{props.children}</Text>
    </TouchableOpacity>
  );
}