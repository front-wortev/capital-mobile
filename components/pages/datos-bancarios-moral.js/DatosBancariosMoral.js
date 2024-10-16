import React, { useState } from 'react'
import { View } from 'react-native'
import { API_BASE } from '@env'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from '../reusable-invesionista/Header'
import { Texts } from '../../atoms/Texts'
import { datosBancariosMoralesStyles } from './datosBancariosMoralesStyles'
import { Inputs } from '../../organisms/Inputs'
import { useEffect } from 'react'
import { DropdownPicker } from '../../organisms/Dropdown'
import { Entypo } from '@expo/vector-icons';
import { GoForward } from '../../atoms/GoForward'
import { useSelector } from 'react-redux'
import { useHeaderHeight } from '@react-navigation/elements'
import { useFetch } from '../../../hooks/useFetch'
import { LinearGradient } from 'expo-linear-gradient'

export const DatosBancariosMoral = ({navigation}) => {

    const userData = useSelector((state) => state.user.userData)
    const tokenRedux = useSelector((state) => state.session.token)
    const headerHeigth = useHeaderHeight()

    const [ bancos, setBancos ] = useState([]);
    const [ bancoSeleccionado, setBancoSeleccionado ] = useState(null);
    const [ isFocusDropdown, setIsFocusDropdown ] = useState(false)
    const [ titular, setTitular ] = useState(`${userData.first_name} ${userData.last_name}`)
    const [ clabe, setClabe ] = useState('')
    const [ cuenta, setCuenta ] = useState('')
    const [ errors, setErrors ] = useState('')

    useEffect(() => {
        const cargarBancos = async () => {
            try {
                const response = await fetch(`${API_BASE}/banks`);
                const data = await response.json();
                const bancosFormatted = data.data.map(banco => ({
                    label: banco.nombre,
                    value: banco.nombre
                }));
                setBancos(bancosFormatted);
            } catch (error) {
                console.error('Error al cargar los bancos:', error);
            }
        };
        cargarBancos();
    }, []);

    const handleUpdatePerfil = async() => {
        const apiBase = API_BASE
        const endPoint = '/perfil/create/step2'
        const token = tokenRedux.access_token
    
        const investmentProfile = {
            institucion: bancoSeleccionado,
            clabe: clabe,
            cuenta: cuenta,
        }    
        
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json") 
        headers.append("Authorization", `Bearer ${token}`)
    
        const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', investmentProfile, 'normal');
    
        console.log(fetchResult);
    
        if(fetchResult.message === 'success') {
          navigation.navigate('Documentos-moral')
        } else if (fetchResult.message === 'Error') {
          setErrors(fetchResult.data)
        }
      }


  return (
    <ScrollView style={{marginTop: headerHeigth}}>
        <LinearGradient
            colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <Header currentPage={2}/>
        <View style={datosBancariosMoralesStyles.container}>
            <Texts type='h2' extraStyles={{ marginBottom: 5 }}>Datos bancarios de la empresa</Texts>
            <Inputs 
                requireValue={true} 
                value={titular}
                onChangeText={(text) => setTitular(text)}
                extraStyles={{marginVertical: 15}}
                editable={true} 
                autoCapitalize="words"
            >
                Titular de la cuenta
            </Inputs>
            {
                errors.institucion && <Texts type="pSmall" extraStyles={datosBancariosMoralesStyles.errorMessage}>Este campo es obligatorio</Texts>
            }
            <DropdownPicker
                extraStyles={isFocusDropdown && { borderColor: '#14DA13' }}
                requireValue={true} 
                placeholder={'Selecciona una opción'} 
                data={bancos}
                value={bancoSeleccionado}
                onFocus={() => setIsFocusDropdown(true)}
                onBlur={() => setIsFocusDropdown(false)}
                onChange={item => {
                setBancoSeleccionado(item.value);
                setIsFocusDropdown(false);
                }}
                dropdownPosition='auto'
            >
                Institución bancaria
            </DropdownPicker>
            {
                bancoSeleccionado === 'BBVA Bancomer' ? 
                <Inputs 
                    requireValue={true} 
                    placeholder={'10 dígitos'} 
                    extraStyles={{marginVertical: 15}}
                    inputMode='numeric'
                    value={cuenta}
                    onChangeText={(text) => setCuenta(text)}
                    maxLength={10}
                >
                    Número de cuenta
                </Inputs>
                
                :
                <Inputs
                    requireValue={true}
                    placeholder={'18 dígitos'} 
                    extraStyles={{marginVertical: 15}}
                    inputMode='numeric'
                    value={clabe}
                    onChangeText={(text) => setClabe(text)}
                    maxLength={18}
                >
                    CLABE interbancaria
                </Inputs>
            }
            {
                errors.clabe && <Texts type="pSmall" extraStyles={datosBancariosMoralesStyles.errorMessage}>Este campo es obligatorio</Texts>
            }
            {
                errors.cuenta && <Texts type="pSmall" extraStyles={datosBancariosMoralesStyles.errorMessage}>Este campo es obligatorio</Texts>
            }
        <View style={datosBancariosMoralesStyles.fila}>
            <Entypo name="dot-single" size={24} color="black" />
            <Texts type='p' extraStyles={{textAlign: 'justify' }}>Al invertir en WORTEV CAPITAL tú realizas el depósito de tu inversión, no retiraremos dinero de esta cuenta, sólo depositaremos tus rendimientos cada mes.</Texts>
        </View>
        <View style={datosBancariosMoralesStyles.fila}>
            <Entypo name="dot-single" size={24} color="black" />
            <Texts type='p' extraStyles={{textAlign: 'justify' }} >La cuenta a la que depositaremos tus rendimientos, puede ser diferente a la que utilizarás para realizar tu inversión.</Texts>
        </View>
        <View style={datosBancariosMoralesStyles.fila}>
            <Entypo name="dot-single" size={24} color="black" />
            <Texts type='p' extraStyles={{textAlign: 'justify' }}>La cuenta que captures siempre debe estar a nombre de la empresa.</Texts>
        </View>
        </View>
        <View style={datosBancariosMoralesStyles.forwardButton}>
            <GoForward onPress={handleUpdatePerfil} />
        </View>
    </ScrollView>
  )
}
