// AddTask.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TaskContext, useTask} from './taskContext';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Cards from '../Cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = () => {
  const {state, dispatch} = useTask();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');

  const [editIndex, setEditIndex] = useState(-1);
  const navigation = useNavigation();
  const saveTasksToAsyncStorage = async updatedTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('Tasks saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };
  useEffect(() => {
    const loadTasksFromAsyncStorage = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          dispatch({type: 'SET_TASKS', payload: JSON.parse(savedTasks)});
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage:', error);
      }
    };
    loadTasksFromAsyncStorage();
  }, [dispatch]);

  const addTask = () => {
    if (editIndex === -1) {
      dispatch({
        type: 'ADD_TASK',
        payload: {name, age, dob},
      });
    } else {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {index: editIndex, task: {name, age, dob}},
      });
      setEditIndex(-1);
    }

    setName('');
    setAge('');
    setDob('');
    saveTasksToAsyncStorage(state.tasks);
  };

  const editTask = taskIndex => {
    const taskToEdit = state.tasks[taskIndex];
    setName(taskToEdit.name);
    setAge(taskToEdit.age);
    setDob(taskToEdit.dob);
    setEditIndex(taskIndex);
  };

  const deleteTask = taskIndex => {
    dispatch({
      type: 'DELETE_TASK',
      payload: taskIndex,
    });

    setEditIndex(-1);
    saveTasksToAsyncStorage(state.tasks);
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text>Age:</Text>
      <TextInput value={age} onChangeText={setAge} style={styles.input} />

      <Text>DOB:</Text>
      <TextInput value={dob} onChangeText={setDob} style={styles.input} />

      <Button
        title={editIndex === -1 ? 'Add Task' : 'Update Task'}
        onPress={addTask}
      />

      <Text style={styles.tasksLabel}>Users:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {state.tasks.map((task, index) => (
            <Cards
              name={task.name}
              age={task.age}
              dob={task.dob}
              key={index}
              onEdit={() => editTask(index)}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tasksLabel: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  taskItem: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    color: 'blue',
    marginLeft: 10,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default AddTask;
