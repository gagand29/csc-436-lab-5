import React from 'react';

export default function TodoFormFields({ onInputChange, newTodo }) {
  return (
    <div>
      {/* Title Input Field */}
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={newTodo.title}
        onChange={onInputChange}
      />

      {/* Description Input Field */}
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        id="description"
        value={newTodo.description}
        onChange={onInputChange}
      />

   
    </div>
  );
}
