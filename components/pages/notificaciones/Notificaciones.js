import React, {useState} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import ItemBox from './ItemBox'
import { Texts } from '../../atoms/Texts'
import { useNavigation  } from '@react-navigation/native'
import { FontAwesome5 } from "@expo/vector-icons"

const data = [
  {id: '1', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 0},
  {id: '2', title: 'Lorem Ipsum', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 0},
  {id: '3', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 0},
  {id: '4', title: 'Lorem Ipsum', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  {id: '5', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  // {id: '6', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  // {id: '7', title: 'Lorem Ipsum', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  // {id: '8', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  // {id: '9', title: 'Lorem Ipsum', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
  // {id: '10', title: '!Enhorabuena¡', message: 'Tus datos han sido verificados exitosamente. Ya puedes comenzar a invertir.', date: '03/21/2023', status: 1},
];

const SCREEN_HEIGHT = Dimensions.get('window').height

export const Notificaciones = () => {

  const navigation = useNavigation();
  const [lists, setLists] = useState(data)

  const deleteItem = (index) => {
    const arr = [...lists]
    arr.splice(index, 1)
    setLists(arr)
  }

  return (

    <SafeAreaView style={styles.container}>

        <View style={styles.containerHeader}>
          <TouchableOpacity style={styles.arrow} onPress={ () => navigation.goBack()}>
            <FontAwesome5 name='long-arrow-alt-left' size={ 20 } color = { '#000'} />
          </TouchableOpacity>
          <Texts type={'h4'} extraStyles={styles.titleHeader}>Buzón</Texts>
        </View>
      
        <GestureHandlerRootView style={styles.list}>

          <FlatList
            data={lists}
            renderItem={({item, index}) => {
              return <ItemBox data={item} handleDelete={() => deleteItem(index)} />
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.seperatorLine}></View>
            }}
          />

        </GestureHandlerRootView>

        <View style={styles.containerButton}>
          <TouchableOpacity>
            <Texts type={'h4'} extraStyles={styles.todas}>Marcar todos como leídos</Texts>
          </TouchableOpacity>
        </View>

    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  containerHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
  },
  arrow: {
    position: 'absolute',
    left: 40,
    top: 40
  },
  titleHeader: {
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Poppins-SemiBold',
    color: '#222'
  },
  container: {
    position: 'relative',
    backgroundColor: '#F2F5FA ',
    flex: 1
  },
  list: {
    width: '100%',
    height: (SCREEN_HEIGHT - 200),

  },
  seperatorLine: {
    height: 1,
    paddingVertical: 2,
    
  },
  containerButton: {
    position: 'relative',
    width: '100%',
    height: 100,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todas: {
    color: '#14DA13',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  }
})