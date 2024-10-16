import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { reinversionesReusableStyles } from '../reinversionesReusableStyles';
import { Texts } from '../atoms/Texts';

const RangeInput = (props) => {
  
  const { min, max, step, initialValue, onValueChange, title, colorBar, colorThumb, colorBackBar, disabled = false} = props;
  
  
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View style={reinversionesReusableStyles.container}>
      <Texts type='h3' extraStyles={reinversionesReusableStyles.label}>{title}</Texts>
      <Texts type='h3' extraStyles={[reinversionesReusableStyles.value, { left: (value - 1) * ( 300 / (max - min)) }]}>{value} { value === 1 ? 'año' : 'años' }</Texts>
      <Slider
        style={reinversionesReusableStyles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor={colorBar} 
        maximumTrackTintColor={colorBackBar}
        thumbTintColor={colorThumb}
        disabled={disabled}
      />
      <View style={[reinversionesReusableStyles.row, reinversionesReusableStyles.rowSpace]}>
        <Texts type='p' extraStyles={{color: disabled ? '#757575' : '#FFFFFF'}}>{min} año</Texts>
        <Texts type='p' extraStyles={{color: disabled ? '#757575' : '#FFFFFF'}}>{max} años</Texts>
      </View>
    </View>
  );
};


  

export default RangeInput;
