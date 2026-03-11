import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  screenData: {},
  curScreen: 'Login',
  stack: ['Login'],

  setField: (sId, field, value) =>
    set(state => {
      const curScreen = state.screenData[sId] || {};
      return {
        ...state.screenData,
        [sId]: {
          ...curScreen,
          [field]: value,
        },
      };
    }),

  getField: (sId, field) => {
    const val = get().screenData[sId] || {};
    return val[field] ?? null;
  },
  setState: (key, value) => set(state => ({ ...state, [key]: value })),
}));
