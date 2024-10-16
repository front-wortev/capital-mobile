import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';

const FileDownloader = ({ url, fileName }) => {
  
  useEffect(() => {
    if (url) {
      downloadAndOpenFile();
    }
  }, [url]);

  const downloadAndOpenFile = async () => {
    
    try {
      const localPath = FileSystem.documentDirectory + fileName;
      const { uri } = await FileSystem.downloadAsync(url, localPath);
      
      if (Platform.OS === 'android') {
        const contentUri = await FileSystem.getContentUriAsync(uri);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          flags: 1,
          type: 'application/pdf',
        });
      } else {
        await Linking.openURL(uri);
      }

    } catch (error) {
      ToastAndroid.show('Error al descargar el archivo', ToastAndroid.SHORT)
    }
  };
};


export default FileDownloader;
