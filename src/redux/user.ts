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
}

const INITIAL_STATE: CustomerState = {
  customerDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      const newState = { ...state };
      newState.customerDetails = action.payload;
      return newState;
    },
    logout: (state) => {
      const newState = state;
      newState.customerDetails = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
