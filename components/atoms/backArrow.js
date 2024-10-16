import React from 'react'
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { reusableStyles } from '../reusableStyles';
import { useNavigation } from '@react-navigation/native';

export const BackArrow = (props) => {

    const navigation = useNavigation();
    const { color } = props

    const handlePress = () => {
      navigation.goBack();
  };

  return (
    <TouchableOpacity style={reusableStyles.backArrowContainer} onPress={handlePress}>
        <FontAwesome5 name="long-arrow-alt-left" size={32} color={color} />
    </TouchableOpacity>
  )
}
