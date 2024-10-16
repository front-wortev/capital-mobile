import React from 'react';
import { View } from 'react-native';
import { Texts } from '../../atoms/Texts';
import { useHeaderHeight } from '@react-navigation/elements';
import { cuentaCreadaStyles } from './cuentaCreadaStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

export const CuentaCreada = () => {

  const headerHeight = useHeaderHeight();
  
  const dataScreen = useSelector((state) => state.data.cuentaCreada.data)

  console.log(dataScreen.text_descrip_bold);

  return(
    <View style={[cuentaCreadaStyles.container, {paddingTop: headerHeight +  212}]}>

      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />


      <Texts type='h1'>{dataScreen.text_descrip}</Texts>

      <Texts type='h1' extraStyles={{fontSize: 30, lineHeight: 45}}>{dataScreen.text_descrip_bold}</Texts>


    </View>
  );
}
