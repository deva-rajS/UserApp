// userReducer.js
const initialState = {
  users: [{name: '', age: '', dob: ''}],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {...state, users: [...state.users, action.payload]};
    case 'EDIT_USER':
    // Implement the logic to edit a user
    case 'DELETE_USER':
    // Implement the logic to delete a user
    default:
      return state;
  }
};

export default userReducer;
