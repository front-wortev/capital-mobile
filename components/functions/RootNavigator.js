import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Stacks } from '../templates/Stacks';
import DeepLinkHandler from './DeepLinkHandler';
import { storeData, getItemFor } from './helpers/storageHelper';
import useData from '../../hooks/useData';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';

const HAS_LAUNCHED = 'HAS_LAUNCHED';

const RootNavigator = () => {
  useData();

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#FFFFFF';

  const globalLoading = useSelector((state) => state.data.globalLoading);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDataString = await getItemFor('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const hasLaunchedStored = await getItemFor(HAS_LAUNCHED);

        if (userData && Object.keys(userData).length !== 0 && !hasLaunchedStored) {
          await storeData(HAS_LAUNCHED, "true");
          setHasLaunched(true);
        } else if (hasLaunchedStored) {
          setHasLaunched(true);
        }
      } catch (error) {
        console.log("Error al inicializar la app:", error);
      } finally {
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#14DA13" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { 
        globalLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#14DA13" />
          </View>
        ) : (
          <>
            <DeepLinkHandler />
            {hasLaunched ? 
              <Stacks route={{params: {initialRouteName: 'Login'}}} />
              :
              <Stacks />
            }
          </>
        )
      }
    </NavigationContainer>
  );
}

export default RootNavigator;
