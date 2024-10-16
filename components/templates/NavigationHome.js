import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { Home } from '../pages/homeComponent/Home'
import { Hamburger } from '../molecules/hamburger'
import { Envelope } from '../molecules/Envelope'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Calculadora } from '../pages/calculadora/Calculadora'
import Referidos from '../pages/referidos/Referidos'
import { useSelector } from 'react-redux'
import { InversionesHome } from '../pages/InversionesHome/InversionesHome'
import { TouchableOpacity } from 'react-native'
import { selectInversiones } from '../../redux/async-slices/inversionSlice'

const Tab = createBottomTabNavigator()

export const NavigationHome = () => {

  const inversionesData = useSelector(selectInversiones)

  const [inversiones, setInversiones] = useState(false)

  useEffect(() => {
    if(inversionesData[0]?.estatus_inversion?.id_estatus_inv === 2) {
      setInversiones(true)
    }
  }, [])


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
              iconColor = '#2B2B2B';
              break;
            case 'InversionesStack':
              iconName = 'dollar-sign';
              iconColor = '#2B2B2B';
              break;
            case 'Calculadora':
              iconName = 'calculator';
              iconColor = '#2B2B2B';
              break;
            case 'Referidos':
              iconName = 'gift';
              if (!inversiones) {
                iconColor = '#D9D9D9';
              } else {
                iconColor = '#2B2B2B';
              }
              break;
            case 'InversionData':
              iconName = 'dollar-sign';
              iconColor = '#2B2B2B';
              break;
          }
          return(
            <>
              { iconName == 'dollar-sign' ? (
                <Icon style={{ backgroundColor:  focused ? '#14DA13' : iconColor ,
                padding: 8,
                width: 40,
                height: 40,
                borderRadius: 50,
                paddingLeft: 13, }} name={ iconName } size={ 25 } color = { '#FFFFFF' } />
              ) : (
                <Icon name={ iconName } size={ 32 } color = { focused ? '#14DA13' : iconColor } />
              ) }
            </>
          )
        }
      }) }
    >
        <Tab.Screen name='Home' component={ Home } options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
        <Tab.Screen name='InversionesStack' component={InversionesHome}  options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
        <Tab.Screen name='Calculadora' component={Calculadora} options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope }} />
        <Tab.Screen name='Referidos' component={ Referidos } options={{headerTitle: '', headerTitleAlign: 'left', headerTransparent: true, headerLeft: Hamburger, headerRight: Envelope, tabBarButton: (props) => (<TouchableOpacity {...props} disabled={!inversiones} />), }}/>
    </Tab.Navigator>
    
  )

}

