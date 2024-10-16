import React from 'react';
import { SvgUri } from "react-native-svg"
import { useSelector } from 'react-redux';

export const Logo = (props) => {

  const data = useSelector((state) => state.data.logo.data)
  
  const logo = data.logo_wtv?.data?.attributes;
  
   if (!logo) {
    return null;
  }
  
  const logoUri = logo.url
  
  const imageLogo = 'https://strapi.wortev.com' + logoUri
  return(

    <>
      {
        logo.mime === 'image/svg+xml' ?
        <SvgUri
          width='118'
          height="48"
          uri={imageLogo}
        />
        :
        
        <Image
          source={{
            uri: imageLogo,
          }}
          alt={contentData.Img_inicio.data.attributes.alternativeText}
          style={inicioStyles.vector}
        />

      }
    </>

  );
}