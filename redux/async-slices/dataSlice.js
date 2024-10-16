import { createSlice } from '@reduxjs/toolkit';

const keys = ['logo', 'inicio', 'credenciales', 'confCorreo', 'subirDocs', 'cuentaCreada', 'personType', 'forgotPassword', 'correoForgotPassword', 'slideImages', 'datosDeposito', 'correoFirmamex', 'modalFirmamex'];

const createInitialState = (keys) => {
  const state = {};
  keys.forEach((key) => {
    state[key] = { data: null, loading: false };
  });
  state.globalLoading = false;
  return state;
};

const initialState = createInitialState(keys);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      const { key, data } = action.payload;
      if (state[key]) {
        state[key].data = data;
        state[key].loading = false;
      }
    },
    setLoading(state, action) {
      const { key, loading } = action.payload;
      if (state[key]) {
        state[key].loading = loading;
      }
    },
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
  },
});

export const { setData, setLoading, setGlobalLoading } = dataSlice.actions;
export default dataSlice.reducer;
