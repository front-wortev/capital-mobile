/*

   * IMPORTANT! THE FOLLOWING SLICE IS ONLY FOR MOCK-UP LOGIN / REGISTER FUNCTIONALITY, SO IT IS A SYNCHRONOUS SLICE AND WILL BE DELETED WHEN THE BACK-END TEAM GIVE US THE API CRUD ENDPOINTS. *

*/

import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isAuth: false,
    user: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    isNewUser: false,
    mailConfirmation: false,
    isRegistering: false, 
    personType: 'persona_fisica',
  },

  reducers: {
    login: (state, action) => {
      state.isAuth = true
      state.user = action.payload
    },
    register: (state, action) => {
      state.user = action.payload
      state.isNewUser = true
      state.isRegistering = true
    }, 
    person_type: (state, action) => {
      state.personType = action.payload
    }
  }

})

export const { login, register, person_type } = authSlice.actions
export default authSlice.reducer