import React, { useState } from 'react';
import { View } from 'react-native';
import { Texts } from '../../atoms/Texts';
import { HyperLink } from '../../atoms/HyperLink';
import { useHeaderHeight } from '@react-navigation/elements';
import { confCorreoStyles } from './confCorreoStyles'
import { API_BASE } from '@env'
import { Modals } from '../../molecules/Modals';
import { useFetch } from '../../../hooks/useFetch';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

export const ConfCorreo = ({ route }) => {

  const headerHeight = useHeaderHeight();

  const confCorreoData = useSelector((state) => state.data.confCorreo.data)

  const { email } = route.params;

  const [ modalVisibleEmailReenviado, setModalVisibleEmailReenviado ] = useState(false)
  const [ emailReenviado, setEmailReenviado ] = useState('')

  const handleReenvioPassword = async() => {

    const apiBase = API_BASE
    const endPoint = '/reenviar-verificacion'

    const user = {
      email: email,
    };

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")      

    const fetchResponse = await useFetch(apiBase + endPoint, headers, 'POST', user, 'normal');

    if (fetchResponse.msg) {
      setEmailReenviado(fetchResponse.msg);
      setModalVisibleEmailReenviado(true);
    }
}

  return(
    <View style={confCorreoStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
      />

      <Texts type='h1' extraStyles={[confCorreoStyles.h1,{ marginTop: 144 + headerHeight}]}>{confCorreoData.text_confCorreo}</Texts>

      <Texts type='pSmall' extraStyles={confCorreoStyles.pSmall}>{confCorreoData.text_descrip}</Texts>

      <Texts type='h2' extraStyles={confCorreoStyles.h2}>{email}</Texts>

      <HyperLink onPress={handleReenvioPassword}>{confCorreoData.text_hiperlink}</HyperLink>

      <Modals
        visible={modalVisibleEmailReenviado}
        vectoricon='check-circle'
        description={emailReenviado}
        buttonText='OK'
        onButtonPress={() => setModalVisibleEmailReenviado(false)}
      />


    </View>
  );
}