import { createSlice } from "@reduxjs/toolkit";

const inversionesSlice = createSlice({
  name: "inversiones",
  initialState: {
    inversiones: [], // Aquí almacenaremos los datos de inversiones
  },
  reducers: {
    guardarInversiones: (state, action) => {
      state.inversiones = action.payload;
    },
  },
});

export const { guardarInversiones } = inversionesSlice.actions;

export default inversionesSlice.reducer;

// Selector para obtener las inversiones
export const selectInversiones = (state) => state.inversiones.inversiones;
