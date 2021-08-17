const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true, },
});

const todolistSchema = mongoose.Schema({
  title: { type: String, required: true, }, 
  tasks: [ taskSchema ],
});

module.exports = mongoose.model('todolist', todolistSchema);