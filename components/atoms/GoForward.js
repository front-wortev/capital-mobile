import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { reusableStyles } from '../reusableStyles';

export const GoForward = (props) => {

  const { extraStyles, onPress } = props;

  return(
    <TouchableOpacity  onPress={onPress}>
      <View style={[reusableStyles.goForward, extraStyles]}>
       <FontAwesome5 name="chevron-right" size={24} color="white" />
      </View>
      
    </TouchableOpacity>
  );
}