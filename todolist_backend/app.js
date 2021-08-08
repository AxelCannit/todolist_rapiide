const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Todolist = require('./models/todolist');

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:ready16160@cluster0.ek9r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/list', (req, res, next) => {
  const todolist = new Todolist({
    todoList:{
      ...req.body
      }
  });
  todolist.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/list/:id', (req, res, next) => {
  titleId = req.body.titleId;
  // const todolist = new Todolist({
  //   todoList:{
  //     taskList: {
  //       ...req.body
  //     }
  //   }
  // });
  Todolist.updateOne({taskValue}, {$set: req.body.taskValue })
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
// db.collection('userlist').update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
//   res.send(
//     (err === null) ? {msg: ''} : {msg: err}
// );
// });

app.use('/api/list', (req, res, next) => {
  Todolist.find()
    .then(todolists => res.status(200).json(todolists))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/list/:id', (req, res, next) => {
  Todolist.findOne({ _id: req.params.id })
    .then(todolist => res.status(200).json(todolist))
    .catch(error => res.status(404).json({ error }));
});

module.exports = app;