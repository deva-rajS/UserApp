// userActions.js
export const addUser = user => {
  return {type: 'ADD_USER', payload: user};
};

export const editUser = user => {
  return {type: 'EDIT_USER', payload: user};
};

export const deleteUser = userId => {
  return {type: 'DELETE_USER', payload: userId};
};
