// TodoContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state for todos
const initialTodos = [];

// Create a context for the todos and the dispatch function
const TodoContext = createContext();

// Define a provider component to wrap the entire app with the context
export const TodoProvider = ({ children }) => {
  // Use the useReducer hook to manage the state and actions for todos
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to easily access the TodoContext from any component
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

// Todo reducer function (unchanged)
function todoReducer(state, action) {
    switch (action.type) {
      // ... other cases
      case 'TOGGLE_COMPLETE':
        // Toggle the complete field and set the dateCompleted field
        return state.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete, dateCompleted: new Date() }
            : todo
        );
      // ... other cases
      default:
        return state;
    }
  }
