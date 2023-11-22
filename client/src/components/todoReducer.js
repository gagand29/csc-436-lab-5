// todoreducers.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [], // Initial state here
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.complete = !todo.complete;
      }
    },
    // Add more reducer functions as needed
  },
});

export const { addTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
