import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StateContext } from '../contexts';
import TodoFormFields from './TodoFormFields';
import TodoFormButtons from './TodoFormButtons';

export default function TodoForm({ refreshTodos }) {
  const { state } = useContext(StateContext);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', author: state.loggedInUser });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:4000/todos', newTodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Todo added:', response.data);
      setNewTodo({ title: '', description: '', author: state.loggedInUser });
      if (refreshTodos) refreshTodos(); // Refresh the todo list after adding a new todo
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form id="todo-form" className="login-form" onSubmit={handleSubmit}>
        <TodoFormFields onInputChange={handleInputChange} newTodo={newTodo} />
        <TodoFormButtons />
      </form>
    </div>
  );
}
