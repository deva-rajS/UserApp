import React from 'react';
import {Provider} from 'react-redux';
import store from './app/store'; // Import your Redux store
import AppNavigator from './AppNavigator'; // Your main component
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
