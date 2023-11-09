// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {users: []},
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const {id, updatedUser} = action.payload;
      state[id] = updatedUser;
    },
    deleteUser: (state, action) => {
      return state.filter((user, index) => index !== action.payload);
    },
  },
});

export const {addUser, editUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;
