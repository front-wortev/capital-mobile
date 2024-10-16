import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Header } from '../reusable-invesionista/Header'
import { Texts } from '../../atoms/Texts'
import { GoForward } from '../../atoms/GoForward'
import { Inputs } from '../../organisms/Inputs'
import { API_BASE } from '@env'
import { datosBeneficiarioStyle } from './DatosBeneficiarioStyle'
import { DropdownPicker } from '../../organisms/Dropdown'
import { useSelector } from 'react-redux'
import { InputPhone } from '../../organisms/InputPhone'
import { useFetch } from '../../../hooks/useFetch'
import { LinearGradient } from 'expo-linear-gradient'


export const DatosBeneficiario = ({route, navigation}) => {

  const items = [
    {label: 'Sueldo', value: 'sueldo'},
    {label: 'Ahorros', value: 'ahorros'},
    {label: 'Herencia', value: 'herencia'},
    {label: 'Otro', value: 'otro'},
  ]

  const userData = useSelector((state) => state.user.userData)
  const tokenRedux = useSelector((state) => state.session.token)

  const { telFis, rfc, curp, selectedValue, calle, numExterior, numInterior, codPost, colonia, alcaldia } = route.params;

  const [ bancos, setBancos ] = useState([])
  const [ bancoSeleccionado, setBancoSeleccionado ] = useState(null)
  const [ origenRecursos, setOrigenRecursos ] = useState(null)
  const [ origenRecursosOtro, setOrigenRecursosOtro] = useState('')
  const [ isFocusDropdown, setIsFocusDropdown ] = useState(false)
  const [ isFocusDropdownRecursos, setIsFocusDropdownRecursos ] = useState(false)
  const [ titular, setTitular ] = useState(`${userData.first_name} ${userData.last_name}`)
  const [ clabe, setClabe ] = useState('')
  const [ cuenta, setCuenta ] = useState('')
  const [ beneficiario, setBeneficiario ] = useState('')
  const [ correoBeneficiario, setCorreoBeneficiario ] = useState('')
  const [ telBeneficiario, setTelBeneficiario ] = useState('')
  const [ errors, setErrors ] = useState({})

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
      nivel_estudios: 'Licenciatura',
      telefono: telFis,
      curp: curp,
      rfc_fisica: rfc,
      aceptacion_dir_fiscal: '1',
      estado: selectedValue,
      calle: calle,
      num_casa: numExterior,
      num_casa_int: numInterior,
      codigo_postal: codPost,
      colonia: colonia,
      municipio: alcaldia,
      origen_recursos: [origenRecursos],
      origen_recursos_otro: origenRecursosOtro,
      institucion: bancoSeleccionado,
      clabe: clabe,
      cuenta: cuenta,
      nombre_benef: beneficiario,
      email_benef: correoBeneficiario,
      tel_benef: telBeneficiario,
      extranjero: 0,
    }    
    
    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json") 
    headers.append("Authorization", `Bearer ${token}`)

    const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', investmentProfile, 'normal');

    console.log(fetchResult);

    if(fetchResult.message === 'success') {
      navigation.navigate('Documentacion')
    } else if (fetchResult.message === 'Error') {
      setErrors(fetchResult.data)
    }
  }
  
  

  return (
    <ScrollView>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <Header currentPage={2} />
      <View style={ datosBeneficiarioStyle.container } >
        <DropdownPicker 
            extraStyles={isFocusDropdownRecursos && { borderColor: '#14DA13' }}
            requireValue={true} 
            placeholder={'Selecciona una opción'} 
            data={items}
            value={origenRecursos}
            onFocus={() => setIsFocusDropdownRecursos(true)}
            onBlur={() => setIsFocusDropdownRecursos(false)}
            onChange={item => {
              setOrigenRecursos(item.value);
              setIsFocusDropdownRecursos(false);
            }}
            dropdownPosition='auto'
          >
            Fuente de recursos para inversión
          </DropdownPicker>
          {
            origenRecursos === 'otro' && 
              <Inputs
                requireValue={true}
                inputMode='text'
                value={origenRecursosOtro}
                onChangeText={(text) => setOrigenRecursosOtro(text)}
                autoCapitalize="words"
              >
                Otro:
              </Inputs>
          }
          
          <Texts type='h2' extraStyles={{  alignSelf: 'flex-start', marginLeft: '10%', marginTop: 15 }} >Datos bancarios</Texts>
          <Inputs
            requireValue={true}
            inputMode='text'
            value={titular}
            onChangeText={(text) => setTitular(text)}
            extraStyles={ datosBeneficiarioStyle.margin15 } 
            autoCapitalize="words"
          >
            Titular de la cuenta
          </Inputs>
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
                extraStyles={ datosBeneficiarioStyle.margin15 }
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
                extraStyles={ datosBeneficiarioStyle.margin15 }
                inputMode='numeric'
                value={clabe}
                onChangeText={(text) => setClabe(text)}
                maxLength={18}
              >
                CLABE interbancaria
              </Inputs>
          }
          
          <Texts type='h2' extraStyles={{ alignSelf: 'flex-start', marginLeft: '10%', marginTop: 15 }} >Datos del beneficiario</Texts>
          <Inputs 
            requireValue={true}
            placeholder={'Nombre del beneficiario'} 
            extraStyles={ datosBeneficiarioStyle.margin15 }
            value={beneficiario}
            onChangeText={(text) => setBeneficiario(text)}
            autoCapitalize="words"
          >
              Beneficiario
          </Inputs>
          <Inputs 
            requireValue={true}
            placeholder={'Correo del beneficiario'} 
            inputMode='email'
            extraStyles={ datosBeneficiarioStyle.margin15 }
            value={correoBeneficiario}
            onChangeText={(text) => setCorreoBeneficiario(text)}
          >
            Correo electrónico
          </Inputs>
          <InputPhone
            requireValue={true}
            value={telBeneficiario}
            onChangeText={(text) => setTelBeneficiario(text)}
            maxLength={10}
          >
            Número telefónico
          </InputPhone>

          <View style={datosBeneficiarioStyle.forwardButton}>
            <GoForward onPress={(handleUpdatePerfil)}/>
          </View>
      </View>
    </ScrollView>
  )
}
