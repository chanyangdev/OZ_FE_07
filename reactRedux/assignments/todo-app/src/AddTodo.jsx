// AddTodo.js
import React, { useState } from "react";
import "./AddTodo.css";

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새 할 일을 입력하세요."
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default AddTodo;
