import { StyleSheet } from "react-native";

export const filesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  h1: {
    marginBottom: 28
  },

  actualContract: {
    marginBottom: 16,
    marginLeft: 16
  },

  termsExplanation: {
    width: 328,
    marginLeft: 16,
    marginRight: 16
  },

  pdfContainer: {
    width: 328,
    height: 314,
    justifyContent: 'center',
    alignItems: 'center'
  },

  pdfButtons: {
    width: 328,
    height: 50,
    backgroundColor: '#2B2B2B',
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 145
  },

  recentInvestments: {
    marginLeft: 16
  },

  yearlyContracts: {
    color: '#C1C1C1',
    marginLeft: 16
  },

  temsStatus: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 11,
    gap: 42
  },

  ordersContainer: {
    marginLeft: 16,
    marginBottom: 20
  }
})