import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function DeepLinkHandler() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || !navigation) return;

    const handleURL = (url) => {
      console.log("URL recibida:", url);
      const parsedUrl = Linking.parse(url);
      const { hostname, path, queryParams } = parsedUrl;

      console.log("Hostname:", hostname);
      console.log("Path:", path);
      console.log("Query Params:", queryParams);

      if (Object.keys(queryParams).length > 0) {
        const queryParamString = Object.entries(queryParams)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
        alert(`Query Params: ${queryParamString}`);
      }

      if (hostname === 'wortev.capital' && path === 'verified-email') {
        console.log("Navegando a Stacks2");
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login1' }],
        });
      } else {
        console.log("Ruta no reconocida:", path);
      }

      if (path === 'reset-password') {
        console.log("A cambiar la contraseña");
        navigation.reset({
          index: 0,
          routes: [{ name: 'ResetPassword' }],
        });
      } else {
        console.log("Ruta no reconocida:", path);
      }
    
    };

    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleURL(initialUrl);
      }
    };

    getUrlAsync();

    const handleDeepLink = (event) => {
      handleURL(event.url);
    };

    const listener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      listener.remove();
    };
  }, [navigation, isFocused]);

  return null;
}
