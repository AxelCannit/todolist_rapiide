import React from 'react';

import './List.css';

function List() {
    return (
      <div className="List-container">
        <h1>Liste numéro 1!</h1>
        <div className="todo-container">
          <div className="todo">Todo 1</div>
          <div className="todo">Todo 2</div>
          <div className="todo">Todo 3</div>
          <div className="todo">Todo 4</div>
          <div className="todo">Todo 5</div>
        </div>
      </div>
    );
  }
  
  export default List;
  