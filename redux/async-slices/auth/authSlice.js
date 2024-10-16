import { createSlice } from "@reduxjs/toolkit";

const authSliceLogin = createSlice({
  name: 'login',
    initialState: {
      token: {
        "access_token": "",
        "token_type": "",
        "expires_at": ""
      },
      userName: '',
      userEmail: '',
      isLoading: false
    },
    reducers: {
        success: (state, action) => { 
          state.token = action.payload
        },
        userName: (state,action) => {
          state.userData = action.payload
        },
        userEmail: (state,action) => {
          state.userEmail = action.payload
        },
    }
})

export const { success, userName, userEmail } = authSliceLogin.actions
export default authSliceLogin.reducer