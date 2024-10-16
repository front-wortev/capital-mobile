import React, { useState } from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { reusableStyles } from '../reusableStyles';
import { Texts } from '../atoms/Texts';

const InputRange = () => {
    const [value, setValue] = useState(2);
  
    const handleValueChange = (newValue) => {
      setValue(newValue);
    };
  
    return (
      <View>
        {/* <Texts type='h3'>{value}</Texts> */}
        <Slider
          style={{height: 40,  transform: [{scaleY: 1 }]}}
          value={value}
          minimumValue={1}
          maximumValue={10}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#14DA13"
          maximumTrackTintColor="#2B2B2B"
          thumbTintColor='#14DA13'
          thumbImage={'../../assets/images/circle.png'}
          step={2}
        />
      </View>
    );
  };
  
  export default InputRange;
  