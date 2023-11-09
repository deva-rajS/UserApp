import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../app/store';
import Cards from '../../components/Cards';
import AddUser from '../../components/AddUser';
import UserList from '../../components/UserList';
import UserComponent from '../../components/UserList';
import {TaskProvider, useTask} from '../../components/Context/taskContext';
import HomeContent from '../../components/homeContent';

export default function HomeScreen({navigation}) {
  return (
    <Provider store={store}>
      <TaskProvider>
        <Text style={styles.title}>Users List</Text>
        {/* <HomeContent navigation={navigation} /> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Add Users')}>
          <Text style={styles.btnText}>ADD USER</Text>
        </TouchableOpacity>
      </TaskProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
    marginHorizontal: 30,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#5298fa',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    alignItems: 'center',
    width: 100,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
  },
});
