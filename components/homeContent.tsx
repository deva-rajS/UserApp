import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTask} from './Context/taskContext';
import Cards from './Cards';
import {Provider} from 'react-redux';
import store from '../app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeContent({navigation}) {
  const {state, dispatch} = useTask();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromAsyncStorage();
  }, []);
  const loadTasksFromAsyncStorage = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        setTasks(tasks);
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };
  const deleteTask = taskIndex => {
    dispatch({
      type: 'DELETE_TASK',
      payload: taskIndex,
    });
  };

  return (
    <Provider store={store}>
      <View>
        {tasks.map((task, index) => (
          <Cards
            name={task.name}
            age={task.age}
            dob={task.dob}
            key={index}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </View>
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
  },
  btnText: {
    color: 'white',
  },
});

export default HomeContent;
