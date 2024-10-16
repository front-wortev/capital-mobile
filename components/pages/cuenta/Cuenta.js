import React, { useState } from 'react'
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { Texts } from '../../atoms/Texts'
import { cuentaStyles } from './cuentaStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { API_BASE } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFetch } from '../../../hooks/useFetch'
import { Button } from '../../atoms/Button'
import { Inputs } from '../../organisms/Inputs'

export const Cuenta = ({navigation}) => {

    const userEmail = useSelector((state) => state.session.userEmail)
    const tokenRedux = useSelector((state) => state.session.token)

    const [modalDeleteCuenta, setModalDeleteCuenta] = useState(false)
    const [deleteCuenta,setDeleteCuenta] = useState('')

    const handleLogOut = async() => {
      const apiBase = API_BASE
      const endPoint = '/logout'
      const token = tokenRedux.access_token
  
      const headers = new Headers()
      headers.append("Accept", "application/json")
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
  
      const fetch = await useFetch(apiBase + endPoint, headers, 'POST', 'normal')
  
      console.log(fetch)
  
      if (fetch.message === 'Sesión finalizada') {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('HAS_LAUNCHED');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Inicio'}],
        });
      }
    }

    const handleCancel = () => {
      setDeleteCuenta('')
      setModalDeleteCuenta(false)
    }

  return (
    <SafeAreaView style={cuentaStyles.screen}>
        <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={cuentaStyles.background}
        />
        <View style={cuentaStyles.conteiner}>
          <Texts type='h1'>Cuenta</Texts>
          <Texts type='h3' extraStyles={{color: '#828282'}} >{userEmail}</Texts>
        </View>

        <View style={cuentaStyles.cardsContainer}>

          <TouchableOpacity style={cuentaStyles.card} onPress={() => navigation.navigate('ChangePassword')}>
            <View style={cuentaStyles.row}>
              <FontAwesome5 name="wrench" size={20} color="#2B2B2B" />
              <Texts type='h2' >Cambiar contraseña</Texts>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#2B2B2B" />
          </TouchableOpacity>

          <TouchableOpacity style={cuentaStyles.card} onPress={handleLogOut} >
          <View style={cuentaStyles.row}>
              <MaterialCommunityIcons name="arrow-right-bold-circle" size={24} color="#2B2B2B" />
              <Texts type='h2' >Cerrar sesión</Texts>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#2B2B2B" />
          </TouchableOpacity>

          <TouchableOpacity style={cuentaStyles.card} onPress={() => setModalDeleteCuenta(true)}>
            <View style={cuentaStyles.row}>
              <FontAwesome name="trash" size={24} color="#E20000" />
              <Texts type='h2' extraStyles={{color: '#E20000'}} >Eliminar cuenta</Texts>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#E20000" />
          </TouchableOpacity>

        </View>

        <Modal
          animationType="fade" 
          transparent={true}
          visible={modalDeleteCuenta}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, alignItems: 'center' }}>
              <Texts type='h3' extraStyles={{ color: '#2B2B2B', marginVertical: 20, fontSize: 20 }}>Eliminar Cuenta</Texts>
              <Texts type='p' extraStyles={{ marginBottom: 17, textAlign: 'center' }}>
                Esta acción no se puede deshacer. Perderás tu acceso si continúas.
              </Texts>
              <Inputs 
                extraStyles={{ width: 250, marginBottom: 17 }} 
                placeholder='Ingresa tu contraseña' 
                value={deleteCuenta}
                onChangeText={(text) => setDeleteCuenta(text)}
              >
                Contraseña
              </Inputs>
              <View style={[cuentaStyles.row, { width: 260, gap: 5 }]}>
                <Button
                  type='secondary'
                  extraStyles={{
                    paddingVertical: 14,
                    width: 125,
                    borderRadius: 8,
                  }}
                  extraStylesShadow={{
                    borderRadius: 8,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  }}
                  onPress={handleCancel}
                >
                  CANCELAR
                </Button>
                <Button
                  type='primary'
                  extraStyles={{
                    backgroundColor: '#E20000',
                    paddingVertical: 14,
                    width: 125,
                    borderRadius: 8,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  }}
                  onPress={() => setModalDeleteCuenta(false)}
                >
                  ELIMINAR
                </Button>
              </View>
            </View>
          </View>
        </Modal>

       
    </SafeAreaView>
  )
}
