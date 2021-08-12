import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './List.css';

function List({title, value, listId}) {
  
  const apiUrl = `http://localhost:8080/api/list/${listId}`;
  const [taskList, setTaskList] = useState([]);
  const taskFormValue = {};

  const loadList = () => {
    axios.get(apiUrl)
    .then((response) => {
      setTaskList(response.data, value);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const taskData = (event) => {
    const taskFormData = new FormData(event.currentTarget);
    taskFormValue.taskValue = taskFormData.get('task');
    taskFormValue.titleId = listId;
    sendTask(taskFormValue);
  };

  const sendTask = (taskList) => {
    console.log(taskList);
    axios.put( apiUrl, taskList)
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
    taskData(event);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="List-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="new-list-form">
        <label htmlFor="task">Ajoutez votre tâche</label>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="Entrez votre tâche"
        />
        <button type="submit">Envoyer</button>
      </form>
      <div className="todo-container">
        {taskList.map((task) => {
          return(
            <div className="todo" key={task._id}>{task.taskValue}</div>
          )
        })}
      </div>
    </div>
  );
};

  List.propTypes = {
    listId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.number.isRequired,
        taskValue: PropTypes.string.isRequired,
      }).isRequired,
    ),
  };
  
  export default List;
  