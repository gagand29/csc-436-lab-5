// routes/todo.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const isAuthenticated = require('../middleware/isAuthenticated');

// POST route for creating a todo
router.post('/', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  if (!req.user || !req.user.id) {
    return res.status(400).send('User ID not found in request');
  }

  try {
    const todo = new Todo({
      title,
      description,
      author: req.user.id,
      dateCreated: new Date(),
      complete: false
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).send(error.message);
  }
});

// DELETE route for deleting a todo
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PATCH route for updating a todo's completion status
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, author: req.user.id });
    if (!todo) {
      return res.status(404).send();
    }
    todo.complete = !todo.complete;
    todo.dateCompleted = todo.complete ? new Date() : null;
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
