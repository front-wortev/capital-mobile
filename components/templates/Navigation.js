import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Home } from '../pages/Home/Home';
import InversionesHome from '../pages/InversionesHome/InversionesHome';
import Calculadora from '../pages/calculadora/Calculadora';
import Referidos from '../pages/referidos/Referidos';
import { Hamburger } from '../molecules/hamburger';
import { Envelope } from '../molecules/Envelope';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={ ({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';
          switch ( route.name ) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Inversiones':
              iconName = 'dollar-sign';
              break;
            case 'Calculadora':
              iconName = 'calculator';
              break;
            case 'Referidos':
              iconName = 'gift';
              break;
          }
          return(
            <>
              { iconName == 'dollar-sign' ? (
                <Icon style={{ backgroundColor:  focused ? '#14DA13' : color ,
                padding: 8,
                width: 40,
                height: 40,
                borderRadius: 50,
                paddingLeft: 13, }} name={ iconName } size={ 25 } color = { '#FFFFFF' } />
              ) : (
                <Icon name={ iconName } size={ 32 } color = { focused ? '#14DA13' : color } />
              ) }
            </>
          )
        }
      }) }
    >
        <Tab.Screen name='Home' component={ Home } options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
        <Tab.Screen name='Inversiones' component={ InversionesHome } />
        <Tab.Screen name='Calculadora' component={ Calculadora } options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
        <Tab.Screen name='Referidos' component={ Referidos } />
    </Tab.Navigator>
  )
}

