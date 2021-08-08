import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';

import List from '../List';

import './App.css';

function App() {

  const apiUrl = 'http://localhost:8080/api/list';
  const [titleList, setTitleList] = useState([]);
  const titleFormValue = {};

  const loadList = () => {
    axios.get(apiUrl)
    .then((response) => {
      setTitleList(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const titleData = (event) => {
    const titleFormData = new FormData(event.currentTarget);
    titleFormValue.title = titleFormData.get('title');
    sendTitle(titleFormValue);
  };

  const sendTitle = (title) => {
    console.log(title);
    axios.post( apiUrl, title)
    .then()
    .catch((error) => {
      console.log(error.response);
    })
    .finally(() => {
      loadList();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    titleData(event);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path='/'
          exact
        >
          <div className="app-header">
            <h1>Todolist rapiide</h1>
          </div>
          <h2>Créer une "to do list"</h2>
          <form onSubmit={handleSubmit} className="new-list-form">
            <label htmlFor="title">Titre de votre liste</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Entrez le titre de votre liste"
            />
            <button type="submit">Envoyer</button>
          </form>
          <div className="app-list">
          {titleList.map((titleName) => {
             return(
              <a className="list-title" key={titleName.todoList._id} href={`/liste-${titleName._id}`}>{titleName.todoList.title}</a>
            )
          })}
          </div>
        </Route>
        {titleList.map((titleName) => {
          return(
            <Route
            path={`/liste-${titleName._id}`}
            exact
            >
              <List title={titleName.todoList.title} value={titleName.todoList.todoValue} listId={titleName._id}/>
            </Route>
          )
        })}
      </Switch>
      
    </div>
  );
}

export default App;
