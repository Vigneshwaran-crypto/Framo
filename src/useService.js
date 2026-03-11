import { Alert } from 'react-native';
import { useAppStore } from './Store.js';

const useService = () => {
  const { curScreen, setState, screenData, setField } = useAppStore();

  const logIn = () => {
    console.log('Login OnPressed');
    Alert.alert('Hello');
  };

  return {
    logIn,
  };
};

export default useService;
