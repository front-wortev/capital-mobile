import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { reusableStyles } from '../reusableStyles';
import { Texts } from '../atoms/Texts';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation  } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const Hamburger = (props) => {

  const { disabled } = props
  const navigation = useNavigation();

  const userName = useSelector((state) => state.session.userData)

  return (
    <View style={ reusableStyles.navBarHome }>
     <TouchableOpacity disabled={disabled} onPress={() => navigation.openDrawer()}>      
      <FontAwesome6 name="bars" size={25} color="black" />
     </TouchableOpacity>
      
      <Texts type='pLarge' extraStyles={{ marginLeft: 12 }}>{userName}</Texts>
    </View>
  );
}