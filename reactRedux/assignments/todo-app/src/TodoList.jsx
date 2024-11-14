// TodoList.js
import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todos, toggleComplete, showCompleted }) => {
  return (
    <ul>
      {todos
        .filter((todo) => (showCompleted ? true : !todo.completed))
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}
    </ul>
  );
};

export default TodoList;
