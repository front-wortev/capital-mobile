import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { NavigationHome } from './NavigationHome'
import { Notificaciones } from '../pages/notificaciones/Notificaciones'
import { Texts } from '../atoms/Texts'
import {
  FontAwesome, 
  FontAwesome5
} from "@expo/vector-icons"
import { MisDatos } from '../pages/misDatos/MisDatos'
import { DatosFiscales } from '../pages/datosFiscales/DatosFiscales'
import { CuentaBancaria } from '../pages/cuentaBancaria/CuentaBancaria'
import { DocumentosHome } from '../pages/documentosHome/DocumentosHome'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Logo } from '../atoms/Logo'
import { Cuenta } from '../pages/cuenta/Cuenta'

const Drawer = createDrawerNavigator()

export const DrawerNavigation = ({navigation}) => {

  const userName = useSelector((state) => state.session.userData)  

  return (
    <Drawer.Navigator
      initialRouteName='NavigationHome'
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>

              <LinearGradient
                  colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: '1000%'}}
              />

              <View style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center', 
                flexDirection: 'row'
              }}>
                <Texts type={'pLarge'}>Hola, </Texts>
                <Texts type={'h2'} >{userName}</Texts>
              </View>

              <View style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
                <Texts type={'p'} extraStyles={{textAlign: 'left', width: '100%', paddingLeft: 20, color: '#757575', fontFamily: 'Poppins-Light' }}>Perfil</Texts>
              </View>

              <DrawerItemList { ...props }/>

              <View style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 10
              }}>
                <Texts type={'p'} extraStyles={{textAlign: 'left', width: '100%', paddingLeft: 20, color: '#757575', fontFamily: 'Poppins-Light'}}>Ajustes</Texts>
              </View>

              <DrawerItem
                label="Cuenta"
                labelStyle={{
                  color: '#000',
                  fontSize: 16, 
                  fontFamily: 'Poppins-Light'
                }}
                onPress={() => navigation.navigate('Cuenta')}
              />

              <DrawerItem
                label="Ayuda"
                labelStyle={{
                  color: '#000',
                  fontSize: 16, 
                  fontFamily: 'Poppins-Light' 
                }}
              />    

              <View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center'}}>
                <Logo/>
              </View>

            </SafeAreaView>
          )
        }
      }

      

      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
        },
        drawerLabelStyle: {
          color: '#000',
          fontSize: 16, 
          fontFamily: 'Poppins-Light'
        },
      }}
    >

      <Drawer.Screen 
        name="Mis Datos" 
        options={
            {
                drawerLabel: 'Mis datos',
                headerShown: false,
                title: 'Mis datos',
                drawerIcon: ({focused, size}) => {
                  return (<FontAwesome name='user' size={ 20 } color = { '#333' } />)
                }
            }
        } 
        component={MisDatos} 
      />

      <Drawer.Screen 
        name="Datos Fiscales" 
        component={DatosFiscales} 
        options={
            {
                drawerLabel: 'Datos Fiscales',
                headerShown: false,
                title: 'Datos Fiscales',
                drawerIcon: () => {
                  return (<FontAwesome name='building' size={ 20 } color = { '#333' } />)
                }
            }
        } 
      />

      <Drawer.Screen 
        name="Datos bancarios" 
        component={CuentaBancaria} 
        options={
            {
                drawerLabel: 'Datos bancarios',
                headerShown: false,
                title: 'Datos bancarios',
                drawerIcon: () => {
                  return (<FontAwesome5 name='wallet' size={ 20 } color = { '#333' } />)
                }
            }
        } 
      />

      <Drawer.Screen 
        name="Documentos"
        component={DocumentosHome}
        options={ 
            {
                drawerLabel: 'Documentos',
                headerShown: false,
                title: 'Documentos',
                drawerIcon: () => {
                  return (<FontAwesome name='folder-open' size={ 20 } color = { '#333' } />)
                }
            }
        } 
      />  

      {/* //pantalla oculta de inicio */}
      <Drawer.Screen 
        name="NavigationHome" 
        component={NavigationHome}
        options={
            {
                drawerLabel: 'Documentos',
                headerShown: false,
                title: 'Documentos',
                drawerItemStyle: { display: 'none' }
            }
        } 
      />

      <Drawer.Screen 
        name="Cuenta" 
        component={Cuenta} 
        options={
            {
                drawerLabel: 'Cuenta',
                headerShown: false,
                title: 'Cuenta',
                drawerItemStyle: { display: 'none' }
            }
        } 
      />
      

      {/* pantalla de notificaciones */}
      <Drawer.Screen 
        name="Notificaciones" 
        component={Notificaciones} 
        options={
            {
                drawerLabel: 'Notificaciones',
                headerShown: false,
                title: 'Notificaciones',
                drawerItemStyle: { display: 'none' }
            }
        } 
      />

    </Drawer.Navigator>
  )
}