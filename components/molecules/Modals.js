import React from 'react'
import { View, Modal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Texts } from '../atoms/Texts';
import { Button } from '../atoms/Button';
import { FontAwesome5 } from '@expo/vector-icons'

export const Modals = (props) => {

  const { visible, icon, title, subtitle, description, buttonText, onButtonPress, onClose, vectoricon, typeButton = 'primary', colorTitle = '#14DA13', gap } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, paddingTop: 50, paddingBottom: 44, paddingHorizontal: 35, alignItems: 'center', gap: gap }}>
          {onClose &&           
            <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                <Icon name="times" size={24} color="#2B2B2B" />
            </TouchableOpacity>         
          }
          {icon && <Icon name={ icon } size={ 32 } color = {'#14DA13'} style={{marginBottom: 20}} />}
          {vectoricon && <FontAwesome5 name={`${vectoricon}`} size={32} color = {'#14DA13'} style={{marginBottom: 20}} />}
          {title && <Texts type='h2' extraStyles={{ color: colorTitle}}>{title}</Texts>}
          {subtitle && <Texts type='p' extraStyles={{ color: '#757575', marginBottom: 20 }}>{subtitle}</Texts>}
          {description && <Texts type='p' extraStyles={{ marginBottom: 20, textAlign: 'center' }}>{description}</Texts>}
          {buttonText && <Button type={typeButton} size='btnModal' onPress={onButtonPress}>{buttonText}</Button>}
        </View>
      </View>
    </Modal>
  )
}
