import React from 'react';
import { View } from 'react-native';
import { Inputs } from '../../organisms/Inputs';
import { Checkboxes } from '../../molecules/Checkboxes';
import { DateTimePickers } from '../../molecules/DateTimePickers';
import { DropdownPicker } from '../../organisms/Dropdown';
import { GoForward } from '../../atoms/GoForward';
import { useHeaderHeight } from '@react-navigation/elements';
import { API_BASE } from '@env'
import { useFetch } from '../../../hooks/useFetch'
import { datosStyles } from './datosStyles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Texts } from '../../atoms/Texts';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

export const Datos = ({navigation}) => {

  const tokenRedux = useSelector((state) => state.session.token)
  const userData = useSelector((state) => state.user.userData)

  const [ firstName, setFirstName ] = useState(userData.first_name)
  const [ lastName, setLastName ] = useState(userData.last_name)
  const [ generoValue, setGeneroValue ] = useState('')
  const [ fechaNacimiento, setFechaNacimiento] = useState(new Date())
  const [ ocupacionValue, setOcupacionValue] = useState('')
  const [ personaPolitica, setPersonaPolitica ] = useState()
  const [ knowValue, setKnoewValue ] = useState('')
  const [ knowValueOther, setKnoewValueOther ] = useState('')
  const [ isFocusDropdown, setIsFocusDropdown ] = useState(false)
  const [ errors, setErrors ] = useState({})

  const items = [
    {label: 'Google', value: 'google'},
    {label: 'Youtube', value: 'youtube'},
    {label: 'Instagram', value: 'instagram'},
    {label: 'Evento/webinar', value: 'event'},
    {label: 'Prensa/radio/televisión', value: 'medios'},
    {label: 'Linkedin', value: 'linkedin'},
    {label: 'Pinterest', value: 'pinterest'},
    {label: 'Otro', value: 'otro'},
  ]

  const headerHeight = useHeaderHeight();

  const handleDateChange = (newDate) => {
    setFechaNacimiento(newDate);
  };

  const handleMasculinoOption = () => {
    setGeneroValue('Hombre')
  };

  const handleFemeninoOption = () => {
    setGeneroValue('Mujer')
  };

  const handlePersonaPolitica = () => {
    setPersonaPolitica(1)
  }

  const handleNoPersonaPolitica = () => {
    setPersonaPolitica(0)
  }

  const handleUpdatePerfil = async() => {
    const apiBase = API_BASE
    const endPoint = '/perfil/create/step1'
    const token = tokenRedux.access_token
  
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("genero", generoValue);
    formData.append("fecha_nacimiento", fechaNacimiento.toISOString().split('T')[0]);
    formData.append("ocupacion", ocupacionValue);
    formData.append("persona_politica", personaPolitica);
    formData.append("como_supo[0]", knowValue);
    formData.append("como_supo_otro", knowValueOther);
  
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    const fetchResult = await useFetch(apiBase + endPoint, headers, 'POST', formData, 'formData');
  
    
    if(fetchResult.message === 'success') {
      navigation.navigate('Slider');
    } else if (fetchResult.message === 'Error') {
      setErrors(fetchResult.data);
      
    }
  }  


  return(
    <ScrollView style={datosStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View style={[datosStyles.main, {marginTop:  20 + headerHeight}]}>
        
        <Inputs 
          placeholder={'Nombre(s)'} 
          requireValue={true}
          inputMode='text'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          extraStyles={datosStyles.inputs}
          autoCapitalize="words"
        >
          Nombre
        </Inputs>
        { errors?.first_name && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.first_name}</Texts>
        }

        <Inputs 
          placeholder={'Apellido(s)'} 
          requireValue={true}
          inputMode='text'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          extraStyles={datosStyles.inputs}
          autoCapitalize="words"
        >
          Apellidos
        </Inputs>
        { errors?.last_name && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.last_name}</Texts>
        }

        <Checkboxes 
           requireValue={true} 
           option1={'Masculino'} 
           option2={'Femenino'}  
           onOption1Select={handleMasculinoOption} 
           onOption2Select={handleFemeninoOption} 
           extraStyles={datosStyles.inputs}
        >
          Sexo asignado al nacer
        </Checkboxes>
        { errors?.genero && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.genero}</Texts>
        }

        <DateTimePickers 
          placeholder={'DD/MM/AAAA'} 
          requireValue={true} 
          onDateChange={handleDateChange} 
          extraStyles={datosStyles.inputs}
        >
          Fecha de Nacimiento
        </DateTimePickers>
        { errors?.fecha_nacimiento && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.fecha_nacimiento}</Texts>
        }


        <Inputs 
          placeholder={'Ingresa tu actividad oficial'} 
          inputMode='text' value={ocupacionValue} 
          onChangeText={(text) => setOcupacionValue(text)} 
          requireValue={true} 
          extraStyles={[datosStyles.inputs, {marginTop: 8}]}
          autoCapitalize="words"
        >
          Ocupación / actividad económica
        </Inputs>
        { errors && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.ocupacion}</Texts>
        }

        <Checkboxes 
          requireValue={true} 
          option1={'Sí'} 
          option2={'No'} 
          onOption1Select={handlePersonaPolitica} 
          onOption2Select={handleNoPersonaPolitica} 
          extraStyles={datosStyles.inputs}
        >
          ¿Eres una persona políticamente expuesta?
        </Checkboxes>
        { errors?.persona_politica && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.persona_politica}</Texts>
        }

        <DropdownPicker 
          extraStyles={isFocusDropdown && { borderColor: '#14DA13' }}
          requireValue={false} 
          placeholder={'Selecciona una opción'} 
          data={items}
          value={knowValue}
          onFocus={() => setIsFocusDropdown(true)}
          onBlur={() => setIsFocusDropdown(false)}
          onChange={item => {
            setKnoewValue(item.value);
            setIsFocusDropdown(false);
          }}
          dropdownPosition='top'
        >
          ¿Cómo nos conociste?
        </DropdownPicker>
        { errors?.como_supo && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.como_supo}</Texts>
        }

        { knowValue === 'otro' &&         
          <Inputs
            placeholder={'Como nos conociste'} 
            inputMode='text' 
            value={knowValueOther} 
            onChangeText={(text) => setKnoewValueOther(text)} 
            requireValue={true} 
            extraStyles={datosStyles.inputs}
            autoCapitalize="words"
          > 
            Otro
          </Inputs>          
        }

        { errors?.como_supo_otro && 
          <Texts type="pSmall" extraStyles={datosStyles.errorMessage}>{errors.como_supo_otro}</Texts>
        }
        
      </View>

      <View style={datosStyles.forwardButton}>
        <GoForward onPress={handleUpdatePerfil} />
      </View>


    </ScrollView>
  );
}