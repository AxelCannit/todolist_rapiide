const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
  title: { type: String, }, 
  taskValue: { type: String, },
  titleId: {type: String, },
});

module.exports = mongoose.model('todolist', todolistSchema);