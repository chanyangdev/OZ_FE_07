// App.js

// imports necessary modules and components
// useState is a React hook used to create and manage state within the component
/* TodoList and AddTodo are components imported from other files, which will be used to render the list of todos and the input for adding new todos */
// App.css imports styling
import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import "./App.css";

// Component Definition and State Initialization

// App is a function component that returns JSX.
/* todos and setTodos: */
/* todos is the state variable holding an array of todo items */
// setTodos is the function to update the todos state
// Each todo has an id, text (the task text), and completed (whether the task is done).
// showCompleted is a boolean state controlling whether completed tasks are visible
// setShowCompleted updates this value
const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할 일 1",
      completed: false,
    },
    {
      id: 2,
      text: "할 일 2",
      completed: false,
    },
    {
      id: 3,
      text: "할 일 3",
      completed: false,
    },
  ]);
  const [showCompleted, setCompleted] = useState(true);

  // addTodo function
  // addTodo adds a new todo to the list:
  // - a new todo object is created with a unique id (using Date.now()), the text received as an argument, and completed set to false.
  // - setTodos([...todos, newTodo]) updates todos by adding the new todo to the end of the current list
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // toggleComplete Function
  // toggles the completed status of a todo item
  // it takes an id as an argument
  // it maps over todos, finding the item with the matching id
  // if the id matches, it returns a new object where completed is toggled
  // if the id doesn't match, it returns the orignal todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // toggleShowCompleted Function
  // toggles the showCompleted state between true and false
  // when showCompleted is true, completed todos are shown
  // when showCompleted is false, completed todos are hidden
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };
  // Rendering the component
  // renders the main App component layout
  // <h1> displays the title
  return (
    <div>
      <h1>Todo List 조건부 렌더링 연습</h1>
      <AddTodo addTodo={addTodo} />
      <button class="btn_completed" onClick={toggleShowCompleted}>
        {showCompleted ? "완료된 할 일 숨기기" : "모든 할 일 보기"}
      </button>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        showCompleted={showCompleted}
      />
    </div>
  );
};

export default App;
