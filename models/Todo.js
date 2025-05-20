const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  _id: {
    type: String, // <-- Add this line to use UUID as string
    required: true
  },
  todo: {
    type: String,
    required: true,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', TodoSchema);