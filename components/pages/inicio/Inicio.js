import React from 'react';
import { Logo } from '../../atoms/Logo';
import { Texts } from '../../atoms/Texts';
import { Button } from '../../atoms/Button';
import { inicioStyles } from './inicioStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';

export const Inicio = ({ navigation }) => {

  const inicioData = useSelector((state) => state.data.inicio.data);

  const imgInicio = inicioData?.Img_inicio?.data?.attributes;
  const uriImage = imgInicio ? 'https://strapi.wortev.com' + imgInicio.url : null;
  const mime = imgInicio?.mime;
  const alternativeText = imgInicio?.alternativeText;

  const isLoading = !inicioData || !imgInicio;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#14DA13" />
      </View>
    );
  }


  return (
    <View style={inicioStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <Logo extraStyles={inicioStyles.image} /> 

      {mime === 'image/svg+xml' && uriImage ? (
        <SvgUri width='589' height="342" uri={uriImage} />
      ) : uriImage ? (
        <Image
          source={{ uri: uriImage }}
          alt={alternativeText}
          style={inicioStyles.vector}
        />
      ) : null}

      <Texts type='h1' extraStyles={inicioStyles.h1}>
        {inicioData.Title_Bienvenida}
      </Texts>

      <Button
        type={'secondary'}
        size={'btnLarge'}
        extraStyles={inicioStyles.secondary}
        onPress={() => navigation.navigate('Credenciales')}
      >
        {inicioData.btn1?.ButtonText}
      </Button>

      <Button
        type={'primary'}
        size={'btnLarge'}
        onPress={() => navigation.navigate('Login1')}
        extraStyles={{marginTop: 8}}
      >
        {inicioData.btn2?.ButtonText}
      </Button>
    </View>
  );
};
