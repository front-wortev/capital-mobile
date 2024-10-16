import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import RootNavigator from './components/functions/RootNavigator';

export default function App() {
  
  const [loaded] = useFonts({
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if(!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <RootNavigator/>     
    </Provider>
  );
}