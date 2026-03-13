import { Alert, Platform, ToastAndroid } from 'react-native';

export const Toast = msg => {
  if (!msg) return null;
  if (Platform.OS === 'android') {
    return ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  return Alert.alert('Fremo', msg);
};
