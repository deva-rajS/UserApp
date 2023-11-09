// TaskContext.js
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useReducer} from 'react';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      const updatedTasks = [...state.tasks];
      updatedTasks[action.payload.index] = action.payload.task;
      return {
        ...state,
        tasks: updatedTasks,
      };
    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter(
        (_, index) => index !== action.payload,
      );
      return {
        ...state,
        tasks: filteredTasks,
      };
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
const saveTasks = async tasks => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    // Handle errors, e.g., AsyncStorage is not available
  }
};

export const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const setTasks = tasks => {
    dispatch({type: 'SET_TASKS', payload: tasks});
  };

  const addTask = task => {
    dispatch({type: 'ADD_TASK', payload: task});
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          setTasks(parsedTasks); // Use setTasks to update the state
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage:', error);
        // Handle errors, e.g., AsyncStorage is not available
      }
    };

    loadTasks();
  }, []);
  const editTask = (index, updatedTask) => {
    const updatedTasks = [...state.tasks];
    updatedTasks[index] = updatedTask;
    saveTasks(updatedTasks); // Save the updated tasks to AsyncStorage
    dispatch({type: 'UPDATE_TASK', payload: {index, task: updatedTask}});
  };

  const deleteTask = taskIndex => {
    const updatedTasks = state.tasks.filter((_, index) => index !== taskIndex);
    saveTasks(updatedTasks); // Save the updated tasks to AsyncStorage
    dispatch({type: 'DELETE_TASK', payload: taskIndex});
  };

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
