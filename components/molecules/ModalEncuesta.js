import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Texts } from '../atoms/Texts';
import StarRating from './StarRating';
import Checkbox from 'expo-checkbox';
import { reinversionesReusableStyles } from '../reinversionesReusableStyles';
import { Button } from '../atoms/Button';

export const ModalEncuesta = (props) => {

  const { visible, onClose } = props;

  const [rating, setRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  

  const handleRatingChange = (newRating) => {
       setRating(newRating);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  }; 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Texts type='h2' extraStyles={{ color: '#040404' , marginBottom: 10, marginTop: 20}}>Retiro Solicitado</Texts>
            <Texts type='h3' extraStyles={{ color: '#2B2B2B', textAlign: 'center' }}>¿Cómo calificarías tu experiencia en WORTEV Capital?</Texts>
            <StarRating rating={rating} onRatingChange={handleRatingChange}/>
            <Texts type='h3' extraStyles={{ color:'#2B2B2B' ,marginBottom: 20 }}>¿Por qué decidiste retirar tu capital?</Texts>

            <View style={reinversionesReusableStyles.checkboxConteinerEncuesta}>
              <View style={reinversionesReusableStyles.row}>
                <Checkbox value={selectedOption === 'CumpliMeta'} onValueChange={() => handleCheckboxChange('CumpliMeta')} color={selectedOption === 'CumpliMeta' ? '#14DA13' : undefined} />
                <Texts type='p'>Cumplí mi meta de ahorro</Texts>
              </View>
              <View style={reinversionesReusableStyles.row}>
                <Checkbox value={selectedOption === 'OtraAlternativa'} onValueChange={() => handleCheckboxChange('OtraAlternativa')} color={selectedOption === 'OtraAlternativa' ? '#14DA13' : undefined}   />
                <Texts type='p'>Encontré otra alternativa para invertir</Texts>
              </View>
              <View style={reinversionesReusableStyles.row}>
                <Checkbox value={selectedOption === 'RequiereLiquidez'} onValueChange={() => handleCheckboxChange('RequiereLiquidez')} color={selectedOption === 'RequiereLiquidez' ? '#14DA13' : undefined}  />
                <Texts type='p'>Requiero liquidez</Texts>
              </View>
              <View style={reinversionesReusableStyles.row}>
                <Checkbox value={selectedOption === 'Otro'} onValueChange={() => handleCheckboxChange('Otro')} color={selectedOption === 'Otro' ? '#14DA13' : undefined}  />
                <Texts type='p'>Otro</Texts>
              </View>
              <View>
                <TextInput
                style={reinversionesReusableStyles.inputText}
                  textAlignVertical="top"
                  placeholder='¿En qué podemos mejorar?'
                  numberOfLines={4}
                  multiline={true}
                />
              </View>
            </View>            
            <Button  type='secondary' size='btnModal' textColor='#2B2B2B' onPress={onClose}>ENVIAR</Button>
        </View>
      </View>
    </Modal>
  )
}

