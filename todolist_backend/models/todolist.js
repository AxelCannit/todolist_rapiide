const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
  todoList: {
    title: { type: String, required: false, },
    taskList: { 
      taskValue: {type: String, required: false}
    },
  }
});

module.exports = mongoose.model('todolist', todolistSchema);