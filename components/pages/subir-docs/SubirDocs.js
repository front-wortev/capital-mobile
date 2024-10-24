import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { Texts } from '../../atoms/Texts';
import { Button } from '../../atoms/Button';
import { HyperLink } from '../../atoms/HyperLink';
import { subirDocsStyles } from './subirDocsStyles';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';

const docs = [
  {
    title: 'INE',
  },
  {
    title: 'Estado de cuenta bancario actual',
  },
  {
    title: 'Constancia de situación fiscal / Comprobante de domicilio',
  },
  {
    title: 'RFC',  
  },
  {
    title: 'CURP',
  }
]
      
const docsMoral = [
  
  {
    title: 'Acta constitutiva',
  },
  {
    title: 'RFC de la empresa',
  },
  {
    title: 'Carátula de edo. de cuenta',
  },
  {
    title: 'Comprobante de domicilio de la empresa',  
  },
  {
    title: 'Poder notarial',
  },
  {
    title: 'Identificación del representante legal',
  },
  {
    title: 'Comprobante de domicilio del representante',  
  },
]

export const SubirDocs = ({onPress, onPressButton}) => {

  const headerHeight = useHeaderHeight();

  const personType = useSelector((state) => state.auth.personType)
  const dataScreen = useSelector((state) => state.data.subirDocs.data)

  const imgDocs = dataScreen?.image_docs?.data?.attributes;
  const uriImage = imgDocs ? 'https://strapi.wortev.com' + imgDocs.url : null;
  const mime = imgDocs?.mime;
  const alternativeText = imgDocs?.alternativeText;

  return(
    <View style={[subirDocsStyles.container,  {marginTop: headerHeight}]}>

      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />


      <Texts type='p' extraStyles={subirDocsStyles.p}>{dataScreen.text_descrip}</Texts>

      

      {mime === 'image/svg+xml' && uriImage ? (
        <SvgUri width='193' height="106" uri={uriImage} />
      ) : uriImage ? (
        <Image
          source={{ uri: uriImage }}
          alt={alternativeText}
          style={{width: 193, height: 106}}
        />
      ) : null}

      <View style={subirDocsStyles.flatlist}>

        {
          personType === 'persona_fisica_sf' ? 

          <FlatList 
            data={docs}
            renderItem={({item}) => {
              return(
                <Texts type='p'>{`\u2022 ${item.title}`}</Texts>
              );
            }}
          />

          :

          <FlatList 
            data={docsMoral}
            renderItem={({item}) => {
              return(
              <Texts type='p'>{`\u2022 ${item.title}`}</Texts>
              );
            }}
          />


        }

      </View>

      <Button type='primary' size='btnLarge' extraStyles={subirDocsStyles.button} onPress={onPressButton}>¡Vamos!</Button>

      <HyperLink onPress={onPress} >En otro momento</HyperLink>
   


    </View>
  );
}