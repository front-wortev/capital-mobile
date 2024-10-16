import { createSlice } from "@reduxjs/toolkit"

const pathName = createSlice({
  name: 'path',

  initialState: {
    name: ''
  },

  reducers: {
    changePath: (state, action) => {
      state.name = action.payload
    }
  }

})

export const { changePath } = pathName.actions
export default pathName.reducer