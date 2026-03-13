import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  screenData: {},
  curScreen: 'Login',
  stack: ['Login'],
  loading: false,

  setField: (sId, field, value) =>
    set(state => ({
      screenData: {
        ...state.screenData,
        [sId]: {
          ...state.screenData[sId],
          [field]: value,
        },
      },
    })),

  getField: (sId, field) => {
    const val = get().screenData[sId] || {};
    return val[field] ?? null;
  },
  setState: (key, value) => set(state => ({ ...state, [key]: value })),
}));
