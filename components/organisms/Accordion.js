import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Texts } from '../atoms/Texts'

export const Accordion = ({ title, children, toggle }) => {

  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current
  const [bodySectionHeight, setBodySectionHeight] = useState(200)

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  })

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 2],
    outputRange: ['0rad', `${Math.PI}rad`],
  })

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true, 
      }).start()
      toggle(true)
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true, 
      }).start()
      toggle(false)
    }
    setOpen(!open)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={Styles.containerDesglose}>
            <Texts type='h2' extraStyles={[Styles.title]}>{title}</Texts>
            <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
              <FontAwesome5 name={'angle-right'} size={ 25 } color = { '#000'}/>
            </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{width: '100%'}}>
      {
        open &&  <View
          style={Styles.bodyContainer}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {children}
        </View>
      }
       
      </Animated.View>
    </>
  )

}

const Styles = StyleSheet.create({
  bodyBackground: {
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
  },
  bodyContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
  containerDesglose: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal:0
  },
  title: {
    color: '#2B2B2B',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  }
})
