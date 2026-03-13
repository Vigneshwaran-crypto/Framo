import React from 'react';
import { useAppStore } from './Store.js';
import { Toast } from './Utils.js';

const useService = () => {
  const { curScreen, setState, screenData, setField } = useAppStore();

  const logIn = () => {
    if (!screenData?.Login?.email) return Toast('Please enter valid email');
    if (!screenData?.Login?.password) return Toast('Please enter password');
    setState('curScreen', 'NewContact');
  };

  return {
    logIn,
  };
};

export default useService;
