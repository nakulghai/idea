import React, { useState, useEffect } from 'react';
import axios from "axios";

function Todo() {
  const [name, setName] = useState('');
  const [todoList, setTodoLIst] = useState([]);

  //Below call will work like componentDidMount
  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(res => {
        const result = res.data.data;
        const todoList = result.map((todo) => {
          return todo.first_name;
        });
        setTodoLIst(todoList);
      })
      .catch(err => console.log('errors'));
      return () => {
          console.log("unmount");
      }
  }, []);

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const onAddTodo = () => {
    setName('');
    setTodoLIst([...todoList, name]);
  };

  const onTodoClick = (e) => {
    const todoToDelete = e.target.innerText;
    const newTodoList = todoList.filter(todo => todo !== todoToDelete);
    setTodoLIst(newTodoList);
  }

  return (
      <p>
        <input value={name} onChange={changeHandler}/>
        <button onClick={onAddTodo}>Add</button>
        <ul>
            {todoList.map(todo => {
              return(
                <li onClick={onTodoClick}>
                  {todo}
                </li>
              );
            })}
        </ul>
      </p>
  );
}

export default Todo;
