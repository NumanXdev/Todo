/// Meterial UI btns
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./todo.css";

export default function Todo() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");
  let [error, setError] = useState("");

  let addnewTask = () => {
    if (!newTodo.trim()) {
      setError("Task can't be Empty");
      return;
    }
    setTodos([...todos, { task: newTodo, id: uuidv4() }]);
    setNewTodo("");
  };

  let UpdataTodoValue = (event) => {
    setNewTodo(event.target.value);
    if (error) {
      setError("");
    }
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodos) => prevTodos.id != id)
    );
  };

  let upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        // console.log(todo);
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      })
    );
    // console.log(newArr);
  };

  let isDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let marksAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        // console.log(todo);
        return {
          ...todo,
          isDone: true,
        };
      })
    );
    // console.log(newArr);
  };

  return (
    <>
      {error && (
        <Stack className="error-alert" sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning">{error}</Alert>
        </Stack>
      )}
      <br /> <br />
      <input
        type="text"
        placeholder="Add the Task here!"
        value={newTodo}
        onChange={UpdataTodoValue}
      />
      <Button
        onClick={addnewTask}
        variant="contained"
        endIcon={<SendIcon />}
        color="success"
        size="medium"
      >
        Add task
      </Button>
      <br />
      <br />
      <hr />
      <h2>Tasks Todo</h2>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            &nbsp; &nbsp;&nbsp;
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
            {/* <button onClick={() => upperCaseOne(todo.id)}>UpperCase</button> */}{" "}
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => isDone(todo.id)}
            >
              Done
            </Button>
          </li>
        ))}
      </ol>
      <Button onClick={upperCaseAll} variant="contained" size="small">
        UpperCase All
      </Button>
      &nbsp;
      <Button onClick={marksAllDone} variant="contained" size="small">
        Marks all as Done
      </Button>
    </>
  );
}
