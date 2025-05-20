const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Add this line
const Todo = require('../models/Todo');

// @route   GET api/todos
// @desc    Get all todos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/todos
// @desc    Add new todo
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      _id: uuidv4(), // Set _id using uuid
      todo: req.body.todo,
      isCompleted: req.body.isCompleted || false
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/todos/:id
// @desc    Update todo
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });
    
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });
    
    await Todo.findByIdAndDelete(req.params.id); // <-- Use this instead
    
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;