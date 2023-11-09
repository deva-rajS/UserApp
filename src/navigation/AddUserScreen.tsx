import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../app/store';
import AddUser from '../../components/AddUser';
import UserList from '../../components/UserList';
import {TaskProvider} from '../../components/Context/taskContext';
import AddTask from '../../components/Context/addTask';
import HomeContent from '../../components/homeContent';

export default function AddUserScreen() {
  return (
    <Provider store={store}>
      <TaskProvider>
        {/* <AddUser /> */}
        <AddTask />
        {/* <UserList /> */}
        {/* <HomeContent /> */}
      </TaskProvider>
    </Provider>
  );
}
