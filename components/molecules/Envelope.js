import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { reusableStyles } from '../reusableStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation  } from '@react-navigation/native';

export const Envelope = (props) => {

    const navigation = useNavigation();

    const { extraStyles, disabled } = props;

    return (
    <View style={ [extraStyles] }>
       <TouchableOpacity disabled={disabled} style={ reusableStyles.envelopeContainer } onPress={() => navigation.navigate('Notificaciones')}>
           <Icon name="envelope" size={32} color="#757575" style={{marginRight: 0}}/>
       </TouchableOpacity>
    </View>
    )
}
