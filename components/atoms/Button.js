import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { reusableStyles } from '../reusableStyles';
import { LinearGradient } from 'expo-linear-gradient';

export const Button = (props) => {

  /* 
  Type: primary, secondary or inactive buttons. 
  Size: btnSmall or btnLarge 
  */
 
  const { type, size, disabled, extraStyles, onPress, extraStylesShadow } = props;

  return(
    
     type === 'secondary' ?
     <TouchableOpacity style={[reusableStyles[type], reusableStyles[size], extraStylesShadow, {borderRadius: 8, elevation: 2, shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4,}]} disabled={disabled}  onPress={onPress}>
        <LinearGradient
          colors={['#11C410', '#13E612']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}style={[reusableStyles[type], reusableStyles[size], extraStyles]} disabled={disabled}
           
        >
            <Text style={[reusableStyles.buttonText, {color: "#FFFFFF"}]}>{props.children}</Text>
        </LinearGradient>
      </TouchableOpacity>
      :
      <TouchableOpacity style={[reusableStyles[type], reusableStyles[size], extraStyles, (!disabled && {borderRadius: 8, elevation: 2, shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4})]} disabled={disabled} onPress={onPress}>
        <Text style={[reusableStyles.buttonText, {color: "#FFFFFF"}]}>{props.children}</Text>
      </TouchableOpacity>
    
  );
}