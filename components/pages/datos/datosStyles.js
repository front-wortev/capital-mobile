import { StyleSheet } from "react-native";

export const datosStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    marginBottom: 10
  },
  forwardButton: {
    alignItems: 'flex-end',
    marginRight: 16,
    marginTop: 20,
    height: 50
  },
  errorMessage: {
    color: "#c20000",
}
});