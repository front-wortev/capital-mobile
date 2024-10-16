import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { Notificaciones } from '../../notificaciones/Notificaciones'
import { Texts } from '../../../atoms/Texts'
import {
  FontAwesome, 
  FontAwesome5,
  FontAwesome6
} from "@expo/vector-icons"
import { DocumentosHome } from '../../documentosHome/DocumentosHome'
import { useSelector } from 'react-redux'
import { TabHomeOnb } from './TabHomeOnb'
import { Logo } from '../../../atoms/Logo'
import { Cuenta } from '../../cuenta/Cuenta'
import useDocumentValidation from '../../../functions/validateDocumentos'
import { useState } from 'react'
import { useEffect } from 'react'

const Drawer = createDrawerNavigator()

const DisabledDrawerItem = ({ label, icon }) => {
    return (
      <View>
        <DrawerItem
        labelStyle={{
            color: '#757575',
            fontSize: 16, 
            fontFamily: 'Poppins-Light'
            }}
          label={label}
          icon={icon}
          onPress={() => {}}
        />
      </View>
    );
  };

  const EnabledDrawerItem = ({ label, icon, colorText, onPress, children, style, styleDrawer }) => {
    return (
      <View style={style}>
        <DrawerItem
        style={styleDrawer}
        labelStyle={{
            color: colorText,
            fontSize: 16, 
            fontFamily: 'Poppins-Light',
            }}
          label={label}
          icon={icon}
          onPress={onPress}
        />
        {children}
      </View>
    );
  };

export const DrawerHomeOnb = ({navigation}) => {
    const userName = useSelector((state) => state.session.userData)
    const userData = useSelector((state) => state.user.userData)

    const [documentosError, setDocumentosError] = useState([])


    if(userData.documentacion !== null) {
      const documentos = useDocumentValidation()
      useEffect(() => {
        setDocumentosError(documentos)
      }, [])
    }

    const exclamation = <FontAwesome6 name="exclamation" size={28} color="black" />

  return (
    <Drawer.Navigator
      initialRouteName='NavigationHome'
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>

              <View style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center', 
                flexDirection: 'row'
              }}>
                <Texts type={'pLarge'} >Hola, </Texts>
                <Texts type={'h2'} >{userName}</Texts>
              </View>

              <View style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
                <Texts type={'p'} extraStyles={{textAlign: 'left', width: '100%', paddingLeft: 20, color: '#757575', paddingBottom: 10, fontFamily: 'Poppins-Light' }}>Perfil</Texts>
              </View>

              {
                documentosError?.enRevision || userData.documentacion === null ? 
                  <>
                    <DisabledDrawerItem label="Mis Datos" icon={({ color, size }) => <FontAwesome name="user" size={size} color={color} />} />
                    <DisabledDrawerItem label="Datos Fiscales" icon={({ color, size }) => <FontAwesome name="building" size={size} color={color} />} />
                    <DisabledDrawerItem label="Datos Bancarios" icon={({ color, size }) => <FontAwesome5 name="wallet" size={size} color={color} />} />
                    <DisabledDrawerItem label="Documentos" icon={({ color, size }) => <FontAwesome name="folder-open" size={size} color={color} />} />
                  </>
                : 
                  <>
                    <EnabledDrawerItem label="Mis Datos" colorText="#2B2B2B" icon={({ size }) => <FontAwesome name="user" size={size} color="#333333" />} onPress={() => {}} />
                    <EnabledDrawerItem label="Datos Fiscales" colorText="#2B2B2B" icon={({ size }) => <FontAwesome name="building" size={size} color="#333333" />} onPress={() => {}} />
                    <EnabledDrawerItem label="Datos Bancarios" colorText="#2B2B2B" icon={({ size }) => <FontAwesome5 name="wallet" size={size} color="#333333" />} onPress={() => {}} />
                    <EnabledDrawerItem label="Documentos" children={exclamation} styleDrawer={{width: 230}} style={{flexDirection: 'row', alignItems: 'center',width: 260 }} colorText={ documentosError?.conError ? "#C20000" : "#2B2B2B" } icon={({ size }) => <FontAwesome name="folder-open" size={size} color="#333333" />} onPress={() => navigation.navigate('Documentos', {header: false})} />
                  </>
              }
              

              <View style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 10
              }}>
                <Texts type={'p'} extraStyles={{textAlign: 'left', width: '100%', paddingLeft: 20, color: '#757575', fontFamily: 'Poppins-Light'  }}>Ajustes</Texts>
              </View>

              <DrawerItem
                label="Cuenta"
                labelStyle={{
                  color: '#2B2B2B',
                  fontSize: 16, 
                  fontFamily: 'Poppins-Light' 
                }}
                onPress={() => navigation.navigate('Cuenta')}
              />

              <DrawerItem
                label="Ayuda"
                labelStyle={{
                  color: '#2B2B2B',
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
          color: '#757575',
          fontSize: 16, 
          fontFamily: 'Poppins-Light',
        },
      }}
    >

      {/* //pantalla oculta de inicio */}
      <Drawer.Screen 
        name="NavigationHome" 
        component={TabHomeOnb}
        options={
            {
                drawerLabel: '',
                headerShown: false,
                title: '',
                drawerItemStyle: { display: 'none' }
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
                  return (<FontAwesome name='folder-open' size={ 20 } color = { '#757575' } />)
                }
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
