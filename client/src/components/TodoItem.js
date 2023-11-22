import React from 'react';
import axios from 'axios';

export default function TodoItem({ todo, refreshTodos }) {
  const { id, title, description, author, dateCreated, complete } = todo;

  const handleToggleComplete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`http://localhost:4000/todos/${id}`, { complete: !complete }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (refreshTodos) refreshTodos(); // Refresh the todo list to reflect the change
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:4000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (refreshTodos) refreshTodos(); // Refresh the todo list after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <li className="todo-item">
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Author: {author}</p>
      <p>Created: {new Date(dateCreated).toLocaleString()}</p>
      <div className="todo-actions">
        <label>
          <input type="checkbox" checked={complete} onChange={handleToggleComplete} />
          {complete ? 'Completed' : 'Incomplete'}
        </label>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}
