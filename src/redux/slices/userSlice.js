import { createSlice } from '@reduxjs/toolkit';
import users from '../../userData.json'

const userSlice = createSlice({
    name: 'user',
    initialState: users.users,
    reducers: {
      updateUser(state, action) {
        const { payload } = action;
        Object.keys(payload).forEach((key) => {
          if (key in state) {
            state[key] = payload[key];
          }
        });
      },
      resetUser(state) {
        Object.assign(state, initialState);
      },
      updateCustomGoals(state, action) {
        state.customGoals = action.payload;
      },
      addSubscription(state, action) {
        if (!state.userSubscriptions.includes(action.payload)) {
          state.userSubscriptions.push(action.payload);
        }
      },
      removeSubscription(state, action) {
        state.userSubscriptions = state.userSubscriptions.filter(
          (subscription) => subscription !== action.payload
        );
      },
    },
  });
  
  export const {
    updateUser,
    resetUser,
    updateCustomGoals,
    addSubscription,
    removeSubscription,
  } = userSlice.actions;
  
  export default userSlice.reducer;
  