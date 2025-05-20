const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
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