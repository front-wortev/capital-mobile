import React from 'react';
import { View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { reinversionesReusableStyles } from '../reinversionesReusableStyles';

const StarRating = (props) => {
    

   const { rating, onRatingChange } = props;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        const isFilled = i <= rating;
        stars.push(
            <Pressable
            key={i}
            onPress={() => onRatingChange(i)}
            style={reinversionesReusableStyles.star}
            >
            <FontAwesome
                name={isFilled ? 'star' : 'star-o'}
                size={30}
                color={'#14DA13'}
            />
            </Pressable>
        );
        }
        return stars;
    };

    return (
        <View style={reinversionesReusableStyles.containerStars}>
        {renderStars()}
        </View>
    );
};


export default StarRating;
