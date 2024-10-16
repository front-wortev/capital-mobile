import React from 'react'
import { View } from 'react-native'
import { Circle, Defs, RadialGradient, Stop, Svg } from 'react-native-svg'

export const GradientCircle = ({color, extraStyles}) => {
  return (
    <View style={[extraStyles, { flex: 1}]}>
      <Svg height="320" width="320" viewBox="0 0 50 50">
        <Defs>
          <RadialGradient
            id="grad"
            cx="25"
            cy="25"
            rx="25"
            ry="25"
            fx="25"
            fy="25"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={color} stopOpacity="1" />
            <Stop offset="70%" stopColor="#fff" stopOpacity="0.1" />
            <Stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </RadialGradient>
        </Defs>
        <Circle cx="25" cy="25" r="20" fill="url(#grad)" />
      </Svg>
    </View>
  )
}
