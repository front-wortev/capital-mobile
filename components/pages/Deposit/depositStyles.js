import { StyleSheet } from "react-native"

export const depositStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%'
  },

  h1: {
    marginBottom: 44
  },

  h3: {
    width: 302,
    marginBottom: 22,
    marginLeft: 42
  },

  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  titlesContainer: {
    justifyContent: 'center',
    marginLeft: 42
  },

  title: {
    color: '#757575'
  },

  subTitle: {
    marginBottom: 22
  },

  cardContainer: {
    width: 328,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#333',
    alignItems: 'center',
    
  },

  cardPosition: {
    position: 'absolute',
    top: '82%',
    left: '10%'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 42

  }
})