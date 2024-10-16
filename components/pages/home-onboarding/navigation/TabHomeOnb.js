import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calculadora } from '../../calculadora/Calculadora';
import { HomeProfile } from '../HomeProfile';
import { Hamburger } from '../../../molecules/hamburger';
import { Envelope } from '../../../molecules/Envelope';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabHomeOnb = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';
          let disabled = true;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              disabled = true
              break;
            case 'InversionesStack':
              iconName = 'dollar-sign';
              disabled = false;
              break;
            case 'Calculadora':
              iconName = 'calculator';
              disabled = true
              break;
            case 'Referidos':
              iconName = 'gift';
              disabled = false;
              break;
          }
          return (
            <Pressable disabled={disabled}>
              {iconName == 'dollar-sign' ? (
                <Icon
                  style={{
                    backgroundColor: '#D9D9D9',
                    padding: 8,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    paddingLeft: 13,
                  }}
                  name={iconName}
                  size={25}
                  color={'#FFFFFF'}
                />
              ) : (
                <Icon name={iconName} size={32} color={iconName !== 'gift' ? (focused ? '#14DA13' : color) : '#D9D9D9'} />

              )}
            </Pressable>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeProfile}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="InversionesStack" component={HomeProfile} options={{ headerShown: false }} />

      <Tab.Screen
        name="Calculadora"
        component={Calculadora}
        options={{ headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }}
      />
      <Tab.Screen name="Referidos" component={HomeProfile} options={{ headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
    </Tab.Navigator>
  );
};
