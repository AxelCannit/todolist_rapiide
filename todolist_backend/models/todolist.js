const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
  title: { type: String, required: false, }, 
  taskValue: {type: String, required: false},
});

module.exports = mongoose.model('todolist', todolistSchema);