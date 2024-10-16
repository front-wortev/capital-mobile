import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Texts } from '../../atoms/Texts';
import { Button } from '../../atoms/Button';
import { Inputs } from '../../organisms/Inputs';
import Checkbox from 'expo-checkbox';
import { credencialesStyles } from './credencialesStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/slices/authSlice';
import { useFetch } from '../../../hooks/useFetch' 
import { API_BASE } from '@env'
import { LinearGradient } from 'expo-linear-gradient';
import { storeData } from '../../functions/helpers/storageHelper';

export const Credenciales = ({navigation}) => {

  const credencialsData = useSelector((state) => state.data.credenciales.data)


  const dispatch = useDispatch();
  

  const [ checked, setChecked ] = useState(false);
  const [ newUser, setNewUser ] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmation: null
  });

  const [ onCompleteForm, setOnCompleteForm ] = useState(false);

  const inputData = [
    {
      label: 'Nombre',
      placeholder: 'Nombre(s)',
      secureTextEntry: false,
      requireValue: true,
      inputMode: 'text',
      extraStyles: credencialesStyles.inputs,
      fieldName: 'first_name',
      error: false,
      message: ''
    },
    {
      label: 'Apellidos',
      placeholder: 'Apellido(s)',
      secureTextEntry: false,
      requireValue: true,
      inputMode: 'text',
      extraStyles: credencialesStyles.inputs,
      fieldName: 'last_name',
      error: false,
      message: ''
    },
    {
      label: 'Correo Electrónico',
      placeholder: 'Ingresa tu correo electrónico',
      secureTextEntry: false,
      requireValue: true,
      inputMode: 'email',
      extraStyles: credencialesStyles.inputs,
      fieldName: 'email',
      error: false,
      message: ''
    },
    {
      label: 'Crea una contraseña',
      placeholder: 'Contraseña',
      secureTextEntry: true,
      requireValue: true,
      inputMode: 'text',
      extraStyles: credencialesStyles.inputs,
      fieldName: 'password',
      error: false,
      message: ''
    },
    {
      label: 'Confirma tu contraseña',
      placeholder: 'Confirma tu contraseña',
      secureTextEntry: true,
      requireValue: true,
      inputMode: 'text',
      extraStyles: '',
      fieldName: 'password_confirmation',
      error: false,
      message: ''
    }
  ]

  const [arrayData, setArrayData] = useState(inputData)

  const handleTextChange = (fieldName, value) => {
    setNewUser(prevUserState => ({
      ...prevUserState,
      [fieldName]: value
    }))
  }

  const handleRegister = async() => {

    const apiBase = API_BASE
    const endPoint = '/registro'

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    

    const fetch = await useFetch(apiBase+endPoint, headers, 'POST', newUser, 'normal')
  
    console.log(fetch)

    if(fetch.message === 'Error'){

      if(fetch.data.hasOwnProperty('first_name')){
        inputData.map((item) => {
          if(item.fieldName === 'first_name'){
            item.error = true,
            item.message = fetch.data.first_name
          }
        })
      }

      if(fetch.data.hasOwnProperty('last_name')){
        inputData.map((item) => {
          if(item.fieldName === 'last_name'){
            item.error = true,
            item.message = fetch.data.last_name
          }
        })
      }

      if(fetch.data.hasOwnProperty('email')){
        inputData.map((item) => {
          if(item.fieldName === 'email'){
            item.error = true,
            item.message = fetch.data.email
          }
        })
      }

      if(fetch.data.hasOwnProperty('password')){
        inputData.map((item) => {
          if(item.fieldName === 'password'){
            item.error = true,
            item.message = fetch.data.password
          }
        })
      }

      if(fetch.data.hasOwnProperty('password_confirmation')){
        inputData.map((item) => {
          if(item.fieldName === 'password_confirmation'){
            item.error = true,
            item.message = fetch.data.password_confirmation
          }
        })
      }
      
      dispatch(register(newUser))
      setArrayData(inputData)

    }else{
      navigation.navigate('ConfCorreo', { email: newUser.email });
      const userDataToSave = {
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name
    };
    await storeData('userData', JSON.stringify(userDataToSave))
    }
  
  }

  useEffect(() => {
    const isFormComplete = Object.values(newUser).every(value => value !== null)
    setOnCompleteForm(isFormComplete)
  }, [newUser])



  return(
    <ScrollView style={{paddingBottom: 100}}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
      />
      <View style={credencialesStyles.container}>

        <Texts type={'h1'} extraStyles={credencialesStyles.h1}> {credencialsData.title_registro} </Texts>

        <Texts type={'p'} extraStyles={credencialesStyles.p}>{credencialsData.texto_inversiones}</Texts>

        {
            arrayData.map((input, index) => {
        
            return  <Inputs
                      key={index} 
                      placeholder={input.placeholder}
                      secureTextEntry={input.secureTextEntry}
                      value={newUser[input.fieldName]}
                      requireValue={input.requireValue}
                      inputMode={input.inputMode}
                      extraStyles={input.extraStyles}
                      onChangeText={(text) => handleTextChange(input.fieldName, text)}
                      error={input.error}
                      message={input.message}
                    >
                      {input.label}
                    </Inputs>

          })
        }

        <View style={credencialesStyles.terms}>

          <Checkbox style={credencialesStyles.checkbox} color={checked ? '#14da13' : '#000'} value={checked} onValueChange={setChecked} />

          <Text style={credencialesStyles.normalText}>Acepto los </Text>
          <TouchableOpacity>
            <Text style={[credencialesStyles.normalText, {textDecorationLine: 'underline'}]}>Términos y condiciones</Text>
          </TouchableOpacity>

        </View>

        <View style={{width: '80%', marginVertical: 20}}>
          <Texts type='pSmall' extraStyles={{textAlign: 'center'}}>{credencialsData.texto_datosPersonales} <Texts type='pSmall' extraStyles={{verticalAlign : 'middle',textDecorationLine: 'underline'}}>Aviso de privacidad</Texts>          
          </Texts>
          
        </View>

        {
        (onCompleteForm && checked)
        
        ? 

        <Button type={'primary'} size={'btnLarge'} disabled={!onCompleteForm} onPress={handleRegister}>Comenzar</Button>
        

        :

        <Button 
        type={'inactive'}
        size={'btnLarge'}
        disabled={!onCompleteForm}
   
        
        >Comenzar</Button>
      }

      

      </View>

     

    </ScrollView>
  );
}