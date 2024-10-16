import React from 'react'
import Svg, {Circle} from 'react-native-svg'

export const CircleGraphic = ({data}) => {

    const strokeWidth = 12
    const size = 200
    const center = size / 2
    const radius = (size - strokeWidth) / 2

    const circumference = 2 * Math.PI * radius

    return (

        <Svg viewBox={`0 0 ${size} ${size}`}>

            {
                data.map((item, index) => (
                <Circle
                    key={`${item.color}-${index}`}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={item.color}
                    strokeDashoffset={circumference * (1 - item.percent)} // 25% circle segment
                    strokeDasharray={circumference}
                >
                </Circle>
                ))
            }

        </Svg>

    )

}