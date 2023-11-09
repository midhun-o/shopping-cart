import { createSlice } from '@reduxjs/toolkit';

interface CustomerDetails {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
}

interface CustomerState {
  customerDetails: CustomerDetails | null;
  jsonwebtoken: string | null;
}

const INITIAL_STATE: CustomerState = {
  customerDetails: null,
  jsonwebtoken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      const newState = state;
      newState.customerDetails = action.payload.customerDetails;
      newState.jsonwebtoken = action.payload.token;
    },
    logout: (state) => {
      const newState = state;
      newState.customerDetails = null;
      newState.jsonwebtoken = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
