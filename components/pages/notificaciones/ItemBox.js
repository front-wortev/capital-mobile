import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Texts } from '../../atoms/Texts'
import { FontAwesome } from "@expo/vector-icons"

const SCREEN_WIDTH = Dimensions.get('window').width

export default ItemBox = ({data, handleDelete, }) => {

  const {title, message, date, status} = data

  const rightSwipe = () => {

    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
            <FontAwesome name='check' size={ 30 } color = { '#14DA13'} />
        </View>
      </TouchableOpacity>
    )

  }

  return (

    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.container}>
      { (status === 0 && <View style={styles.status}></View>) }
        <Texts type={'h4'} extraStyles={styles.title}>{title}</Texts>
        <Texts type={'p'} extraStyles={styles.message}>{message}</Texts>
        <Texts type={'p'} extraStyles={styles.date}>{date}</Texts>
      </View>
    </Swipeable>

  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    height: 96,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    padding: 16,
    paddingHorizontal: 30,
  },
  deleteBox: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 96,
  },
  date: {
    position: 'absolute',
    right: 20,
    top: 17,
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#D9D9D9'    
  },
  title: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 10 ,
  },
  message: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Poppins-Light',   
  },
  status: {
    position: 'relative',
    width: 10,
    height: 10,
    backgroundColor: '#14DA13',
    borderRadius: 360,
    top: 25,
    left: -15
  }
})