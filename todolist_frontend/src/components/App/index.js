import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';

import List from '../List';

import './App.css';

function App() {

  const apiUrl = 'http://localhost:8080/api/list';
  const [titleList, setTitleList] = useState([]);

  const loadList = () => {
    axios.get(apiUrl)
    .then((response) => {
      setTitleList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
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
          <form className="new-list-form">
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
                <a className="list-title" href={`/liste-${titleName.id}`}>{titleName.title}</a>
              )
            })}
          </div>
        </Route>
        {titleList.map((titleName) => {
              return(
                <Route
                path={`/liste-${titleName.id}`}
                exact
                >
                  <List/>
                </Route>
              )
        })}
      </Switch>
      
    </div>
  );
}

export default App;
