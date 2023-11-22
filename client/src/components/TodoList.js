import React, { useEffect, useContext, useState } from 'react';
import { useResource } from 'react-request-hook';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { StateContext } from '../contexts';
import Logout from './Logout';

export default function TodoList() {
  const { state } = useContext(StateContext);
  const [todos, setTodos] = useState([]);

  // Resource for fetching todos
  const [todosResource, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }));

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    if (todosResource && todosResource.data) {
      setTodos(todosResource.data);
    }
  }, [todosResource]);

  const refreshTodos = () => {
    getTodos();
  };

  return (
    <div>
      <div className="user-info">
        {state.loggedInUser && (
          <div>
            <h2>Logged in as: {state.loggedInUser}</h2>
            <Logout />
          </div>
        )}
      </div>
      <div className="form-container">
        <h2>Add New Todo</h2>
        <TodoForm refreshTodos={refreshTodos} />
      </div>
      <div className="list-container">
        <h2>Your Todo List</h2>
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} refreshTodos={refreshTodos} />
          ))}
        </ul>
      </div>
    </div>
  );
}
